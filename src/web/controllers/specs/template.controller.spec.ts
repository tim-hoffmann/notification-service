import { Test, TestingModule } from '@nestjs/testing';
import applicationConfig from '../../../application/application.config';
import { TemplateService } from '../../../application/services/template.service';
import { TemplateController } from '../template.controller';

describe('TemplateController', () => {
  let controller: TemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateController],
      providers: [
        { provide: TemplateService, useFactory: jest.fn() },
        { provide: applicationConfig.KEY, useValue: { defaultConfig: 'en-US' } },
      ],
    }).compile();

    controller = module.get<TemplateController>(TemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
