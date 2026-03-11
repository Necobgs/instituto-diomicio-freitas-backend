import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReferralDto } from './dto/create-referral.dto';
import { UpdateReferralDto } from './dto/update-referral.dto';
import { Referral } from './entities/referral.entity';
import { ReferralRepository } from './referral.repository';
import { FilterDto } from '../shared/filter/filter-dto';

@Injectable()
export class ReferralService {

  constructor(
    private readonly repository: ReferralRepository
  ) { }

  create(createReferralDto: CreateReferralDto) {
    return 'This action adds a new referral';
  }

  findAll(dto: FilterDto) {
    return this.repository.filterAll(dto);
  }

  async existsBy<T extends keyof Referral>(key: T, value: Referral[T]) {
    return await this.repository.exists({ where: { [key]: value } });
  }

  async findOneBy<T extends keyof Referral>(key: T, value: Referral[T]) {
    const referral = await this.repository.findOneBy({ [key]: value });
    if (!referral) {
      throw new NotFoundException(`Encaminhamento com ${key} ${value} não encontrado`);
    }
    return referral;
  }

  update(id: number, updateReferralDto: UpdateReferralDto) {
    return `This action updates a #${id} referral`;
  }

  remove(id: number) {
    return `This action removes a #${id} referral`;
  }
}
