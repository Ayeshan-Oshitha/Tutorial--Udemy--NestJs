import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import type { ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { GoogleUser } from '../interfaces/googleUser.interface';

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

    // Inject CreateManyUsers Provider
    private readonly usersCreateManyProvider: UsersCreateManyProvider,

    //  Inject create user provider
    private readonly createUserProvider: CreateUserProvider,

    // Inject find one user by email provider
    private readonly findOneUserByEmail: FindOneUserByEmailProvider,

    // Inject findOneByGoogleId provider
    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,

    // Inject createGoogleUser provider
    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) {}

  /**
   * Method to find all users with pagination
   */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    return this.usersRepository.find();
  }

  /**
   * Method to find a user by id
   */
  public async findById(id: number) {
    let user: User | null = null;

    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try again later',
        {
          description: 'Database connection error',
        },
      );
    }

    if (!user) {
      throw new BadRequestException('User with this id does not exist');
    }

    return user;
  }
  /**
   * Method to find a user by email
   */
  public async findOneByEmail(email: string) {
    return await this.findOneUserByEmail.findOneByEmail(email);
  }

  /**
   * Method to find a user by googleId
   */
  public async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }

  /**
   * Create a new user
   */
  public async Create(createUserDto: CreateUserDto) {
    return await this.createUserProvider.Create(createUserDto);
  }

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvider.createMany(createManyUsersDto);
  }

  /**
   * Create a new user from Google User
   */
  public async createGoogleUser(googleUser: GoogleUser) {
    return await this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}
