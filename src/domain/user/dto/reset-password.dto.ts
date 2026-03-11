import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {

  @ApiProperty({ example: 'NewP@ssword123' })
  @IsString()
  @MinLength(6)
  newPassword!: string;

  @ApiProperty({ example: 'token' })
  @IsString()
  @IsNotEmpty()
  token!: string
}

