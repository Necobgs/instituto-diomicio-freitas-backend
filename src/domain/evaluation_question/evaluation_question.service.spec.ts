import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationQuestionService } from './evaluation_question.service';

describe('EvaluationQuestionService', () => {
  let service: EvaluationQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluationQuestionService],
    }).compile();

    service = module.get<EvaluationQuestionService>(EvaluationQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
