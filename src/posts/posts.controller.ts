import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
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
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file,
  ) {
    if (createPostDto.content) {
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
  findAll(
    @Request() req: any,
    @Query('pagenum', ParseIntPipe) pagenum: number,
    @Query('pagecnt', ParseIntPipe) pagecnt: number,
  ) {
    const pagenumber = pagenum;
    const pagecounter = pagecnt;
    return this.postsService.findAll(pagenumber, pagecounter, req.user.id);
  }
}
