import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    // Inject jwt configurations
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
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
    //  Extract the payload from Google JWT
    //  Find the user in the database using the GoogleId
    //  If the googleId exists in the database, generate tokens
    //  If the googleId does not exist, create a new user and generate tokens
    //  If any of above steps failed, throw Unauthorized exception
  }
}
