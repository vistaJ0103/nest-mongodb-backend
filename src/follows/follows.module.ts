import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UsersModule } from 'src/users/users.module';
import { FollowsController } from './follows.controller';
import { FollowsService } from './follows.service';
import { Follow, FollowSchema } from './schemas/follow.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [FollowsController],
  providers: [FollowsService],
})
export class FollowsModule {}
