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

  public async findAll(userId: string) {
    let posts = await this.postsRepository.find();

    return posts;
  }

  public async create(createPostDto: CreatePostDto) {
    let post = this.postsRepository.create(createPostDto);

    return await this.postsRepository.save(post);
  }

  public async delete(id: number) {
    // Find the post
    let post = await this.postsRepository.findOneBy({ id: id });

    // delete the post
    // await this.postsRepository.delete(id);

    // delete metaOptions
    // post &&
    //   post.metaOptions &&
    //   (await this.metaOptionsRepository.delete(post.metaOptions.id));

    // Fetch the MetaOption by its id and include the related Post (inverse relation)
    let inversePost = await this.metaOptionsRepository.find({
      where: { id: post?.metaOptions?.id },
      relations: {
        post: true,
      },
    });
    console.log(inversePost);

    return { deleted: true, id };
  }
}
