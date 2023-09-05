import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Commentary } from 'src/commentaries/schemas/commentary.schema';
import { FileService } from 'src/file/file.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private fileService: FileService,
    @InjectModel(Commentary.name)
    private commentaryModel: Model<Commentary>,
  ) {}
  async create(createPostDto: CreatePostDto, file, userId: string) {
    if (file) {
      file = this.fileService.createFile(file);
    }
    const createdPosts = await new this.postModel({
      content: createPostDto.content,
      author: userId,
      file: file,
      type: createPostDto.type,
      like: 0,
      createdAt: Date.now(),
    });
    return createdPosts.save();
  }

  async findAll(pagenum: number, pagecnt: number) {
    const page: number = (pagenum - 1) * pagecnt;
    const posts = await this.postModel.find({}).skip(page).limit(pagecnt);
    const res: any[] = [];
    for (let i = 0; i < posts.length; i++) {
      const comments = await this.commentaryModel
        .find({ postId: posts[i].id })
        .limit(3);
      const _res = {
        post: posts[i],
        comments,
      };
      res.push(_res);
    }
    return res;
  }

  async findById(id: string): Promise<PostDocument> {
    return this.postModel.findById(id);
  }

  async postsAll() {
    return this.postModel.find({});
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
