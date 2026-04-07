import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FilterDto } from '../shared/filter/filter-dto';
import { StudentRepository } from './student.repository';
import { Student } from './entities/student.entity';


@Injectable()
export class StudentService {
  constructor(
    private readonly repository: StudentRepository
  ) { }

  async create(dto: CreateStudentDto) {
    const student = this.repository.create(dto);
    const exists = await this.existsBy('cpf', dto.cpf)

    if (exists) {
      throw new BadRequestException('Estudante com o cpf já existe');
    }

    return await this.repository.save(student);
  }

  async findAll(dto: FilterDto) {
    return await this.repository.filterAll(dto);
  }

  async findOneBy<T extends keyof Student>(key: T, value: Student[T]) {
    const student = await this.repository.findOne({
      where: { [key]: value },
      relations: ['enterprise', 'job'],
      withDeleted: true
    });
    if (!student) {
      throw new NotFoundException(`Aluno com ${key} ${value} não encontrado`);
    }
    return student;
  }

  async existsBy<T extends keyof Student>(key: T, value: Student[T], withDeleted: boolean = true) {
    return await this.repository.exists({
      where: {
        [key]: value
      },
      withDeleted
    });
  }

  async update(id: number, dto: UpdateStudentDto) {
    const student = await this.repository.preload({ id, ...dto })

    if (!student) {
      throw new NotFoundException(`Aluno com id ${id} não encontrado`);
    }

    if (dto.cpf) {
      const exists = await this.existsBy('cpf', dto.cpf)
      if (exists && student.cpf !== dto.cpf) {
        throw new BadRequestException('Aluno com o cpf já existe');
      }
      student.cpf = dto.cpf;
    }

    return await this.repository.save(student);
  }

  async remove(id: number) {
    const student = await this.repository.findOne({
      where: { id },
      relations: ['evaluations', 'monitorings'],
      withDeleted: true
    });

    if (!student) {
      throw new NotFoundException(`Aluno com id ${id} não encontrado`);
    }

    return await this.repository.softRemove(student);
  }
}
