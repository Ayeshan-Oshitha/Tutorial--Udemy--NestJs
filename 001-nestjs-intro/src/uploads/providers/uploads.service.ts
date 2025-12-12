import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Upload } from '../upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { ConfigService } from '@nestjs/config';
import { UploadedFile } from '../interfaces/upload-file.interface';
import { fileType } from '../enums/file-types.enum';

@Injectable()
export class UploadsService {
  constructor(
    /**
     * Inject uploadsRepository
     */
    @InjectRepository(Upload)
    private readonly uploadsRepository: Repository<Upload>,

    /**
     * Inject uploadToAwsProvider
     */
    private readonly uploadToAwsProvider: UploadToAwsProvider,

    /**
     * Inject configService
     */
    private readonly configService: ConfigService,
  ) {}

  public async uploadFile(file: Express.Multer.File) {
    // throw error for unsupported MIME types
    if (
      ['image/gif', 'image/png', 'image/jpg', 'image/jpeg'].includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException('Unsupported MIME file type');
    }

    try {
      // Upload to the file to AWS S3
      const name = await this.uploadToAwsProvider.fileUpload(file);

      // Generate to a new entry in database
      const uploadFile: UploadedFile = {
        name: name,
        path: `https://${this.configService.get('appConfig.awsCloudfrontUrl')}/${name}`,
        type: fileType.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };

      const upload = this.uploadsRepository.create(uploadFile);
      return await this.uploadsRepository.save(upload);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
