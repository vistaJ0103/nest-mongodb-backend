import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GeneralResponseDTO } from 'src/auth/dto/auth.dto';
import { AccessTokenGuard } from 'src/auth/strategies/gaurd.access_token';
import { ErrorResponseDTO } from 'src/error/dto/error.response.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@ApiBearerAuth('access-token')
@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AccessTokenGuard)
  @Post('add')
  // @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Add Posts',
    description: 'posts added',
  })
  @ApiResponse({
    status: 200,
    type: GeneralResponseDTO,
    description: 'Posts has been added.',
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponseDTO,
    description: 'Validation error',
  })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Request() req: any,
    @Body(ValidationPipe) createPostDto: CreatePostDto,
    @UploadedFile() file,
  ) {
    if (createPostDto.title && createPostDto.content) {
      return this.postsService.create(createPostDto, file, req.user.id);
    } else {
      throw new HttpException(
        {
          message: 'Title, content are Empty',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @UseGuards(AccessTokenGuard)
  @Get('all')
  findAll() {
    return this.postsService.findAll();
  }
  @UseGuards(AccessTokenGuard)
  @Patch(':post_id')
  async update(@Param('post_id') post_id: string, @Request() req: boolean) {
    const post = await this.postsService.findById(post_id);
    if (req == true) {
      const like = post.like + 1;
      return this.postsService.update(post_id, { like: like });
    } else {
      const like = post.like - 1;
      return this.postsService.update(post_id, { like: like });
    }
  }
}
