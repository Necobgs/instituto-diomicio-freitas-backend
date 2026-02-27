import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { FilterDto } from '../shared/filter/filter-dto';
import { User } from './entities/user.entity';
import { DEFAULT_PASSWORD } from '../../consts/default-password';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { EmailService } from '../../integrations/email/email.service';
import { encryptPassword } from '../../utils/encrypt-password';

@Injectable()
export class UserService {

  constructor(
    private readonly repository:UserRepository,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ){}

  async create(createUserDto: CreateUserDto) {
    const exists = await this.existsBy('email',createUserDto.email)
    if(exists){
      throw new BadRequestException('Usuário com o email já existe');
    }
    const user = this.repository.create(createUserDto);
    user.password = DEFAULT_PASSWORD
    return await this.repository.save(user);
  }

  async findAll(dto:FilterDto) {
    return await this.repository.filterAll(dto);
  }
  
  async findOneBy<T extends keyof User>(key: T, value: User[T]) {
    const user = await this.repository.findOneBy({
      [key]: value
    });
    if (!user) {
      throw new NotFoundException(`Usuário com ${key} ${value} não encontrado`);
    }
    return user
  }

  async existsBy<T extends keyof User>(key: T, value: User[T],withDeleted:boolean=true) {
    return await this.repository.exists({
      where:{ 
        [key]: value
      },
      withDeleted
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.repository.preload({id,...dto})
    if(!user){
      throw new BadRequestException('Usuário não encontrado para ser atualizado')
    }
    return await this.repository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOneBy('id',id);
    return await this.repository.softRemove(user);
  }

  async requestPasswordRecovery(dto: RecoverPasswordDto) {
    const user = await this.repository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      return {
        message: 'Se o email existir, um link de recuperação foi enviado.',
      };
    }

    const token = randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);

    await this.repository.save(user);

    const baseUrl = this.configService.get<string>('PASSWORD_RESET_URL');
    const resetUrl = baseUrl ? `${baseUrl}?token=${token}` : token;

    await this.emailService.sendEmail(user.email, 'Recuperação de Senha', 'password-recovery',{
      data:resetUrl,
      year:new Date().getFullYear(),
    });

    return {
      message: 'Se o email existir, um link de recuperação foi enviado.'
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.repository.findOne({
      where: { resetPasswordToken: dto.token },
    });

    if (
      !user ||
      !user.resetPasswordExpires ||
      user.resetPasswordExpires < new Date()
    ) {
      throw new BadRequestException('Token de recuperação inválido ou expirado');
    }

    user.password = await encryptPassword(dto.newPassword)
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await this.repository.save(user);

    return {
      message: 'Senha alterada com sucesso',
    };
  }
}
