import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FilterDto } from '../shared/filter/filter-dto';
import { StudentRepository } from './student.repository';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    private readonly repository: StudentRepository,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const s = this.repository.create(createStudentDto as any);
    return await this.repository.save(s);
  }

  async findAll(dto: FilterDto) {
    return await this.repository.filterAll(dto);
  }

  async findOneBy<T extends keyof Student>(key: T, value: Student[T]) {
    const student = await this.repository.findOneBy({ [key]: value });
    if (!student) {
      throw new NotFoundException(`Aluno com ${key} ${value} não encontrado`);
    }
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const s = await this.findOneBy('id', id);
    Object.assign(s, updateStudentDto);
    return await this.repository.save(s);
  }
  async remove(id: number) {
    const student = await this.findOneBy('id', id);
    return await this.repository.softRemove(student);
  }
}
