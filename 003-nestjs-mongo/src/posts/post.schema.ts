import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PostType } from './enums/post-type.enum';
import { postStatus } from './enums/post-status.enum';

@Schema()
export class Post extends Document {
  @Prop({
    type: String,
    isRequired: true,
  })
  title: string;

  @Prop({
    type: String,
    isRequired: true,
    enum: PostType,
    default: PostType.POST,
  })
  postType: PostType;

  @Prop({
    type: String,
    isRequired: true,
  })
  slug: string;

  @Prop({
    type: String,
    isRequired: true,
    enum: postStatus,
    default: postStatus.DRAFT,
  })
  status: postStatus;

  @Prop({
    type: String,
    isRequired: false,
  })
  content?: string;

  @Prop({
    type: String,
    isRequired: false,
  })
  featuredImageUrl?: string;

  @Prop({
    type: Date,
    isRequired: false,
  })
  publishOn?: Date;
}

export const postSchema = SchemaFactory.createForClass(Post);
