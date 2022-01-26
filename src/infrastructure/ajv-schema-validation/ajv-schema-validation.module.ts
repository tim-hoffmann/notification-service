import { Module } from '@nestjs/common';
import Ajv from 'ajv';
import { SchemaValidationService } from '../../core/services/schema-validation-service.interface';
import { AjvSchemaValidationService } from './services/ajv-schema-validation.service';

@Module({
  providers: [
    { provide: SchemaValidationService, useClass: AjvSchemaValidationService },
    { provide: Ajv, useClass: Ajv },
  ],
})
export class AjvSchemaValidationModule {}
