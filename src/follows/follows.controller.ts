import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GeneralResponseDTO } from 'src/auth/dto/auth.dto';
import { AccessTokenGuard } from 'src/auth/strategies/gaurd.access_token';
import { ErrorResponseDTO } from 'src/error/dto/error.response.dto';
import { UsersService } from 'src/users/users.service';
import { FollowsService } from './follows.service';

@ApiBearerAuth('access-token')
@ApiTags('follows')
@Controller('follows')
export class FollowsController {
  constructor(
    private readonly followsService: FollowsService,
    private readonly usersService: UsersService,
  ) {}

  @Post('add')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: 'Add follow endpoint',
    description: 'follow added',
  })
  @ApiResponse({
    status: 200,
    type: GeneralResponseDTO,
    description: 'follow has been added.',
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponseDTO,
    description: 'Validation error',
  })
  create(@Request() req: any) {
    const userId = req.uerId;
    const followName = req.followName;
    return this.followsService.create(userId, followName);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  async following(@Request() req: any) {
    const user = await this.usersService.findById(req.userId);
    const userName = user.username;
    return this.followsService.findAll(userName);
  }
}
