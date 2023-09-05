import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Commentary,
  CommentarySchema,
} from 'src/commentaries/schemas/commentary.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UsersModule } from 'src/users/users.module';
import { FileService } from '../file/file.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post, PostSchema } from './schemas/post.schema';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([
      { name: Commentary.name, schema: CommentarySchema },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService, FileService],
  exports: [PostsService],
})
export class PostsModule {}
