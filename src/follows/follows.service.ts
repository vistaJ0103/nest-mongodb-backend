import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follow } from './schemas/follow.schema';

@Injectable()
export class FollowsService {
  constructor(@InjectModel(Follow.name) private followModel: Model<Follow>) {}

  async create(userId: string, followName: string) {
    const createFollow = await new this.followModel({
      userId: userId,
      followName: followName,
      createdAt: Date.now(),
    });
    return createFollow.save();
  }

  async findAll(userName) {
    const follower = await this.followModel.find({ userName: userName });
    const followers = follower.length;
    const following = await this.followModel.find({ followName: userName });
    const followings = following.length;
    return { followers, followings };
  }

  findOne(id: number) {
    return `This action returns a #${id} follow`;
  }

  // update(id: number, updateFollowDto: UpdateFollowDto) {
  //   return `This action updates a #${id} follow`;
  // }

  remove(id: number) {
    return `This action removes a #${id} follow`;
  }
}
