import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { FilterDto } from '../shared/filter/filter-dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    private readonly repository:UserRepository
  ){}

  async create(createUserDto: CreateUserDto) {
    const user = this.repository.create(createUserDto as any);
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOneBy('id', id);
    Object.assign(user, updateUserDto);
    return await this.repository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOneBy('id',id);
    return await this.repository.softRemove(user);
  }
}
