import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserResponse } from './responses';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ZodValidationPipe } from 'src/shared/zodvalidationPipe';
import { editUserDto, editUserSchema } from './dto/editUser.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get(':userId')
  @ApiOperation({ summary: 'Get one user' })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  public async getOneUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getUserInfo(userId);
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Edit user' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
    ]),
  )
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  @UsePipes(new ZodValidationPipe(editUserSchema))
  @UseGuards(AuthGuard)
  public async editUser(
    @UploadedFiles(
      new ParseFilePipeBuilder().addFileTypeValidator({
        fileType: 'image/jpeg',
      }).build()
    ) file: Express.Multer.File,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: editUserDto,
  ) {
    return this.userService.editUser(userId, { ...body, image: file.buffer.toString() });
  }
}
