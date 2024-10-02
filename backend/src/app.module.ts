import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SeedService } from './seed/seed.service';
import { CourseModule } from './Courses/course.module';
import { AuthController } from './auth/auth.controller';
import { CoursesController } from './Courses/courses.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/course-management'),
    AuthModule,
    CourseModule,
  ],
  controllers: [AppController,
  ],
  providers: [AppService, SeedService],
})
export class AppModule {}
