import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '../core/core.module';
import { AjvSchemaValidationModule } from '../infrastructure/ajv-schema-validation/ajv-schema-validation.module';
import { DynamoDbModule } from '../infrastructure/aws-dynamo-db/dynamo-db.module';
import { MjmlModule } from '../infrastructure/mjml/mjml.module';
import applicationConfig from './application.config';
import { TemplateLocaleProfile } from './mapping/profiles/template-locale.profile';
import { TemplateProfile } from './mapping/profiles/template.profile';
import { TemplateService } from './services/template.service';

@Module({
  imports: [
    CoreModule,
    DynamoDbModule,
    ConfigModule.forFeature(applicationConfig),
    AjvSchemaValidationModule,
    MjmlModule,
  ],
  providers: [TemplateService, TemplateProfile, TemplateLocaleProfile],
  exports: [TemplateService],
})
export class ApplicationModule {}
