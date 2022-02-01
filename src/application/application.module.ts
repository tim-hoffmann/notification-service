import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '../core/core.module';
import { DynamoDbModule } from '../infrastructure/dynamo-db/dynamo-db.module';
import { TemplateProfile } from './mapping/profiles/template.profile';
import { TemplateService } from './services/template.service';

@Module({
  imports: [CoreModule, DynamoDbModule, ConfigModule],
  providers: [TemplateService, TemplateProfile],
  exports: [TemplateService],
})
export class ApplicationModule {}
