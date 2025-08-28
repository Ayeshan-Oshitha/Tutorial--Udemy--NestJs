import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UsersService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,

    private readonly tagsService: TagsService,
  ) {}

  public async findAll(userId: string) {
    let posts = await this.postsRepository.find({
      relations: {
        tags: true,
      },
    });

    return posts;
  }

  public async create(createPostDto: CreatePostDto) {
    // find author from database based on the authorId
    const author = await this.userService.findById(createPostDto.authorId);

    const tags =
      createPostDto.tags &&
      (await this.tagsService.findMultipleTags(createPostDto.tags));

    if (!author) {
      throw new Error('Author not found');
    }

    let post = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    return await this.postsRepository.save(post);
  }

  public async update(patchPostDto: PatchPostDto) {
    // Find the Tags
    let tags = await this.tagsService.findMultipleTags(patchPostDto.tags || []);

    // Find the Post
    let post = await this.postsRepository.findOneBy({ id: patchPostDto.id });

    if (!post) {
      throw new Error('Post not found');
    }

    // update the properties of the Post
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.slug = patchPostDto.slug ?? post.slug;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    // Assign the new tags
    post.tags = tags;

    // Save the post and return
    return await this.postsRepository.save(post);
  }

  public async delete(id: number) {
    await this.postsRepository.delete(id);

    return { deleted: true, id };
  }
}
