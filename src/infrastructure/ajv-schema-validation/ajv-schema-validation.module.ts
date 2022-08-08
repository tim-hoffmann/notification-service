import { Module } from '@nestjs/common';
import Ajv from 'ajv';
import { SCHEMA_VALIDATION_SERVICE } from '../../core/services/schema-validation.service.interface';
import { AjvSchemaValidationService } from './services/ajv-schema-validation.service';

@Module({
  providers: [{ provide: SCHEMA_VALIDATION_SERVICE, useClass: AjvSchemaValidationService }, Ajv],
  exports: [SCHEMA_VALIDATION_SERVICE],
})
export class AjvSchemaValidationModule {}
