import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type PostDocument = Post & Document;

@Schema({ timestamps: true, toJSON: { getters: true } })
export class Post {
  @Prop({ required: true })
  content: string;

  @Prop({})
  file: string;
  @Prop({})
  type: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  author: Types.ObjectId;
  // @Prop({ type: SchemaTypes.ObjectId, ref: Commentary.name })
  // comment: Types.ObjectId;
  // @Prop({ type: SchemaTypes.ObjectId, ref: Like.name })
  // like: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
