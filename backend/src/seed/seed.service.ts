import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as data from '../Courses/courses_data.json';  
import { Courses } from '../Courses/courses.schema';

@Injectable()
export class SeedService {
  constructor(@InjectModel(Courses.name) private readonly courseModel: Model<Courses>) {}

  async seedCourses(): Promise<void> {
    const courses = Object.values(data);
    const courseCount = await this.courseModel.countDocuments();

    if (courseCount === 0) {
    try {
      const validCourses = courses.map(course => {
        if (typeof course.title !== 'string' || 
            typeof course.description !== 'string' || 
            typeof course.instructor !== 'string' || 
            typeof course.schedule !== 'string') {
            console.error('Invalid course data:', course);
            return null;
        }
        return {
            title: course.title,
            description: course.description,
            instructor: course.instructor,
            schedule: course.schedule,
        };
    }).filter(course => course !== null);
      
      await this.courseModel.insertMany(validCourses);
      console.log('Courses successfully seeded');
    } catch (error) {
      console.error('Error seeding courses:', error.message);
    }
  } else {
    console.log('Courses already exist, skipping seeding');
  }
  }
}
