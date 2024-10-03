import { Controller, Get, Query, Post, Req, Body, UseGuards} from '@nestjs/common';
import { CoursesService } from './courses.service'; 
import { Courses } from './courses.schema'; 
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from '../auth/auth.guard';


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
  
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createCourse(
    @Body() createCourseDto: CreateCourseDto,
    @Req() req: Request,
  ) {
    console.log('create course controller called with createCourseDto:', createCourseDto);
    const userId = (req as any).user._id; // Retrieve userId from req.user
    console.log('User ID:', userId); // Check if this prints
    return this.coursesService.createCourse(createCourseDto, userId);
  }

}
