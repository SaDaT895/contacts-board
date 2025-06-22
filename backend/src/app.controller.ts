import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Get,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { access } from 'fs';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('')
export class AppController {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  // @UseGuards(AuthGuard)
  @Get('oauth-callback')
  async receiveAuthCode(
    @Query('code') code: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'authorization_code');
    formData.append('client_id', this.configService.get<string>('CLIENT_ID'));
    formData.append(
      'client_secret',
      this.configService.get<string>('CLIENT_SECRET'),
    );
    formData.append('redirect_uri', 'http://localhost:3000/oauth-callback');
    formData.append('code', code);
    const { data } = await firstValueFrom(
      this.httpService.post('https://api.hubapi.com/oauth/v1/token', formData),
    );
    req.session.hubspot = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
    };
    res.redirect('http://localhost:5173/contacts');
  }

  @Get('login')
  loginOAuth(@Res() res: Response, @Req() req: Request) {
    req.session?.hubspot?.access_token
      ? res.redirect('http://localhost:5173/contacts')
      : res.redirect(
          `https://app-eu1.hubspot.com/oauth/authorize?client_id=${this.configService.get<string>('CLIENT_ID')}&redirect_uri=http://localhost:3000/oauth-callback&scope=crm.objects.contacts.write%20oauth%20crm.objects.contacts.read`,
        );
  }
}
