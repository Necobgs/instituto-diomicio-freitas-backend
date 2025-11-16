import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationFieldService } from './evaluation_field.service';

describe('EvaluationFieldService', () => {
  let service: EvaluationFieldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluationFieldService],
    }).compile();

    service = module.get<EvaluationFieldService>(EvaluationFieldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
