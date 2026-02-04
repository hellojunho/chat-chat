import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ headers: Record<string, string | string[]> }>();
    const staffHeader = request.headers['x-is-staff'];
    const value = Array.isArray(staffHeader) ? staffHeader[0] : staffHeader;
    if (value === 'true') {
      return true;
    }
    throw new UnauthorizedException('Admin access required');
  }
}
