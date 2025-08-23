import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';

@Controller('users')
export class UsersController {
  /**
   *  Final Endpoint - /users/id?limit=10&page=1
   * Param id - optional, convert to integer, cannot have a default value
   * Query limit - optional, convert to integer, default value is 10
   * Query page - optional, convert to integer, default value is 1
   *  ==> USE CASES
   * /users/ -> returns all users with default pagination
   * /users/1223 -> returns one users whos id is 1223
   * users?limit=5&page=2 returns page 2 with limit of pagination 5
   */

  @Get('{/:id}')
  public getUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return 'Return all users';
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return 'Create a new user - ' + createUserDto.firstName;
  }
}
