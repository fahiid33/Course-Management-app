import { Controller, Get, Query } from '@nestjs/common';
import { CoursesService } from './courses.service'; 
import { Courses } from './courses.schema'; 
import { CourseDto } from './dto/course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async getCourses(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<{ courses: Courses[], totalCount: number }> {
    const skip = (page - 1) * limit;
    console.log('get courses controller called with skip:', skip, 'limit:', limit);
    const { courses, totalCount } = await this.coursesService.findCourses(skip, limit);
    return { courses, totalCount }; // Return both courses and total count
  }
  @Get('search')
async searchCourses(@Query('searchTerm') searchTerm: string, @Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.coursesService.searchCourses(searchTerm, page, limit);
}

}
