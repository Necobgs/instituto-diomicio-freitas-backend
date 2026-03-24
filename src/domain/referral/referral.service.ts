import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReferralDto } from './dto/create-referral.dto';
import { UpdateReferralDto } from './dto/update-referral.dto';
import { Referral } from './entities/referral.entity';
import { ReferralRepository } from './referral.repository';
import { FilterDto } from '../shared/filter/filter-dto';
import { Student } from '../student/entities/student.entity';
import { Job } from '../job/entities/job.entity';
import { Enterprise } from '../enterprise/entities/enterprise.entity';

@Injectable()
export class ReferralService {

  constructor(
    private readonly repository: ReferralRepository
  ) { }

  async create(createReferralDto: CreateReferralDto) {
    const student = await this.repository.manager.findOneBy(Student, { id: createReferralDto.studentId });

    if (!student) {
      throw new NotFoundException(`Aluno com id ${createReferralDto.studentId} não encontrado`);
    }

    const enterprise = await this.repository.manager.findOneBy(Enterprise, { id: createReferralDto.enterpriseId });

    if (!enterprise) {
      throw new NotFoundException(`Empresa com id ${createReferralDto.enterpriseId} não encontrada`);
    }

    const job = await this.repository.manager.findOneBy(Job, { id: createReferralDto.jobId });

    if (!job) {
      throw new NotFoundException(`Vaga com id ${createReferralDto.jobId} não encontrada`);
    }

    const referral = this.repository.create();
    referral.student = student;
    referral.enterprise = enterprise;
    referral.job = job;
    referral.admissionDate = createReferralDto.admissionDate;
    referral.terminationDateIeedf = createReferralDto.terminationDateIeedf;
    return await this.repository.insert(referral);
  }

  findAll(dto: FilterDto) {
    return this.repository.getFilteredQueryBuilder(dto).setFindOptions({
      relations: ['student', 'enterprise', 'job'],
      select: {
        id: true,
        student: {
          id: true,
          name: true,
        },
        enterprise: {
          id: true,
          name: true,
        },
        job: {
          id: true,
          name: true,
        },
        admissionDate: true,
        terminationDateIeedf: true,
      }
    });
  }

  async existsBy<T extends keyof Referral>(key: T, value: Referral[T]) {
    return await this.repository.exists({ where: { [key]: value } });
  }

  async findOneBy<T extends keyof Referral>(key: T, value: Referral[T]) {
    const referral = await this.repository.findOne({ where: { [key]: value }, relations: ['student', 'enterprise', 'job'] });
    if (!referral) {
      throw new NotFoundException(`Encaminhamento com ${key} ${value} não encontrado`);
    }
    return referral;
  }

  async update(id: number, updateReferralDto: UpdateReferralDto) {
    const referral = await this.findOneBy('id', id);

    if (updateReferralDto.studentId) {
      const student = await this.repository.manager.findOneBy(Student, { id: updateReferralDto.studentId });
      if (!student) {
        throw new NotFoundException(`Aluno com id ${updateReferralDto.studentId} não encontrado`);
      }
      referral.student = student;
    }

    if (updateReferralDto.enterpriseId) {
      const enterprise = await this.repository.manager.findOneBy(Enterprise, { id: updateReferralDto.enterpriseId });
      if (!enterprise) {
        throw new NotFoundException(`Empresa com id ${updateReferralDto.enterpriseId} não encontrada`);
      }
      referral.enterprise = enterprise;
    }

    if (updateReferralDto.jobId) {
      const job = await this.repository.manager.findOneBy(Job, { id: updateReferralDto.jobId });
      if (!job) {
        throw new NotFoundException(`Cargo com id ${updateReferralDto.jobId} não encontrada`);
      }
      referral.job = job;
    }

    referral.admissionDate = updateReferralDto.admissionDate;
    referral.terminationDateIeedf = updateReferralDto.terminationDateIeedf;
    return await this.repository.save(referral);
  }

  async remove(id: number) {
    const exists = await this.repository.findOne({
      where: { id },
      select: {
        id: true,
        student: {
          id: true
        }
      },
      relations: ['student']
    });
    if (!exists) {
      throw new NotFoundException(`Encaminhamento com id ${id} não encontrado`);
    }
    return await this.repository.delete(id);
  }
}
