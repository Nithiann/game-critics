/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  console.log(environment.mongodb_uri)
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
