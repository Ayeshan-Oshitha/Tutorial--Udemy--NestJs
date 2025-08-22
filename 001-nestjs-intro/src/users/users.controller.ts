import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  public getUsers() {
    return 'Return all users';
  }

  @Post()
  public createUser() {
    return 'Create a new user';
  }
}
