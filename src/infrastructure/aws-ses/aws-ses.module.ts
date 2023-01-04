import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { NanoidModule } from '../nanoid/nanoid.module';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { CoreModule } from '../../core/core.module';
import { TEMPLATE_REPOSITORY } from '../../core/constants/di-tokens.constant';

@Module({
  imports: [CoreModule, ConfigModule.forFeature(dynamoDbConfig), NanoidModule],
  providers: [
    TemplateProfile,
    TemplateLocaleProfile,
    {
      provide: DynamoDBClient,
      useFactory: (config: ConfigType<typeof dynamoDbConfig>) => new DynamoDBClient({ ...config }),
      inject: [dynamoDbConfig.KEY],
    },
    {
      provide: DynamoDBDocument,
      useFactory: (client: DynamoDBClient) =>
        DynamoDBDocument.from(client, {
          marshallOptions: { removeUndefinedValues: true, convertClassInstanceToMap: true },
        }),
      inject: [DynamoDBClient],
    },
    { provide: TEMPLATE_REPOSITORY, useClass: TemplateDynamoDbRepository },
  ],
  exports: [TEMPLATE_REPOSITORY],
})
export class AwsSesModule {
  
}
