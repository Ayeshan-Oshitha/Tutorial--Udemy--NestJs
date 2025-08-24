import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly userService: UsersService) {}

  public findAll(userId: string) {
    const user = this.userService.findById(userId);

    return [
      {
        title: 'Post 1',
        content: 'Content of Post 1',
        user: user,
      },
      {
        title: 'Post 2',
        content: 'Content of Post 2',
        user: user,
      },
    ];
  }
}
