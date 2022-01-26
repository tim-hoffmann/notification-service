import { Module } from '@nestjs/common';
import { AjvSchemaValidationModule } from 'src/infrastructure/ajv-schema-validation/ajv-schema-validation.module';
import { PingController } from './controllers/ping.controller';
import { TemplateController } from './controllers/template.controller';

@Module({
  imports: [AjvSchemaValidationModule],
  controllers: [PingController, TemplateController],
})
export class WebModule {}
