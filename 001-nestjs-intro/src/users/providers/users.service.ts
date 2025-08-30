import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import type { ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';

/**
 * Class to connect users table and perform business operations
 */
@Injectable()
export class UsersService {
  /**
   * Injecting Services & Repositories
   */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
  ) {}

  /**
   * Method to find all users with pagination
   */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    console.log(this.profileConfiguration.apiKey);

    return [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@gmail.com',
      },
    ];
  }

  /**
   * Method to find a user by id
   */
  public async findById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  /**
   * Create a new user
   */
  public async Create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }
}
