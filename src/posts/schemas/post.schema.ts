import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true, toJSON: { getters: true } })
export class Post {
  @Prop({ required: true })
  content: string;

  @Prop({})
  file: string;
  @Prop({})
  type: string;

  @Prop({})
  author: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
