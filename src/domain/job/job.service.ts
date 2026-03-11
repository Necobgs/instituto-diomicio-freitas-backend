import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobRepository } from './job.repository';
import { FilterDto } from '../shared/filter/filter-dto';

@Injectable()
export class JobService {
    constructor(
        private readonly repository: JobRepository
    ) { }

    async create(createJobDto: CreateJobDto) {
        const newJob = this.repository.create(createJobDto);
        return await this.repository.save(newJob);
    }

    async findAll(dto: FilterDto) {
        return await this.repository.filterAll(dto);
    }

    async findOneBy<T extends keyof Job>(key: T, value: Job[T]) {
        const job = await this.repository.findOne({ where: { [key]: value } });
        if (!job) {
            throw new NotFoundException(`Função com ${key} com valor ${value} não encontrado`);
        }
        return job;
    }

    async update(id: number, dto: UpdateJobDto) {
        const job = await this.repository.preload({ id, ...dto });
        if (!job) {
            throw new NotFoundException(`Job com ID ${id} não encontrado`);
        }

        if (dto.name) {
            const exists = await this.existsBy('name', dto.name);
            if (exists) {
                throw new BadRequestException(`Job com nome ${dto.name} já existe`);
            }
        }

        return await this.repository.save(job);
    }

    async remove(id: number) {
        const job = await this.findOneBy('id', id);
        return await this.repository.softRemove(job);
    }

    async existsBy<T extends keyof Job>(key: T, value: Job[T]) {
        return await this.repository.exists({ where: { [key]: value } });
    }
}
