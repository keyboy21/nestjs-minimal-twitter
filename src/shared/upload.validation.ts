// import z from 'zod';
// import { MAX_AVATAR_SIZE } from './constants';

// export const ImageValidation = z.instanceof(File).optional()
//      .refine((file) => {
//           console.log('file', file)
//           if (file) { return file?.size <= MAX_FILE_SIZE }
//      },
//           `Max image size is: ${MAX_FILE_SIZE}`
//      );

// import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

// @Injectable()
// export class ImageValidationPipe implements PipeTransform {
//      transform(value: any, metadata: ArgumentMetadata) {
//           return value.size < MAX_FILE_SIZE;
//      }
// }
