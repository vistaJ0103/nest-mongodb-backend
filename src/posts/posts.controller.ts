import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
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
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GeneralResponseDTO } from 'src/auth/dto/auth.dto';
import { ErrorResponseDTO } from 'src/error/dto/error.response.dto';
import { UsersService } from 'src/users/users.service';
import { AccessTokenGuard } from '../common/gaurds/gaurd.access_token';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private usersService: UsersService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('add')
  @ApiConsumes('multipart/form-data')
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
      // console.log(user_id, '+++++++++++++');
      return this.postsService.create(createPostDto, file, req.user.sub);
    } else {
      throw new HttpException(
        {
          message: 'Title, body are Empty',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('all')
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postsService.update(+id, updatePostDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
