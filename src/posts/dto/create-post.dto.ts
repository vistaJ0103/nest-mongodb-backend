import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Posts title',
    example: 'This is posts title',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Posts content',
    example: 'This is posts content with text',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  /**
   * User name
   */
  @ApiProperty({
    description: 'Posts author',
    example: 'This is posts author',
  })
  @IsOptional()
  author: string;

  /**
   * date of the creation of the news
   */
  @IsOptional()
  createdAt: string;

  @ApiPropertyOptional({ type: ['string'], format: 'binary' })
  @IsOptional()
  file?: any;
}
