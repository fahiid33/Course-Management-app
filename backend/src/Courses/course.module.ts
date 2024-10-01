import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Courses, CourseSchema } from './courses.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Courses.name, schema: CourseSchema }])],
  exports: [MongooseModule],
})
export class CourseModule {}
