import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const hubspot = req.session.hubspot;

    if (!hubspot) {
      throw new UnauthorizedException('No HubSpot token in session.');
    }

    const isExpired = Date.now() > hubspot.expiresAt;
    if (isExpired) {
      const { data } = await firstValueFrom(
        this.httpService.post(
          'https://api.hubapi.com/oauth/v1/token',
          new URLSearchParams({
            grant_type: 'refresh_token',
            client_id: this.configService.get<string>('CLIENT_ID'),
            client_secret: this.configService.get<string>('CLIENT_SECRET'),
            refresh_token: hubspot.refreshToken,
          }),
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
        ),
      );

      const newToken = data;
      hubspot.accessToken = newToken.access_token;
      hubspot.expiresAt = Date.now() + newToken.expires_in * 1000;
      if (newToken.refresh_token) {
        hubspot.refreshToken = newToken.refresh_token;
      }
    }

    return true;
  }
}
