import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as Joi from 'joi';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentariesModule } from './commentaries/commentaries.module';
import { ErrorModule } from './error/error.module';
import { FollowsModule } from './follows/follows.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string(),
        JWT_ACCESS_SECRET: Joi.string(),
        ACCESS_TOKEN_EXPIRATION: Joi.string(),
        JWT_REFRESH_SECRET: Joi.string(),
        REFRESH_TOKEN_EXPIRATION: Joi.string(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/images',
      rootPath: path.resolve(__dirname, 'static'),
    }),
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    PostsModule,
    ErrorModule,
    CommentariesModule,
    FollowsModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
