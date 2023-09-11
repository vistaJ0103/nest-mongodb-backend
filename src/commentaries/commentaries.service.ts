import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
// import { UpdateCommentaryDto } from './dto/update-commentary.dto';
import { User } from 'src/users/schemas/user.schema';
import { Commentary } from './schemas/commentary.schema';

@Injectable()
export class CommentariesService {
  constructor(
    @InjectModel(Commentary.name) private commentaryModel: Model<Commentary>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(
    userName: string,
    postId: string,
    createCommentaryDto: CreateCommentaryDto,
  ): Promise<Commentary> {
    const createdCommentary = await new this.commentaryModel({
      commentary: createCommentaryDto.commentary,
      userName: userName,
      postId: postId,
      createdAt: Date.now(),
    });
    return createdCommentary.save();
  }

  async findAll(postId): Promise<any> {
    const commentary = await this.commentaryModel
      .find({ postId: postId })
      .sort({ _id: -1 });
    return commentary;
  }

  findOne(id: number) {
    return `This action returns a #${id} commentary`;
  }

  // update(id: number, updateCommentaryDto: UpdateCommentaryDto) {
  //   return `This action updates a #${id} commentary`;
  // }

  remove(id: number) {
    return `This action removes a #${id} commentary`;
  }
}
