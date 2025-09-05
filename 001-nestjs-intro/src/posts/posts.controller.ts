import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('{/:userId}')
  public getPosts(
    @Param('userId') userId: string,
    @Query() postQuery: GetPostsDto,
  ) {
    console.log(postQuery);
    return this.postsService.findAll(userId);
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a new blog post',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Post created successfully. Returns the created post.',
  })
  public createPost(@Body() createPostSto: CreatePostDto) {
    return this.postsService.create(createPostSto);
  }

  @Patch()
  @ApiOperation({
    summary: 'updated an exisiting blog post',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post created successfully. Returns the created post.',
  })
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.update(patchPostDto);
  }

  @Delete(':id')
  public deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
