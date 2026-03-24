import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { FilterDto } from '../shared/filter/filter-dto';
import { EnterpriseRepository } from './enterprise.repository';
import { Enterprise } from './entities/enterprise.entity';

@Injectable()
export class EnterpriseService {
  constructor(
    private readonly repository: EnterpriseRepository,
  ) { }

  async create(dto: CreateEnterpriseDto) {
    const enterprise = this.repository.create(dto);

    const exists = await this.existsBy('cnpj', dto.cnpj)
    if (exists) {
      throw new BadRequestException('Empresa com o cnpj já existe');
    }

    return await this.repository.save(enterprise);
  }

  async findAll(dto: FilterDto) {
    return await this.repository.filterAll(dto);
  }

  async findOneBy<T extends keyof Enterprise>(key: T, value: Enterprise[T]) {
    const item = await this.repository.findOneBy({ [key]: value });
    if (!item) throw new NotFoundException(`Empresa com ${key} ${value} não encontrada`);
    return item;
  }

  async existsBy<T extends keyof Enterprise>(key: T, value: Enterprise[T], withDeleted: boolean = true) {
    return await this.repository.exists({
      where: {
        [key]: value
      },
      withDeleted
    });
  }

  async update(id: number, dto: UpdateEnterpriseDto) {
    const enterprise = await this.repository.preload({ id, ...dto });
    if (!enterprise) {
      throw new NotFoundException(`Empresa com id ${id} não encontrada`);
    }

    if (dto.cnpj) {
      const exists = await this.existsBy('cnpj', dto.cnpj)
      if (exists && enterprise.cnpj !== dto.cnpj) {
        throw new BadRequestException('Empresa com o cnpj já existe');
      }
    }

    return await this.repository.save(enterprise);
  }

  async remove(id: number) {
    const item = await this.findOneBy('id', id);
    return await this.repository.softRemove(item);
  }
}
