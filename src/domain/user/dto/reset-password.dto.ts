import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {

  @ApiProperty({ example: 'NewP@ssword123' })
  @IsString()
  @MinLength(6)
  newPassword!: string;
}

