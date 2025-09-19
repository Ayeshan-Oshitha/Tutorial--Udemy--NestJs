import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    // Inject jwt configurations
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    // Inject UsersService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    // Inject generate Tokens Provider
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;

    this.oauthClient = new OAuth2Client({
      clientId: clientId,
      client_secret: clientSecret,
    });
  }

  public async authentication(googleTokenDto: GoogleTokenDto) {
    //  verify the Google Token sent by user
    const loginTicket = await this.oauthClient.verifyIdToken({
      idToken: googleTokenDto.token,
    });

    //  Extract the payload from Google JWT
    const payload = loginTicket.getPayload();

    if (!payload) {
      return new UnauthorizedException('Invalid Google Token');
    }

    const email = payload.email;
    const googleId = payload.sub;
    const firstName = payload.given_name;
    const lastName = payload.family_name;

    //  Find the user in the database using the GoogleId
    const user = await this.usersService.findOneByGoogleId(googleId);

    //  If the googleId exists in the database, generate tokens
    if (user) {
      return this.generateTokensProvider.generateTokens(user);
    }
    //  If the googleId does not exist, create a new user and generate tokens
    //  If any of above steps failed, throw Unauthorized exception
  }
}
