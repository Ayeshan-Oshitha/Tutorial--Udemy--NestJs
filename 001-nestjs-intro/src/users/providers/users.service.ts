import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import type { ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { error } from 'console';

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
    // mimic error - API Endpoint is moved permanantely
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'This endpoint has been moved permanantely to new location',
        fileName: 'users.service.ts',
        lineNumber: 54,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        description: ' Occured because API Endpoint Permentely Mopved',
      },
    );

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
   * Create a new user
   */
  public async Create(createUserDto: CreateUserDto) {
    let existingUser: User | null = null;

    try {
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      // Might save the details of exception
      // Information which is sensitive
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try again later',
        {
          description: 'Database connection error',
        },
      );
    }

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    let newUser = this.usersRepository.create(createUserDto);

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try again later',
        {
          description: 'Database connection error',
        },
      );
    }

    return newUser;
  }
}
