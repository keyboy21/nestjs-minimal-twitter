import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserResponse } from './responses';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Get one user' })
  @ApiOperation({ summary: 'Get one user' })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  public async getOneUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getUserInfo(userId);
  }
}
