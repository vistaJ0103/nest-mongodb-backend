import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  avatar: string;
  @Prop()
  refreshToken: string;
  @Prop()
  refreshTokenExpiration: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
