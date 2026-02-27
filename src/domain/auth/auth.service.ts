import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt'
import { User } from '../user/entities/user.entity';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService:UserService,
  ) {}

  async login(user: User) {
    const payload = { 
      id: user.id, 
      username: user.username,
      mustChangePassword: user.mustChangePassword
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async validateUser(dto:SignInDto): Promise<User | null> {
    
    const user = await this.userService.findOneBy('username', dto.username)
    if(!user) throw new UnauthorizedException('Credenciais não encontradas')
    if (await bcrypt.compare(dto.password, user.password)) {
      return user;
    }
    return null;
  }
}