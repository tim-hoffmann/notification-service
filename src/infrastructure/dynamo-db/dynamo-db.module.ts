import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { NanoidModule } from '../nanoid/nanoid.module';
import dynamoDbConfig, { defaultConfig } from './dynamo-db.config';
import { DynamoDbConfig } from './interfaces/dynamo-db-config.interface';
import { TemplateMasterProfile } from './mapping/profiles/template-master.profile';
import { TemplateProfile } from './mapping/profiles/template.profile';
import { TemplateRepository } from './repositories/template.repository';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule, ConfigModule.forFeature(dynamoDbConfig), NanoidModule],
  providers: [
    {
      provide: DynamoDBClient,
      useFactory: (configService: ConfigService) => {
        const config = configService.get<DynamoDbConfig>('dynamoDb', defaultConfig);
        return new DynamoDBClient({ ...config });
      },
      inject: [ConfigService],
    },
    {
      provide: DynamoDBDocument,
      useFactory: (client: DynamoDBClient) =>
        DynamoDBDocument.from(client, {
          marshallOptions: { removeUndefinedValues: true, convertClassInstanceToMap: true },
        }),
      inject: [DynamoDBClient],
    },
    TemplateRepository,
    TemplateProfile,
    TemplateMasterProfile,
  ],
  exports: [TemplateRepository],
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
