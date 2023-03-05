import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
var httpContext = require('express-http-context');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(httpContext.middleware);
  await app.listen(3000);
}
bootstrap();
