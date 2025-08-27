import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UsersService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

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

  public async create(createPostDto: CreatePostDto) {
    let post = this.postsRepository.create(createPostDto);

    return await this.postsRepository.save(post);
  }
}
