import { registerAs } from '@nestjs/config';

export default registerAs('dynamoDb', () => ({
  region: process.env.MOCK_DYNAMODB_ENDPOINT ? 'local' : process.env.REGION,
  endpoint: process.env.MOCK_DYNAMODB_ENDPOINT ? process.env.MOCK_DYNAMODB_ENDPOINT : undefined,
  tableName: process.env.DYNAMO_DB_TABLE ?? 'notification-service',
}));
