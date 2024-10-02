import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Courses, CourseSchema } from './courses.schema';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Courses.name, schema: CourseSchema }])],
  providers: [CoursesService],
  exports: [MongooseModule],
  controllers: [CoursesController],
})
export class CourseModule {}
