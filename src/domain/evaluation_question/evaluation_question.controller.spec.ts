import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationQuestionController } from './evaluation_question.controller';
import { EvaluationQuestionService } from './evaluation_question.service';

describe('EvaluationQuestionController', () => {
  let controller: EvaluationQuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluationQuestionController],
      providers: [EvaluationQuestionService],
    }).compile();

    controller = module.get<EvaluationQuestionController>(EvaluationQuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
