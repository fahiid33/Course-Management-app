import { IsString, IsNotEmpty} from 'class-validator';

export class CourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  instructor: string;
}