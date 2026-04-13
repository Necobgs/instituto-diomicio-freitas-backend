import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReferralService } from './referral.service';
import { CreateReferralDto } from './dto/create-referral.dto';
import { UpdateReferralDto } from './dto/update-referral.dto';
import { FilterDto } from '../shared/filter/filter-dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Authorization } from '../shared/authorization/authorization.decorator';
import { Resources } from '../../consts/resources';
import { Actions } from '../../consts/actions';

@ApiTags('Referral')
@ApiBearerAuth('access-token')
@Controller('referral')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) { }

  @ApiOperation({ summary: 'Criar encaminhamento' })
  @ApiBody({ type: CreateReferralDto })
  @Post()
  @Authorization({
    resource: Resources.referral,
    actions: [Actions.create]
  })
  create(@Body() createReferralDto: CreateReferralDto) {
    return this.referralService.create(createReferralDto);
  }

  @Get()
  @Authorization({
    resource: Resources.referral,
    actions: [Actions.read]
  })
  findAll(@Query() dto: FilterDto) {
    return this.referralService.findAll(dto);
  }

  @Get(':id')
  @Authorization({
    resource: Resources.referral,
    actions: [Actions.read]
  })
  findOne(@Param('id') id: string) {
    return this.referralService.findOneBy('id', +id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateReferralDto })
  @Authorization({
    resource: Resources.referral,
    actions: [Actions.update]
  })
  update(@Param('id') id: string, @Body() updateReferralDto: UpdateReferralDto) {
    return this.referralService.update(+id, updateReferralDto);
  }

  @Delete(':id')
  @Authorization({
    resource: Resources.referral,
    actions: [Actions.delete]
  })
  remove(@Param('id') id: string) {
    return this.referralService.remove(+id);
  }
}
