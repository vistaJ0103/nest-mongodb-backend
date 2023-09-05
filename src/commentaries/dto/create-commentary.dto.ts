import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateCommentaryDto {
  @ApiProperty({
    description: 'Posts title',
    example: 'This is posts title',
  })
  commentary: string;

  @IsOptional()
  createdAt: string;
}
