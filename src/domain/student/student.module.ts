import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentRepository } from './student.repository';
import { EnterpriseModule } from '../enterprise/enterprise.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Student]),
    EnterpriseModule
  ],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
  exports:[StudentService, StudentRepository]
})
export class StudentModule {}
