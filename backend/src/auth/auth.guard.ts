import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const hubspot = req.session.hubspot;

    if (!hubspot) {
      throw new UnauthorizedException('No HubSpot token in session.');
    }

    const isExpired = Date.now() > hubspot.expires_in;
    if (isExpired) {
      throw new UnauthorizedException('Token expired. Login in again');
    }

    return true;
  }
}
