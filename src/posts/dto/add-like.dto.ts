import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddLikeDto {
  @ApiProperty({
    description: 'Like Add',
    example: 'Like = 1 or UnLike = -1',
  })
  @IsNotEmpty()
  @IsString()
  like: number;
}
