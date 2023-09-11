import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like, LikeDocument } from './schemas/like.schema';

@Injectable()
export class LikeService {
  constructor(@InjectModel(Like.name) private likeModel: Model<LikeDocument>) {}

  async create(createLikeDto: CreateLikeDto, userId: string, postId: string) {
    const createLike = await new this.likeModel({
      userId: userId,
      postId: postId,
      like: createLikeDto.like,
    });
    createLike.save();
    const likecnt = this.likeModel.find({ postId: postId, like: true }).count();
    return likecnt;
  }
  async findcnt(postId: string) {
    return await this.likeModel.find({ postId: postId, like: true }).count();
  }

  async update(userId: string, postId: string, like: boolean) {
    await this.likeModel.findOneAndUpdate({
      userId,
      postId,
      like,
    });
    const likecnt = this.likeModel.find({ postId: postId, like: true }).count();
    return likecnt;
  }

  async find(postId: string, userId: string): Promise<LikeDocument> {
    return await this.likeModel.findOne({
      userId: userId,
      postId: postId,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
