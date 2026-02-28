import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
import { UserWithoutPassDto } from './dto/user-without-pass.dto';

@Injectable()
export class UserService {

  constructor(
    private readonly repository: UserRepository,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) { }

  async create(dto: CreateUserDto) {
    const exists = await this.existsBy('username', dto.username)
    if (exists) {
      throw new BadRequestException('Usuário com o email já existe');
    }
    const user = this.repository.create(dto);
    user.password = DEFAULT_PASSWORD;
    user.mustChangePassword = true;

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

  async resetPassword(userId: number, dto: ResetPasswordDto) {
    const user = await this.repository.preload({
      id: userId,
      password: await encryptPassword(dto.newPassword),
      mustChangePassword: false
    });

    if (!user) {
      throw new NotFoundException(`Usuário com id ${userId} não encontrado`);
    }

    await this.repository.save(user);

    return {
      message: 'Senha alterada com sucesso',
    };
  }

  async resetToDefaultPassword(id: number) {
    const user = await this.repository.preload({
      id,
      password: await encryptPassword(DEFAULT_PASSWORD),
      mustChangePassword: true
    });

    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }

    await this.repository.save(user);
    return { message: 'Senha resetada para a padrão. O usuário deverá alterá-la no próximo login.' };
  }
}
