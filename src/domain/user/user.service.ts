import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUser } from './dto/filter-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FilterEngine } from '../shared/filter/filter_engine';

@Injectable()
export class UserService {

  private readonly filterEngine : FilterEngine<User>

  constructor(
    @InjectRepository(User) repository:Repository<User>
  ){
    this.filterEngine = new FilterEngine(repository)
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(dto:FilterUser) {
    console.log(dto);
    console.log(Object.keys(dto))
    return await this.filterEngine.filterAll(dto);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
