import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { NanoidModule } from '../nanoid/nanoid.module';
import dynamoDbConfig from './dynamo-db.config';
import { TemplateProfile } from './mapping/profiles/template.profile';
import { TemplateLocaleProfile } from './mapping/profiles/template-locale.profile';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { CoreModule } from '../../core/core.module';
import { TemplateDynamoDbRepository } from './repositories/template-dynamo-db.repository';
import { TEMPLATE_REPOSITORY } from '../../core/constants/di-tokens.constant';

@Module({
  imports: [CoreModule, ConfigModule.forFeature(dynamoDbConfig), NanoidModule],
  providers: [
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
    TemplateProfile,
    TemplateLocaleProfile,
  ],
  exports: [TEMPLATE_REPOSITORY],
})
export class DynamoDbModule {
  constructor(
    private readonly client: DynamoDBClient,
    private readonly documentClient: DynamoDBDocument,
  ) {}

  async onModuleDestroy() {
    this.documentClient.destroy();
    this.client.destroy();
  }
}
