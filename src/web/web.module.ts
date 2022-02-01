import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention } from '@automapper/core';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AjvSchemaValidationModule } from 'src/infrastructure/ajv-schema-validation/ajv-schema-validation.module';
import { ApplicationModule } from '../application/application.module';
import { CoreModule } from '../core/core.module';
import { PingController } from './controllers/ping.controller';
import { TemplateController } from './controllers/template.controller';

@Module({
  imports: [
    CoreModule,
    AjvSchemaValidationModule,
    ConfigModule.forRoot({ envFilePath: '.env.local' }),
    AutomapperModule.forRoot({
      options: [{ name: '', pluginInitializer: classes }],
      singular: true,
      globalNamingConventions: new CamelCaseNamingConvention(),
    }),
    ApplicationModule,
  ],
  controllers: [PingController, TemplateController],
})
export class WebModule {}
