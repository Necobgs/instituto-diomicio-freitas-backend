import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReferralDto } from './dto/create-referral.dto';
import { UpdateReferralDto } from './dto/update-referral.dto';
import { Referral } from './entities/referral.entity';
import { ReferralRepository } from './referral.repository';
import { FilterDto } from '../shared/filter/filter-dto';
import { Student } from '../student/entities/student.entity';
import { Job } from '../job/entities/job.entity';
import { Enterprise } from '../enterprise/entities/enterprise.entity';
import { Not } from 'typeorm';
import { dot } from 'node:test/reporters';

@Injectable()
export class ReferralService {

  constructor(
    private readonly repository: ReferralRepository
  ) { }

  async create(createReferralDto: CreateReferralDto) {
    return await this.repository.manager.transaction(async (manager) => {
      const student = await manager.findOneBy(Student, { id: createReferralDto.studentId });

      if (!student) {
        throw new NotFoundException(`Aluno com id ${createReferralDto.studentId} não encontrado`);
      }

      const enterprise = await manager.findOneBy(Enterprise, { id: createReferralDto.enterpriseId });

      if (!enterprise) {
        throw new NotFoundException(`Empresa com id ${createReferralDto.enterpriseId} não encontrada`);
      }

      const job = await manager.findOneBy(Job, { id: createReferralDto.jobId });

      if (!job) {
        throw new NotFoundException(`Vaga com id ${createReferralDto.jobId} não encontrada`);
      }

      const exists = await manager.exists(Referral, {
        where: {
          student: { id: student.id },
          enterprise: { id: enterprise.id },
          job: { id: job.id }
        }
      });

      if (exists) {
        throw new BadRequestException(`Encaminhamento para o aluno ${student.name} na empresa ${enterprise.name} na vaga ${job.name} já existe`);
      }

      const referral = this.repository.create();
      referral.student = student;
      referral.enterprise = enterprise;
      referral.job = job;
      referral.admissionDate = createReferralDto.admissionDate;
      referral.terminationDateIeedf = createReferralDto.terminationDateIeedf;
      const savedReferral = await manager.save(Referral, referral);
      await manager.update(Student, { id: student.id }, { enterprise, job });
      return savedReferral;
    })
  }

  async findAll(dto: FilterDto) {
    const qb = this.repository.getFilteredQueryBuilder(dto).setFindOptions({
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
    return await this.repository.returnFilterAll(dto, qb);
  }

  async existsBy<T extends keyof Referral>(key: T, value: Referral[T]) {
    return await this.repository.exists({ where: { [key]: value } });
  }

  async findOneBy<T extends keyof Referral>(key: T, value: Referral[T]) {
    const referral = await this.repository.findOne({ where: { [key]: value }, relations: ['student', 'enterprise', 'job'], withDeleted: true });
    if (!referral) {
      throw new NotFoundException(`Encaminhamento com ${key} ${value} não encontrado`);
    }
    return referral;
  }

  async update(id: number, updateReferralDto: UpdateReferralDto) {
    return await this.repository.manager.transaction(async (manager) => {

      const referral = await this.repository.findOne({
        where: { id },
        relations: ['student', 'enterprise', 'job']
      });

      if (!referral) {
        throw new NotFoundException(`Encaminhamento com id ${id} não encontrado`);
      }

      if (updateReferralDto.studentId && updateReferralDto.studentId !== referral.student.id) {
        const student = await this.repository.manager.findOneBy(Student, { id: updateReferralDto.studentId });
        if (!student) {
          throw new NotFoundException(`Aluno com id ${updateReferralDto.studentId} não encontrado`);
        }
        referral.student = student;
      }

      if (updateReferralDto.enterpriseId && updateReferralDto.enterpriseId !== referral.enterprise.id) {
        const enterprise = await this.repository.manager.findOneBy(Enterprise, { id: updateReferralDto.enterpriseId });
        if (!enterprise) {
          throw new NotFoundException(`Empresa com id ${updateReferralDto.enterpriseId} não encontrada`);
        }
        referral.enterprise = enterprise;
        referral.student.enterprise = enterprise;
      }

      if (updateReferralDto.jobId && updateReferralDto.jobId !== referral.job.id) {
        const job = await this.repository.manager.findOneBy(Job, { id: updateReferralDto.jobId });
        if (!job) {
          throw new NotFoundException(`Cargo com id ${updateReferralDto.jobId} não encontrada`);
        }
        referral.job = job;
        referral.student.job = job;
      }

      const exists = await this.repository.exists({
        where: {
          id: Not(id),
          student: { id: referral.student.id },
          enterprise: { id: referral.enterprise.id },
          job: { id: referral.job.id }
        }
      });

      if (exists) {
        throw new BadRequestException(`Encaminhamento para o aluno ${referral.student.name} na empresa ${referral.enterprise.name} na vaga ${referral.job.name} já existe`);
      }

      referral.admissionDate = updateReferralDto.admissionDate;
      referral.terminationDateIeedf = updateReferralDto.terminationDateIeedf;
      return await this.repository.save(referral);
    })
  }

  async remove(id: number) {
    const referral = await this.repository.findOne({
      where: { id },
      select: {
        id: true
      }
    });
    if (!referral) {
      throw new NotFoundException(`Encaminhamento com id ${id} não encontrado`);
    }
    return await this.repository.softRemove(referral);
  }
}
