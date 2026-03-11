import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { FilterDto } from '../shared/filter/filter-dto';
import { EvaluationRepository } from './evaluation.repository';
import { Evaluation } from './entities/evaluation.entity';
import { Student } from '../student/entities/student.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class EvaluationService {
  constructor(
    private readonly repository: EvaluationRepository,
  ) { }

  async create(dto: CreateEvaluationDto) {
    const student = await this.repository.manager.findOneBy(Student, { id: dto.studentId })

    if (!student) {
      throw new NotFoundException(`Aluno com id ${dto.studentId} não encontrado`);
    }

    const user = await this.repository.manager.findOneBy(User, { id: dto.userId })

    if (!user) {
      throw new NotFoundException(`Usuário com id ${dto.userId} não encontrado`);
    }

    const { userId, studentId, ...rest } = dto;

    const ev = this.repository.create({ user, student, ...rest } as any as Evaluation);
    return await this.repository.save(ev);
  }

  async findAll(dto: FilterDto) {
    return await this.repository.filterAll(dto);
  }

  async findOneBy<T extends keyof Evaluation>(key: T, value: Evaluation[T]) {
    const item = await this.repository.findOneBy({ [key]: value });
    if (!item) {
      throw new NotFoundException(`Avaliação com ${key} ${value} não encontrada`);
    }
    return item;
  }

  async existsBy<T extends keyof Evaluation>(key: T, value: Evaluation[T], withDeleted: boolean = true) {
    return await this.repository.exists({
      where: {
        [key]: value
      },
      withDeleted
    });
  }

  async update(id: number, updateEvaluationDto: UpdateEvaluationDto) {
    const ev = await this.findOneBy('id', id);
    Object.assign(ev, updateEvaluationDto);
    return await this.repository.save(ev);
  }

  async remove(id: number) {
    const item = await this.findOneBy('id', id);
    return await this.repository.softRemove(item);
  }
}
