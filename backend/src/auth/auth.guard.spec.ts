import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException, ExecutionContext } from '@nestjs/common';

describe('AuthGuard ', () => {
  let guard: AuthGuard;

  const mockExecutionContext = (sessionData: any): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({ session: sessionData }),
      }),
    }) as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGuard],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
  });

  it('should allow access when token is valid', async () => {
    const session = {
      hubspot: {
        accessToken: 'valid_token',
        expiresAt: Date.now() + 10000,
      },
    };
    const context = mockExecutionContext(session);
    await expect(guard.canActivate(context)).resolves.toBe(true);
  });

  it('should throw UnauthorizedException when hubspot token is missing', async () => {
    const session = {};
    const context = mockExecutionContext(session);
    await expect(guard.canActivate(context)).rejects.toThrow(
      new UnauthorizedException('No HubSpot token in session.'),
    );
  });

  it('should throw UnauthorizedException when token is expired', async () => {
    const session = {
      hubspot: {
        accessToken: 'expired_token',
        expiresAt: Date.now() - 1000,
      },
    };
    const context = mockExecutionContext(session);
    await expect(guard.canActivate(context)).rejects.toThrow(
      new UnauthorizedException('Token expired. Login in again'),
    );
  });
});
