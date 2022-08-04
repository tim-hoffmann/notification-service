import { Injectable } from '@nestjs/common';
import Ajv from 'ajv';
import {
  SchemaValidationResult,
  SchemaValidationService,
} from '../../../core/services/schema-validation.service.interface';

@Injectable()
export class AjvSchemaValidationService implements SchemaValidationService {
  constructor(private readonly ajv: Ajv) {}

  async validateData(
    schema: string,
    data: Record<string, unknown>,
  ): Promise<SchemaValidationResult> {
    const parsedSchema = this.parseSchema(schema);

    if (!parsedSchema) {
      return { success: false, error: 'SCHEMA_PARSE_FAILED' };
    }

    const valid = await this.ajv.validate(parsedSchema, data);

    return {
      success: valid,
      error: !valid ? 'DATA_INVALID' : undefined,
    };
  }

  async validateSchema(schema: string): Promise<SchemaValidationResult> {
    const parsedSchema = this.parseSchema(schema);

    if (!parsedSchema) {
      return { success: false, error: 'SCHEMA_PARSE_FAILED' };
    }

    let valid: unknown;
    try {
      valid = await this.ajv.validateSchema(parsedSchema);
    } catch (ex) {
      return { success: false, error: 'SCHEMA_INVALID' };
    }

    return {
      success: valid ? true : false,
      error: !valid ? 'SCHEMA_INVALID' : undefined,
    };
  }

  private parseSchema(schema: string): any {
    try {
      return JSON.parse(schema);
    } catch {
      return;
    }
  }
}
