import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LikeDocument = Like & Document;

@Schema({ timestamps: true })
export class Like {
  @Prop({ required: true })
  userId: string;

  @Prop({})
  postId: string;

  @Prop({})
  like: boolean;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
