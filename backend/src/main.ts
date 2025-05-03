import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TODO: Add support to env vars (with validation)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();