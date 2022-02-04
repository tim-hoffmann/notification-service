import { BatchWriteCommandOutput, DynamoDBDocument, PutCommandInput } from '@aws-sdk/lib-dynamodb';

export const batchPut = async (db: DynamoDBDocument, putCmds: PutCommandInput[]) => {
  const promises: Promise<BatchWriteCommandOutput>[] = [];

  // Dynamodb max batch size is 25
  for (let i = 0; i < putCmds.length; i += 25) {
    promises.push(
      db.batchWrite({
        RequestItems: { write: [...putCmds.slice(i, i + 25)].map((p) => ({ PutRequest: p })) },
      }),
    );
  }

  return await Promise.all(promises);
};
