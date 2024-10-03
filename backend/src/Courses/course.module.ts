import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Courses, CourseSchema } from './courses.schema';
import {User, UserSchema} from '../users/user.schema';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Courses.name, schema: CourseSchema },
      { name: User.name, schema: UserSchema },
    ]),
    AuthModule,
  ],
  providers: [CoursesService],
  exports: [MongooseModule],
  controllers: [CoursesController],
})
export class CourseModule {}
