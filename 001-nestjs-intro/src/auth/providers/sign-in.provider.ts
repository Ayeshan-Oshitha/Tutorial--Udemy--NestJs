import {
  forwardRef,
  Inject,
  Injectable,
  Req,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class SignInProvider {
  constructor(
    // Inject UsersService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    // Inject Hashing Provider
    private readonly hashingProvider: HashingProvider,

    // Inject JWT Service
    private readonly jwtService: JwtService,

    // Inject Jwt Configuration
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   *  SignIn method
   */
  public async signIn(signInDto: SignInDto) {
    // Find the user using email ID
    let user = await this.usersService.findOneByEmail(signInDto.email);

    // If user not found, throw error
    if (!user) {
      throw new UnauthorizedException('Email is not registered');
    }

    // If user found, compare the password
    let isPasswordValid: boolean = false;

    try {
      isPasswordValid = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compare the passwords',
      });
    }

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    return { accessToken };
  }
}
