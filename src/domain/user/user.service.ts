import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { FilterDto } from '../shared/filter/filter-dto';
import { User } from './entities/user.entity';
import { DEFAULT_PASSWORD } from '../../consts/default-password';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../../integrations/email/email.service';
import { encryptPassword } from '../../utils/encrypt-password';
import { AuthorizationDecoratorArgs } from '../shared/authorization/authorization.decorator';
import { UserWithoutPassDto } from './dto/user-without-pass.dto';
import { PasswordChangeRequestDto } from './dto/password-change-request.dto';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { randomUUID } from 'crypto';
import { Permission } from '../permission/entities/permission.entity';
import { In } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    private readonly repository: UserRepository,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) { }

  async create(dto: CreateUserDto) {
    const user = this.repository.create(dto);
    user.password = DEFAULT_PASSWORD;

    const existsEmail = await this.existsBy('email', dto.email)
    if (existsEmail) {
      throw new BadRequestException('Usuário com o email já existe');
    }

    const existsCpf = await this.existsBy('cpf', dto.cpf)
    if (existsCpf) {
      throw new BadRequestException('Usuário com o cpf já existe');
    }

    if (dto.permissionsId) {
      const permissions = await this.repository.manager.findBy(Permission, { id: In(dto.permissionsId) })
      if (permissions.length !== dto.permissionsId.length) {
        throw new BadRequestException('Algumas permissões não foram encontradas');
      }
      user.permissions = permissions;
    }

    const { password, ...result } = await this.repository.save(user);
    return result;
  }

  async findAll(dto: FilterDto) {
    return await this.repository.filterAll(dto);
  }

  async findOneBy<T extends keyof User>(key: T, value: User[T]): Promise<UserWithoutPassDto> {
    const user = await this.repository.findOneBy({
      [key]: value
    });
    if (!user) {
      throw new NotFoundException(`Usuário com ${key} ${value} não encontrado`);
    }
    const { password, ...result } = user;
    return result as UserWithoutPassDto;
  }

  async findFullUserBy<T extends keyof User>(key: T, value: User[T]) {
    return await this.repository.findOneBy({
      [key]: value
    });
  }

  async existsBy<T extends keyof User>(key: T, value: User[T], withDeleted: boolean = true) {
    return await this.repository.exists({
      where: {
        [key]: value
      },
      withDeleted
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.repository.preload({ id, ...dto })
    if (!user) {
      throw new BadRequestException('Usuário não encontrado para ser atualizado')
    }
    if (dto.email) {
      const exists = await this.existsBy('email', dto.email)
      if (exists) {
        throw new BadRequestException('Usuário com o email já existe');
      }
      user.email = dto.email;
    }

    if (dto.cpf) {
      const exists = await this.existsBy('cpf', dto.cpf)
      if (exists) {
        throw new BadRequestException('Usuário com o cpf já existe');
      }
      user.cpf = dto.cpf;
    }

    if (dto.permissionsId) {
      const permissions = await this.repository.manager.findBy(Permission, { id: In(dto.permissionsId) })
      if (permissions.length !== dto.permissionsId.length) {
        throw new BadRequestException('Algumas permissões não foram encontradas');
      }
      user.permissions = permissions;
    }

    return await this.repository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOneBy('id', id);
    return await this.repository.softRemove(user);
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.repository.findOne({
      where: {
        tokenPasswordChange: dto.token
      },
      select: {
        id: true,
        tokenPasswordChange: true,
        tokenPasswordChangeExpiresAt: true,
        password: true,
        mustChangePassword: true
      }
    });

    if (!user || (user.tokenPasswordChangeExpiresAt && user.tokenPasswordChangeExpiresAt < new Date())) {
      throw new NotFoundException('Usuário não encontrado para alteração de senha');
    }

    await this.repository.update(user.id, {
      password: await encryptPassword(dto.newPassword),
      mustChangePassword: false,
      tokenPasswordChange: null
    });

    return {
      message: 'Senha alterada com sucesso',
    };
  }

  @OnEvent('password.change.request')
  async sendPasswordChangeEmail(dto: PasswordChangeRequestDto) {
    try {
      const user = await this.repository.findOneBy({
        email: dto.email,
      });

      if (!user) {
        return;
      }

      user.tokenPasswordChange = randomUUID();
      user.tokenPasswordChangeExpiresAt = new Date(Date.now() + 60 * 60 * 1000);

      const resetToken = user.tokenPasswordChange;

      const frontendUrl = this.configService.get('PASSWORD_RESET_URL');
      const resetLink = `${frontendUrl}?token=${resetToken}`;

      await this.repository.save(user);

      await this.emailService.sendEmail(
        user.email,
        'Redefinição de Senha - Instituto Diomício Freitas',
        'password-recovery',
        { data: resetLink, year: new Date().getFullYear() },
      );
      return resetToken;
    } catch (error) {
      console.error('Erro no evento password.change.request:', error);
    }
  }

  async hasPermissions(userId: number, permissions: AuthorizationDecoratorArgs[]) {
    // 1. Otimização: Se não há permissões exigidas, acesso liberado.
    if (!permissions || permissions.length === 0) {
      return true;
    }

    const qb = this.repository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .andWhere('user.deleted_at IS NULL');

    for (let index = 0; index < permissions.length; index++) {
      const perm = permissions[index];

      // 2. Prevenção de erro IN () no BD
      if (!perm.actions || perm.actions.length === 0) {
        continue; // Se não tem ações específicas para validar, pode ignorar ou retornar false dependendo da sua regra de negócio
      }

      const resKey = `res_${index}`;
      const actsKey = `acts_${index}`;
      const countKey = `count_${index}`;

      qb.andWhere(
        `EXISTS (
          SELECT 1
          FROM users_permissions up
          INNER JOIN permissions p ON p.id = up.permission_id
          INNER JOIN resources r ON r.id = p.resource_id
          INNER JOIN actions a ON a.id = p.action_id
          WHERE up.user_id = "user".id /* <-- Aspas adicionadas na palavra reservada */
            AND r.identifier = :${resKey}
            AND a.identifier IN (:...${actsKey})
            AND p.deleted_at IS NULL
            AND r.deleted_at IS NULL /* <-- Checagem de soft-delete adicionada */
            AND a.deleted_at IS NULL /* <-- Checagem de soft-delete adicionada */
          GROUP BY up.user_id /* <-- Group By adicionado */
          HAVING COUNT(DISTINCT a.identifier) = :${countKey}
        )`,
        {
          [resKey]: perm.resource,
          [actsKey]: perm.actions,
          [countKey]: perm.actions.length,
        },
      );
    }

    return (await qb.getRawOne()) !== undefined;
  }


  async resetToDefaultPassword(id: number) {
    const user = await this.repository.preload({
      id,
      password: await encryptPassword(DEFAULT_PASSWORD),
      mustChangePassword: true,
    });

    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }

    await this.repository.save(user);
    return { message: 'Senha resetada para a padrão. O usuário deverá alterá-la no próximo login.' };
  }

  async requestPasswordChange(dto: PasswordChangeRequestDto) {
    const genericResponse = {
      message: 'Se o usuário existir, a solicitação de alteração de senha foi enviada para o email.',
    };

    this.eventEmitter.emit('password.change.request', dto);

    return genericResponse;
  }

  async getUserPermissions(id: number) {

    const user = await this.repository.findOne({
      where: { id },
      select: {
        id: true,
        permissions: {
          id: true,
          resource: { 'id': true, 'name': true, 'identifier': true },
          action: { 'id': true, 'name': true, 'identifier': true }
        }
      },
      relations: ['permissions', 'permissions.resource', 'permissions.action']
    })

    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }

    return user.permissions;
  }
}
