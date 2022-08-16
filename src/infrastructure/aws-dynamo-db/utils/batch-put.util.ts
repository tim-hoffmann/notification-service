import { BatchWriteCommandOutput, DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { BaseModel } from '../models/base.model';

export const batchPut = async <T extends BaseModel>(
  db: DynamoDBDocument,
  tableName: string,
  items: T[],
) => {
  const promises: Promise<BatchWriteCommandOutput>[] = [];

  // Dynamodb max batch size is 25
  for (let i = 0; i < items.length; i += 25) {
    promises.push(
      db.batchWrite({
        RequestItems: {
          [tableName]: [...items.slice(i, i + 25)].map((Item) => ({ PutRequest: { Item } })),
        },
      }),
    );
  }

  return await Promise.all(promises);
};
