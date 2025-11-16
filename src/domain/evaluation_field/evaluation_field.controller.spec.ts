import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationFieldController } from './evaluation_field.controller';
import { EvaluationFieldService } from './evaluation_field.service';

describe('EvaluationFieldController', () => {
  let controller: EvaluationFieldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluationFieldController],
      providers: [EvaluationFieldService],
    }).compile();

    controller = module.get<EvaluationFieldController>(EvaluationFieldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
