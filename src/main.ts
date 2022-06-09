import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WebModule } from './web/web.module';

function useSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Notification Service')
    .setDescription(
      'This is a Notification Service that can be used to send templated notifications.',
    )
    .setVersion('1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(WebModule);
  const logger = new Logger('NestApplication');

  app.enableVersioning();
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  useSwagger(app);

  await app.listen(3000, () => logger.log('App listening on port 3000'));
}

bootstrap();
