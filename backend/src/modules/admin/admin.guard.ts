import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { verifyAuthToken } from '../../auth/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ headers: Record<string, string | string[]> }>();
    const authorization = request.headers['authorization'];
    const token = Array.isArray(authorization) ? authorization[0] : authorization;
    if (!token) {
      throw new UnauthorizedException('Missing token');
    }
    let payload;
    try {
      payload = verifyAuthToken(token.replace('Bearer ', ''));
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
    if (!payload.isStaff) {
      throw new UnauthorizedException('Admin access required');
    }
    return true;
  }
}
