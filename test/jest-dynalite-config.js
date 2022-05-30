module.exports = {
  tables: [
    {
      TableName: `notification-service--dev`,
      KeySchema: [
        { AttributeName: 'tenantId', KeyType: 'HASH' },
        { AttributeName: 'itemKey', KeyType: 'RANGE' },
      ],
      AttributeDefinitions: [
        { AttributeName: 'tenantId', AttributeType: 'S' },
        { AttributeName: 'itemKey', AttributeType: 'S' },
        { AttributeName: 'gsiSortKey', AttributeType: 'S' },
      ],
      ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
      GlobalSecondaryIndexes: [
        {
          IndexName: 'read-all-index',
          KeySchema: [
            {
              AttributeName: 'tenantId',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'gsiSortKey',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        },
      ],
      data: [
        {
          tenantId: 'test-tenant',
          itemKey: 'B2K4nfcZNi0mPMCH#TEMPLATE#',
          createdAt: '2022-02-19T14:02:53.713Z',
          from: 'test@test.de',
          gsiSortKey: 'TEMPLATE#2022-02-19T14:02:53.713Z',
          id: 'B2K4nfcZNi0mPMCH',
          locale: '',
          name: 'test2',
          subjectTemplate: '',
          textTemplate: '',
          transportType: 'Email',
          type: 'TEMPLATE',
          updatedAt: '2022-02-19T14:02:53.713Z',
        },
        {
          tenantId: 'test-tenant',
          itemKey: 'B2K4nfcZNi0mPMCH#TEMPLATE_LOCALE#de-CH',
          createdAt: '2022-02-19T14:04:26.409Z',
          from: 'test@test.de',
          gsiSortKey: '',
          id: 'B2K4nfcZNi0mPMCH',
          locale: 'de-CH',
          name: 'test2',
          subjectTemplate: 'Hello',
          textTemplate: 'This is a Test!',
          transportType: 'Email',
          type: 'TEMPLATE_LOCALE',
          updatedAt: '2022-02-19T14:04:26.409Z',
        },
        {
          tenantId: 'test-tenant',
          itemKey: 'B2K4nfcZNi0mPMCH#TEMPLATE_LOCALE#en-US',
          createdAt: '2022-02-19T14:02:53.713Z',
          from: 'test@test.de',
          gsiSortKey: '',
          id: 'B2K4nfcZNi0mPMCH',
          locale: 'en-US',
          name: 'test2',
          subjectTemplate: 'Hallo',
          textTemplate: 'Das ist ein Test!',
          transportType: 'Email',
          type: 'TEMPLATE_LOCALE',
          updatedAt: '2022-02-19T14:02:53.713Z',
        },
        {
          tenantId: 'test-tenant',
          itemKey: 'A2K4nfcZNi0mPMCH#TEMPLATE#',
          createdAt: '2022-02-19T14:02:53.713Z',
          from: 'test@test.de',
          gsiSortKey: 'TEMPLATE#2022-02-19T14:02:53.713Z',
          id: 'A2K4nfcZNi0mPMCH',
          locale: '',
          name: 'test1',
          subjectTemplate: '',
          textTemplate: '',
          transportType: 'Email',
          type: 'TEMPLATE',
          updatedAt: '2022-02-19T14:02:53.713Z',
        },
        {
          tenantId: 'test-tenant',
          itemKey: 'A2K4nfcZNi0mPMCH#TEMPLATE_LOCALE#de-CH',
          createdAt: '2022-02-19T14:04:26.409Z',
          from: 'test@test.de',
          gsiSortKey: '',
          id: 'A2K4nfcZNi0mPMCH',
          locale: 'en-US',
          name: 'test1',
          subjectTemplate: 'Hello',
          textTemplate: 'This is a Test!',
          transportType: 'Email',
          type: 'TEMPLATE_LOCALE',
          updatedAt: '2022-02-19T14:04:26.409Z',
        },
      ],
    },
  ],
};