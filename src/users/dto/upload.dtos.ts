import { ApiProperty } from '@nestjs/swagger';

export class AvatarUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  avatar: any;
}

export class BackgroundUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  backgroundImage: any;
}
