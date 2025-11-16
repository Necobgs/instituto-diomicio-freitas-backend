import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationFieldTypeService } from './evaluation_field_type.service';

describe('EvaluationFieldTypeService', () => {
  let service: EvaluationFieldTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluationFieldTypeService],
    }).compile();

    service = module.get<EvaluationFieldTypeService>(EvaluationFieldTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
