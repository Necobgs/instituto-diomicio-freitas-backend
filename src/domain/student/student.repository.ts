import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../shared/filter/base-repository';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentRepository extends BaseRepository<Student> {
  constructor(dataSource: DataSource) {
    super(Student, dataSource);
  }
}
