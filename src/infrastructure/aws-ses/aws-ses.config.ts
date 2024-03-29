import { registerAs } from '@nestjs/config';

export default registerAs('ses', () => ({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMO_DB_ENDPOINT,
  tableName: process.env.DYNAMO_DB_TABLE ?? 'notification-service',
}));
