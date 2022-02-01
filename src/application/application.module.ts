import { Module } from '@nestjs/common';
import { DynamoDbModule } from '../infrastructure/dynamo-db/dynamo-db.module';
import { TemplateProfile } from './mapping/profiles/template.profile';
import { TemplateService } from './services/template.service';

@Module({
  imports: [DynamoDbModule],
  providers: [TemplateService, TemplateProfile],
  exports: [TemplateService],
})
export class ApplicationModule {}
