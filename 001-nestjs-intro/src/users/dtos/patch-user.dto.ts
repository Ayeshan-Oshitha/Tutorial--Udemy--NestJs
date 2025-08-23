import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class PatchUserDto extends PartialType(CreateUserDto) {
  // This class extends CreateUserDto and makes all its properties optional.
  // It can be used to patch a user, allowing any subset of the properties defined in CreateUserDto.
}
