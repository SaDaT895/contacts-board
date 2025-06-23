import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const hubspot = req.session.hubspot;

    if (!hubspot) {
      throw new UnauthorizedException('No HubSpot token in session.');
    }

    const isExpired = Date.now() > hubspot.expiresAt;
    if (isExpired) {
      throw new UnauthorizedException(
        'HubSpot token expired. Please log in again',
      );
    }

    return true;
  }
}
