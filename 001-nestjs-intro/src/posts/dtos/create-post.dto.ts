import { PostStatus } from '../enums/postStatus.enum';
import { PostType } from '../enums/postType.enum';

export class CreatePostDto {
  title: string;
  postType: PostType;
  slug: string;
  status: PostStatus;
  content?: string;
  schema?: string;
  featuredImageUrl?: string;
  publishOn?: Date;
  tags?: string[];
  metaOptions: [{ key: 'sideBarEnabled'; value: true }];
}
