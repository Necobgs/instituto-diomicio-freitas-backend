import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class PasswordChangeRequestDto {
  @ApiProperty({ example: 'john_doe@email.com' })
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  email!: string;
}

