import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';

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

  @Get('/{:id}')
  public getUsers(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return 'Return all users';
  }

  @Post()
  public createUser(@Body() request: any) {
    return 'Create a new user - ' + request.firstName + ' ' + request.lastName;
  }
}
