export class SchemaInvalidException extends Error {
  constructor() {
    super('Schema is invalid');
  }
}
