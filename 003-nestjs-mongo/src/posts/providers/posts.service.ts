import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/providers/users.service';
import { Post } from '../post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    /*
     * Injecting Users Service
     */
    private readonly usersService: UsersService,

    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,
  ) {}

  public async createPost(createPostDto: CreatePostDto) {
    const newPost = new this.postModel(createPostDto);
    return await newPost.save();
  }

  public findAll(userId: string) {
    const user = this.usersService.findOneById(userId);

    return [
      {
        user: user,
        title: 'Test Tile',
        content: 'Test Content',
      },
      {
        user: user,
        title: 'Test Tile 2',
        content: 'Test Content 2',
      },
    ];
  }
}
