import { DynamoDbConfig } from './interfaces/dynamo-db-config.interface';

export default () => ({
  dynamoDb: {
    region: process.env.IS_OFFLINE ? 'localhost' : process.env.REGION,
    endpoint: process.env.IS_OFFLINE ? 'http://localhost:8000' : undefined,
    tableName: process.env.DYNAMO_DB_TABLE,
  },
});

export const defaultConfig: DynamoDbConfig = {
  region: undefined,
  endpoint: undefined,
  tableName: 'notification-service',
};
