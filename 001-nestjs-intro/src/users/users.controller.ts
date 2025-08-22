import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  public getUsers() {
    return 'Return all users';
  }

  @Get('/:id/{:name}')
  public getUser(@Param() params: any) {
    return `Return a user - ${params.id} - ${params.name} `;
  }

  @Post()
  public createUser(@Body() request: any) {
    return 'Create a new user - ' + request.firstName + ' ' + request.lastName;
  }

  @Delete()
  public deleteUser(@Query() query: any) {
    return `Delete a user - ${query.limit}`;
  }
}
