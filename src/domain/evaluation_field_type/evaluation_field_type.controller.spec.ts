import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationFieldTypeController } from './evaluation_field_type.controller';
import { EvaluationFieldTypeService } from './evaluation_field_type.service';

describe('EvaluationFieldTypeController', () => {
  let controller: EvaluationFieldTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluationFieldTypeController],
      providers: [EvaluationFieldTypeService],
    }).compile();

    controller = module.get<EvaluationFieldTypeController>(EvaluationFieldTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
