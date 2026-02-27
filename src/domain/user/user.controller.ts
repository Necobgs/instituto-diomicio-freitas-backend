import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterDto } from '../shared/filter/filter-dto';
import { Public } from '../shared/public.decorator';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('user')
@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Retrieve all users' })
  @Get()
  findAll(@Query() dto:FilterDto) {
    return this.userService.findAll(dto);
  }

  @ApiOperation({ summary: 'Retrieve a single user by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneBy('id',+id);
  }

  @ApiOperation({ summary: 'Update an existing user by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @ApiOperation({ summary: 'Change password at first login' })
  @Post('password-change')
  resetPassword(@Body() dto: ResetPasswordDto,@Request() req) {
    console.log(req.user)
    return this.userService.resetPassword(req.user.id,dto);
  }
}
