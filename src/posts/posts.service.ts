import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileService } from 'src/file/file.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private fileService: FileService,
  ) {}
  async create(createPostDto: CreatePostDto, file, userId: string) {
    if (file) {
      file = this.fileService.createFile(file);
    }
    const createdPosts = await new this.postModel({
      title: createPostDto.title,
      content: createPostDto.content,
      author: userId,
      file: file,
      createdAt: Date.now(),
    });
    return createdPosts.save();
  }

  async findAll() {
    const posts = await this.postModel.find({});
    return posts;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  // update(id: number, updatePostDto: UpdatePostDto) {
  //   return `This action updates a #${id} post`;
  // }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
