import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { postStatus } from '../enums/postStatus.enum';
import { postType } from '../enums/postType.enum';
import { CreatePostMetaOptionsDto } from './create-post-metaOptions.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post. Must be at least 4 characters long.',
    example: 'This is a title',
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  @MaxLength(512)
  title: string;

  @ApiProperty({
    description:
      'The type of the post. Possible values are post, page, story, or series.',
    enum: postType,
    example: postType.POST,
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    description:
      'The slug of the post. Must be lowercase and can only contain letters, numbers, and hyphens.',
    example: 'this-is-a-slug',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug must be lowercase and can only contain letters, numbers, and hyphens.',
  })
  @MaxLength(256)
  slug: string;

  @ApiProperty({
    description:
      'The status of the post. Possible values are draft, scheduled, review, or published.',
    enum: postStatus,
    example: postStatus.DRAFT,
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  @ApiPropertyOptional({
    description: 'The content of the post. Optional field.',
    example: 'This is the content of the post.',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialize your JSON object , else a validation error will be thrown',
    example:
      '{\r\n  "@context": "https://schema.org", \r\n  "@type": "Person"\r\n}',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'The URL of the featured image. Optional field.',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description:
      'The date and time when the post was published. Optional field.',
    example: '2023-10-01T12:00:00Z',
  })
  @IsISO8601() // ISO 8601 date format
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({
    description: 'An array of tags associated with the post. Optional field.',
    example: ['tag1', 'tag2', 'tag3'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'An array of meta options for the post. Optional field.',
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description:
            'The key of the meta option can be any string identifier.',
          example: 'sidebarEnabled',
        },
        value: {
          type: 'any',
          description: 'Any value that you want to save to the key',
          example: true,
        },
      },
    },
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true }) // Validate each item in the array
  @Type(() => CreatePostMetaOptionsDto) // Use class-transformer to handle nested objects
  metaOptions?: CreatePostMetaOptionsDto[];
}
