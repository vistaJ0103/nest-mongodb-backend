import { BadRequestException } from '@nestjs/common';

export const contentFileFilter = (
  req: any,
  file: { mimetype: string },
  callback: (arg0: BadRequestException, arg1: boolean) => void,
) => {
  const fileType = file.mimetype.split('/')[0];
  if (fileType !== 'video' && fileType !== 'image') {
    return callback(
      new BadRequestException('File must be an image or a video'),
      false,
    );
  }
  callback(null, true);
};
