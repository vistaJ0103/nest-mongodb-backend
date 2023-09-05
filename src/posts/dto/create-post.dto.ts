import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Posts title',
    example: 'This is posts title',
  })
  @ApiProperty({
    description: 'Posts content',
    example: 'This is posts content with text',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  like: number;
  @ApiPropertyOptional({ type: ['string'], format: 'binary' })
  @IsOptional()
  file?: any;
}
