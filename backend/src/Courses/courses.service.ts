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
  async searchCourses(searchTerm: string, page: number, limit: number): Promise<{ courses: Courses[], totalCount: number }> {
    const query: any = {};
    console.log('search courses service called with searchTerm:', searchTerm);

    if (searchTerm) {
        query['$or'] = [
            { title: { $regex: searchTerm, $options: 'i' } },
            { instructor: { $regex: searchTerm, $options: 'i' } }
        ];
    }

    const skip = (page - 1) * limit;
    const courses = await this.courseModel.find(query).skip(skip).limit(limit).exec();
    const totalCount = await this.courseModel.countDocuments(query).exec();

    console.log('search courses service called with query:', query);
    console.log('find:', courses);
    
    return { courses, totalCount };
}
}
