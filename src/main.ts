import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WebModule } from './web/web.module';

async function bootstrap() {
  const app = await NestFactory.create(WebModule);
  const logger = new Logger('NestApplication');

  app.enableVersioning();
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000, () => logger.log('App listening on port 3000'));
}

bootstrap();
