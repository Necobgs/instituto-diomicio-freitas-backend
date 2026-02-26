import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from '../shared/public.decorator';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'Authenticate user and receive JWT token' })
  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    const user = await this.authService.validateUser(signInDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }
}