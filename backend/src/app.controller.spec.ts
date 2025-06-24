import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';

describe('AppController', () => {
  let controller: AppController;
  let httpService: HttpService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const values = {
                CLIENT_ID: 'test-client-id',
                CLIENT_SECRET: 'test-client-secret',
              };
              return values[key];
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('receiveAuthCode', () => {
    it('should exchange code for tokens, store them in session, and redirect', async () => {
      const mockCode = 'auth-code-123';

      const tokenResponse = {
        data: {
          access_token: 'access-token-abc',
          refresh_token: 'refresh-token-def',
          expires_in: 3600,
        },
      };

      (httpService.post as jest.Mock).mockReturnValue(of(tokenResponse));

      const req: any = { session: {} };
      const redirectMock = jest.fn();
      const res: any = { redirect: redirectMock };

      await controller.receiveAuthCode(mockCode, res, req);

      expect(httpService.post).toHaveBeenCalledWith(
        'https://api.hubapi.com/oauth/v1/token',
        expect.any(URLSearchParams),
      );

      expect(req.session.hubspot).toEqual(
        expect.objectContaining({
          access_token: tokenResponse.data.access_token,
          refresh_token: tokenResponse.data.refresh_token,
        }),
      );

      expect(typeof req.session.hubspot.expires_in).toBe('number');
      expect(req.session.hubspot.expires_in).toBeGreaterThan(Date.now());

      expect(redirectMock).toHaveBeenCalledWith(
        'http://localhost:5173/contacts',
      );
    });
  });

  describe('loginOAuth', () => {
    it('should redirect to frontend if access_token exists in session', () => {
      const redirectMock = jest.fn();
      const req: any = { session: { hubspot: { access_token: 'token' } } };
      const res: any = { redirect: redirectMock };

      controller.loginOAuth(res, req);

      expect(redirectMock).toHaveBeenCalledWith(
        'http://localhost:5173/contacts',
      );
    });

    it('should redirect to HubSpot OAuth URL if no access_token', () => {
      const redirectMock = jest.fn();
      const req: any = { session: {} };
      const res: any = { redirect: redirectMock };

      controller.loginOAuth(res, req);

      const expectedUrl = `https://app-eu1.hubspot.com/oauth/authorize?client_id=${configService.get(
        'CLIENT_ID',
      )}&redirect_uri=http://localhost:3000/oauth-callback&scope=crm.objects.contacts.write%20oauth%20crm.objects.contacts.read`;

      expect(redirectMock).toHaveBeenCalledWith(expectedUrl);
    });
  });
});
