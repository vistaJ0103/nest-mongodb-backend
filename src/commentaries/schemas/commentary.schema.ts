import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Commentary extends Document {
  @Prop()
  commentary: string;

  @Prop()
  postId: string;

  @Prop()
  userId: string;

  @Prop()
  createdAt: string;
}

/**
 * SchemaFactory for the class <Commentaries>
 */
export const CommentarySchema = SchemaFactory.createForClass(Commentary);
