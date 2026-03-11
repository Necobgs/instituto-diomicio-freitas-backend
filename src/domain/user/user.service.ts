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
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../role/entities/role.entity';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {

  constructor(
    private readonly repository: UserRepository,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly eventEmitter: EventEmitter2,
  ) { }

  async create(dto: CreateUserDto) {
    const user = this.repository.create(dto);
    user.password = DEFAULT_PASSWORD;

    if (dto.email) {
      const exists = await this.existsBy('email', dto.email)
      if (exists) {
        throw new BadRequestException('Usuário com o email já existe');
      }
    }

    if (dto.cpf) {
      const exists = await this.existsBy('cpf', dto.cpf)
      if (exists) {
        throw new BadRequestException('Usuário com o cpf já existe');
      }
    }

    const { password, ...result } = await this.repository.save(user);
    return result;
  }

  async findAll(dto: FilterDto) {
    const result = await this.repository.filterAll(dto);
    result.items = result.items.map(({ password, ...user }) => user) as User[];
    return result;
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
    }

    if (dto.cpf) {
      const exists = await this.existsBy('cpf', dto.cpf)
      if (exists) {
        throw new BadRequestException('Usuário com o cpf já existe');
      }
    }
    return await this.repository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOneBy('id', id);
    return await this.repository.softRemove(user);
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.repository.preload({
      tokenPasswordChange: dto.token,
      password: await encryptPassword(dto.newPassword),
      mustChangePassword: false,
    });

    if (!user || (user.tokenPasswordChangeExpiresAt && user.tokenPasswordChangeExpiresAt < new Date())) {
      throw new NotFoundException('Usuário não encontrado para alteração de senha');
    }

    user.tokenPasswordChange = null;
    user.tokenPasswordChangeExpiresAt = null;

    await this.repository.save(user);

    return {
      message: 'Senha alterada com sucesso',
    };
  }

  @OnEvent('password.change.request')
  async sendPasswordChangeEmail(dto: PasswordChangeRequestDto) {

    const user = await this.repository.preload({
      email: dto.email,
      tokenPasswordChange: randomUUID(),
      tokenPasswordChangeExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    console.log(user)

    if (!user) {
      return;
    }

    const resetToken = user.tokenPasswordChange;

    const frontendUrl = this.configService.get('PASSWORD_RESET_URL');
    const resetLink = `${frontendUrl}?token=${resetToken}`;

    console.log(await this.repository.save(user));

    await this.emailService.sendEmail(
      user.email,
      'Redefinição de Senha - Instituto Diomício Freitas',
      'password-recovery',
      { data: resetLink, year: new Date().getFullYear() },
    );
  }

  async hasPermissions(userId: number, permissions: AuthorizationDecoratorArgs[]) {
    if (permissions.length === 0) {
      return true;
    }

    const qb = this.repository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .andWhere('user.deleted_at IS NULL')
      .select('1');

    permissions.forEach((perm, index) => {
      qb.andWhere(
        `
        EXISTS (
          SELECT 1
          FROM users_permissions up
          INNER JOIN permissions p ON p.id = up.permission_id
          WHERE up.user_id = "user"."id"
            AND p.resource = :resource_${index}
            AND p.action IN (:...actions_${index})
            AND p.deleted_at IS NULL
          GROUP BY p.resource
          HAVING COUNT(DISTINCT p.action) = :actionsCount_${index}
        )
        `,
        {
          [`resource_${index}`]: perm.resource,
          [`actions_${index}`]: perm.actions,
          [`actionsCount_${index}`]: perm.actions.length,
        },
      );
    });
    return qb.getExists();
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
}
