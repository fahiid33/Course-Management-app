import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  console.log('JWT Secrettttt:', process.env.JWT_SECRET);
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });
  const seedService = app.get(SeedService);
  await seedService.seedCourses();

  await app.listen(3001);
}
bootstrap();
