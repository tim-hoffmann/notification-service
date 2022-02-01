import { Test, TestingModule } from '@nestjs/testing';
import { TemplateService } from '../../../application/services/template.service';
import { TemplateController } from '../template.controller';

describe('TemplateController', () => {
  let controller: TemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateController],
      providers: [{ provide: TemplateService, useFactory: jest.fn() }],
    }).compile();

    controller = module.get<TemplateController>(TemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
