import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    // Inject UsersService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  /**
   *  SignIn method
   */
  public signIn(signInDto: SignInDto) {
    // Find the user using email ID
    // If user not found, throw error
    // If user found, compare the password
    // send Confirmation
  }

  public isAuthenticated() {
    return true;
  }
}
