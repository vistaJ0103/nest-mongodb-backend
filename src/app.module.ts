import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ErrorModule } from './error/error.module';

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
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    PostsModule,
    ErrorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
