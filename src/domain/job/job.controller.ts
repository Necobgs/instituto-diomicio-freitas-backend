import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterDto } from '../shared/filter/filter-dto';

@ApiTags('Jobs')
@Controller('job')
export class JobController {
    constructor(private readonly jobService: JobService) { }

    @Post()
    create(@Body() createJobDto: CreateJobDto) {
        return this.jobService.create(createJobDto);
    }

    @Get()
    findAll(@Query() dto: FilterDto) {
        return this.jobService.findAll(dto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.jobService.findOneBy('id', +id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
        return this.jobService.update(+id, updateJobDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.jobService.remove(+id);
    }
}
