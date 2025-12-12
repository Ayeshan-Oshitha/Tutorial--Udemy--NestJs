import { fileType } from '../enums/file-types.enum';

export interface UploadedFile {
  name: string;
  path: string;
  type: fileType;
  mime: string;
  size: number;
}
