import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;

  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  >;

  constructor(
    // Inject Reflector
    private readonly reflector: Reflector,

    // Inject AccessTokenGuard
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {
    this.authTypeGuardMap = {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.None]: { canActivate: () => true },
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Step 1 - Get the authType from the metadata (reflector)
    const authTypes = this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationGuard.defaultAuthType];
    //console.log('Auth types for this route:', authTypes);

    // Step 2 - create array of all guards - Gurad(s) to be executed based on above authTypes
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    // console.log('Guards to be executed:', guards);

    // default error
    const error = new UnauthorizedException();

    // Step 3 - Loop through all guards and call canActivate method
    for (const instance of guards) {
      // console.log(instance);
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        error: err;
      });
      // console.log('canActivate:', canActivate);
      if (canActivate) {
        return true;
      }
    }

    throw error;
  }
}
