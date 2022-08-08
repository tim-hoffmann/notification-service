import { Test, TestingModule } from '@nestjs/testing';
import Ajv from 'ajv';
import { AjvSchemaValidationService } from '../ajv-schema-validation.service';

describe('AjvSchemaValidationService', () => {
  let service: AjvSchemaValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AjvSchemaValidationService, { provide: Ajv, useFactory: jest.fn() }],
    }).compile();

    service = module.get<AjvSchemaValidationService>(AjvSchemaValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
