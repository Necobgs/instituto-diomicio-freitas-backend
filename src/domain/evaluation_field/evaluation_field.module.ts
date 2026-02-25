import { Module } from '@nestjs/common';
import { EvaluationFieldService } from './evaluation_field.service';
import { EvaluationFieldController } from './evaluation_field.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationField } from './entities/evaluation_field.entity';
import { EvaluationFieldRepository } from './evaluation_field.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationField])],
  controllers: [EvaluationFieldController],
  providers: [EvaluationFieldService, EvaluationFieldRepository],
  exports: [EvaluationFieldService, EvaluationFieldRepository],
})
export class EvaluationFieldModule {}
