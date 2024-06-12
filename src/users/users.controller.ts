import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserResponse } from './responses';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ZodValidationPipe } from 'src/shared/zodvalidationPipe';
import { editUserDto, editUserSchema } from './dto/editUser.dto';

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
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  @UsePipes(new ZodValidationPipe(editUserSchema))
  @UseGuards(AuthGuard)
  public async editUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: editUserDto,
  ) {
    return this.userService.editUser(userId, body);
  }
}
