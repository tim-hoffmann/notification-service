export interface SchemaValidationResult {
  success: boolean;
  error?: 'SCHEMA_PARSE_FAILED' | 'SCHEMA_INVALID' | 'DATA_INVALID';
}

export interface SchemaValidationService {
  validateData(schema: string, data: Record<string, unknown>): Promise<SchemaValidationResult>;
  validateSchema(schema: string): Promise<SchemaValidationResult>;
}

export const SCHEMA_VALIDATION_SERVICE = Symbol('SchemaValidationService');
