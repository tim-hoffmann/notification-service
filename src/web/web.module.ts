import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention } from '@automapper/core';
import { AutomapperModule } from '@automapper/nestjs';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AjvSchemaValidationModule } from '../infrastructure/ajv-schema-validation/ajv-schema-validation.module';
import { ApplicationModule } from '../application/application.module';
import { CoreModule } from '../core/core.module';
import { PingController } from './controllers/ping.controller';
import { TemplateController } from './controllers/template.controller';
import { RequestLoggerMiddleware } from './middlewares/request-logger.middleware';
import webConfig from './web.config';

@Module({
  imports: [
    CoreModule,
    AjvSchemaValidationModule,
    ConfigModule.forRoot({ envFilePath: '.env.local', load: [webConfig] }),
    AutomapperModule.forRoot({
      options: [{ name: 'NOTIFICATION_SERVICE', pluginInitializer: classes }],
      singular: true,
      globalNamingConventions: new CamelCaseNamingConvention(),
    }),
    ApplicationModule,
  ],
  controllers: [PingController, TemplateController],
})
export class WebModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
