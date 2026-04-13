import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterDto } from '../shared/filter/filter-dto';
import { Authorization } from '../shared/authorization/authorization.decorator';
import { Resources } from '../../consts/resources';
import { Actions } from '../../consts/actions';

@ApiTags('Jobs')
@ApiBearerAuth('access-token')
@Controller('job')
export class JobController {
    constructor(private readonly jobService: JobService) { }

    @Post()
    @Authorization({ resource: Resources.job, actions: [Actions.create] })
    create(@Body() createJobDto: CreateJobDto) {
        return this.jobService.create(createJobDto);
    }

    @Get()
    @Authorization({ resource: Resources.job, actions: [Actions.read] })
    findAll(@Query() dto: FilterDto) {
        return this.jobService.findAll(dto);
    }

    @Get(':id')
    @Authorization({ resource: Resources.job, actions: [Actions.read] })
    findOne(@Param('id') id: string) {
        return this.jobService.findOneBy('id', +id);
    }

    @Patch(':id')
    @Authorization({ resource: Resources.job, actions: [Actions.update] })
    update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
        return this.jobService.update(+id, updateJobDto);
    }

    @Delete(':id')
    @Authorization({ resource: Resources.job, actions: [Actions.delete] })
    remove(@Param('id') id: string) {
        return this.jobService.remove(+id);
    }
}
