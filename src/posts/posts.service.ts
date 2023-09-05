import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileService } from 'src/file/file.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
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
      like: 0,
      createdAt: Date.now(),
    });
    return createdPosts.save();
  }

  async findAll() {
    const posts = await this.postModel.find({});
    return posts;
  }

  async findById(id: string): Promise<PostDocument> {
    return this.postModel.findById(id);
  }

  // async update(post_id: number) {
  //   const post = await this.postModel.find({ postId: post_id });
  //   return post;
  // }

  async update(id: string, UpdatePostDto: UpdatePostDto) {
    return this.postModel.findByIdAndUpdate(id, UpdatePostDto, { new: true });
    // .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
