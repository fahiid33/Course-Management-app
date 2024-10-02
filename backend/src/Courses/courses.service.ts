import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Courses } from './courses.schema'; // Adjust import as needed

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Courses.name) private courseModel: Model<Courses>) {}

  async findCourses(skip: number, limit: number): Promise<{ courses: Courses[], totalCount: number }> {
    const totalCount = await this.courseModel.countDocuments(); // Get total count of courses
    const courses = await this.courseModel.find().skip(skip).limit(limit).exec(); // Fetch courses with pagination
    return { courses, totalCount }; // Return both courses and total count
  }
  async searchCourses(title: string, instructor: string): Promise<Courses[]> {
    const query = {};
    if (title) {
      query['title'] = { $regex: title, $options: 'i' };
    }
    if (instructor) {
      query['instructor'] = { $regex: instructor, $options: 'i' };
    }
    return this.courseModel.find(query).exec();
  }
}
