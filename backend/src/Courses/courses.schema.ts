import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Courses extends Document {
  @Prop({ required: true, index: true }) // indexing to handle data retrieval quickly
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, index: true }) // indexing to handle data retrieval quickly
  instructor: string;

  @Prop({ required: true })
  schedule: string;
}

export const CourseSchema = SchemaFactory.createForClass(Courses);
