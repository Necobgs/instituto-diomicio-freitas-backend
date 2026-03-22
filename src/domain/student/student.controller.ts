import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FilterDto } from '../shared/filter/filter-dto';
import { Authorization } from '../shared/authorization/authorization.decorator';
import { Resources } from '../../consts/resources';
import { Actions } from '../../consts/actions';

@ApiTags('student')
@ApiBearerAuth('access-token')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @ApiOperation({ summary: 'Create a new student' })
  @Authorization({ resource: Resources.student, actions: [Actions.create] })
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @ApiOperation({ summary: 'List all students' })
  @Get()
  findAll(@Query() dto: FilterDto) {
    return this.studentService.findAll(dto);
  }

  @ApiOperation({ summary: 'Get student by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOneBy('id', +id);
  }

  @ApiOperation({ summary: 'Update student by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @ApiOperation({ summary: 'Delete student by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
