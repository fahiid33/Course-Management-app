import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SeedService } from './seed/seed.service';
import { CourseModule } from './Courses/course.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    AuthModule,
    CourseModule,
  ],
  controllers: [AppController,
  ],
  providers: [AppService, SeedService],
})
export class AppModule {}
