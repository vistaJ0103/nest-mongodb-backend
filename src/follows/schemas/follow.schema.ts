import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FollowDocument = Follow & Document;

@Schema()
export class Follow {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  followId: string;

  @Prop({})
  createdAt: string;
}

export const FollowSchema = SchemaFactory.createForClass(Follow);
