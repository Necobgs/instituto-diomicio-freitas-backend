import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
        const exists = await this.existsBy('name', createJobDto.name);
        if (exists) {
            throw new BadRequestException(`Função com nome ${createJobDto.name} já existe`);
        }
        const newJob = this.repository.create(createJobDto);
        return await this.repository.save(newJob);
    }

    async findAll(dto: FilterDto) {
        return await this.repository.filterAll(dto);
    }

    async findOneBy<T extends keyof Job>(key: T, value: Job[T]) {
        const job = await this.repository.findOne({ where: { [key]: value }, withDeleted: true });
        if (!job) {
            throw new NotFoundException(`Função com ${key} com valor ${value} não encontrado`);
        }
        return job;
    }

    async update(id: number, dto: UpdateJobDto) {
        const job = await this.repository.preload({ id, ...dto });
        if (!job) {
            throw new NotFoundException(`Função com ID ${id} não encontrada`);
        }

        if (dto.name) {
            const exists = await this.existsBy('name', dto.name);
            if (exists && job.name !== dto.name) {
                throw new BadRequestException(`Função com nome ${dto.name} já existe`);
            }
        }

        return await this.repository.save(job);
    }

    async remove(id: number) {
        const job = await this.findOneBy('id', id);
        return await this.repository.softRemove(job);
    }

    async restore(id: number) {
        const job = await this.repository.findOne({ where: { id }, withDeleted: true, select: { id: true, deleted_at: true } });
        if (!job) {
            throw new NotFoundException('Vaga não encontrada');
        }
        if (!job.deleted_at) {
            throw new BadRequestException('Vaga não está desativada');
        }
        await this.repository.restore(id);
        const restored = await this.repository.findOne({
            where: { id },
            select: { id: true, name: true, created_at: true, updated_at: true, deleted_at: true }
        });
        return restored;
    }

    async existsBy<T extends keyof Job>(key: T, value: Job[T]) {
        return await this.repository.exists({ where: { [key]: value } });
    }
}
