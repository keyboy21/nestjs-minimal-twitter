import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'fs';
import { nanoid } from 'nanoid'

export enum UploadType {
     IMAGE = 'image',
}

// TODO: test this correctness
@Injectable()
export class UploadService {
     createFile(type: UploadType, file): string {
          try {
               const fileExtension = file.originalname.split('.').pop();
               const fileName = nanoid() + '.' + fileExtension;
               const filePath = path.resolve(__dirname, '..', 'static', type);
               if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true });
               }
               fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
               return type + '/' + fileName;
          } catch (e) {
               throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
          }
     }

     removeFile(fileName: string) {
          try {
               const filePath = path.resolve(__dirname, '..', 'static', fileName);
               fs.unlinkSync(filePath);
               return true;
          } catch (error) {
               throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
          }
     }
}