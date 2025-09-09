import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { User } from 'src/users/user.entity';

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly userService: UsersService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,

    private readonly tagsService: TagsService,
  ) {}

  public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    // find author from database based on the authorId

    let author: User | undefined = undefined;
    let tags = [];

    try {
      author = await this.userService.findById(user.sub);

      const tags =
        createPostDto.tags &&
        (await this.tagsService.findMultipleTags(createPostDto.tags));
    } catch (error) {
      throw new ConflictException(error);
    }

    if (!author) {
      throw new BadRequestException('Author not found');
    }

    if (createPostDto.tags?.length !== tags.length) {
      throw new BadRequestException('Please check your exception handling');
    }

    let post = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    try {
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
