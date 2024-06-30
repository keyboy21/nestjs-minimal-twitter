import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'fs';
import crypto from 'node:crypto';

export enum UploadType {
  IMAGE = 'image',
  VIDEO = 'video',
  DOCUMENT = 'document',
}

@Injectable()
export class UploadService {
  createFile(type: UploadType, file: Express.Multer.File): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = crypto.randomUUID() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'public', type);
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
      const filePath = path.resolve(__dirname, '..', 'public', fileName);
      fs.unlinkSync(filePath);
      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
