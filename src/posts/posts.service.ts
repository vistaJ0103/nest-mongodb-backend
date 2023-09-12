import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Commentary } from 'src/commentaries/schemas/commentary.schema';
import { FileService } from 'src/file/file.service';
import { Like, LikeDocument } from 'src/like/schemas/like.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
    private fileService: FileService,
    @InjectModel(Commentary.name)
    private commentaryModel: Model<Commentary>,
  ) {}
  async create(createPostDto: CreatePostDto, file, userId: string) {
    if (file) {
      file = this.fileService.createFile(file);
    }
    const user = await this.userModel.findById(userId);
    const author = user.username;

    const createdPosts = await new this.postModel({
      content: createPostDto.content,
      author: author,
      file: file,
      type: createPostDto.type,
      createdAt: Date.now(),
    });
    return createdPosts.save();
  }

  async findAll(pagenum: number, pagecnt: number, userId: string) {
    const page: number = (pagenum - 1) * pagecnt;
    const posts = await this.postModel
      .find({})
      .sort({ _id: -1 })
      .skip(page)
      .limit(pagecnt)
      .lean()
      .exec();
    const postdata: any[] = [];
    let liketype: boolean;
    // let liketype: boolean = false;
    for (const post of posts) {
      const comments = await this.commentaryModel
        .find({ postId: post._id })
        .sort({ _id: -1 })
        .limit(3);
      const cnt = await this.likeModel.find({
        postId: post._id,
        like: true,
      });
      const likecnt = cnt.length;
      const type = await this.likeModel.findOne({
        userId: userId,
        postId: post._id,
      });
      if (!type) {
        liketype = false;
      } else {
        liketype = type.like;
      }
      const _post = {
        ...post,
        likecnt,
        liketype,
      };
      postdata.push({ post: _post, comments });
    }
    return postdata;
  }

  async findById(id: string): Promise<PostDocument> {
    return this.postModel.findById(id);
  }

  async postsAll() {
    return this.postModel.find({});
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
