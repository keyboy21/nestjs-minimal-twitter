import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserResponse } from './responses';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ZodValidationPipe } from 'src/shared/zodvalidationPipe';
import { editUserBody, editUserDto, editUserPrivateSettingsBody, editUserPrivateSettingsDto, editUserPrivateSettingsSchema, editUserSchema } from './dto/editUser.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageSizeConstants } from 'src/shared/constants';
import { AvatarUploadDto, BackgroundUploadDto } from './dto/upload.dtos';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get(':userId')
  @ApiOperation({ summary: 'Get one user' })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  public async getOneUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getUser(userId);
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Edit user' })
  @ApiBody({ type: editUserBody })
  @ApiResponse({ status: HttpStatus.OK })
  @UsePipes(new ZodValidationPipe(editUserSchema))
  @UseGuards(AuthGuard)
  public async editUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: editUserDto,
  ) {
    return this.userService.editUser({ id: userId, payload: body });
  }

  @Patch('/private/:userId')
  @ApiOperation({ summary: 'Edit private user settings' })
  @ApiBody({ type: editUserPrivateSettingsBody })
  @ApiResponse({ status: HttpStatus.OK })
  @UsePipes(new ZodValidationPipe(editUserPrivateSettingsSchema))
  @UseGuards(AuthGuard)
  public async editPrivateUserSettings(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: editUserPrivateSettingsDto,
  ) {
    return this.userService.editUserPrivateSettings({ id: userId, payload: body });
  }

  @Post('avatar/:userId')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiOperation({ summary: 'Upload avatar', description: 'Upload avatar' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload avatar',
    type: AvatarUploadDto,
  })
  @UseGuards(AuthGuard)
  // TODO: Add validation
  public async uploadAvatar(
    @Param('userId', ParseIntPipe) userId: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: ImageSizeConstants.MAX_AVATAR_SIZE,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    avatar: Express.Multer.File,
  ) {
    return this.userService.uploadAvatar(userId, avatar);
  }

  @Post('background/:userId')
  @UseInterceptors(FileInterceptor('backgroundImage'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload background image',
    type: BackgroundUploadDto,
  })
  @ApiOperation({
    summary: 'Upload background image',
    description: 'Upload background image',
  })
  @UseGuards(AuthGuard)
  // TODO: Add validation
  public async uploadBackground(
    @Param('userId', ParseIntPipe) userId: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: ImageSizeConstants.MAX_BACKGROUND_SIZE,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    backgroundImage: Express.Multer.File,
  ) {
    return this.userService.uploadBackgroundImage(userId, backgroundImage);
  }
}
