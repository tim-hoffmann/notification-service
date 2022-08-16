import { BatchWriteCommandOutput, DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

export const batchDelete = async <T>(db: DynamoDBDocument, tableName: string, keys: T[]) => {
  const promises: Promise<BatchWriteCommandOutput>[] = [];

  // Dynamodb max batch size is 25
  for (let i = 0; i < keys.length; i += 25) {
    promises.push(
      db.batchWrite({
        RequestItems: {
          [tableName]: [...keys.slice(i, i + 25)].map((Key) => ({ DeleteRequest: { Key } })),
        },
      }),
    );
  }

  return await Promise.all(promises);
};
