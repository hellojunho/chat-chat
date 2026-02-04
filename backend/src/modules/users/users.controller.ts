import { Body, Controller, Get, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService, LoginPayload, SignupPayload } from './users.service';
import { verifyAuthToken } from '../../auth/jwt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('tags')
  getTags(): { key: string; label: string }[] {
    return this.usersService.getTags();
  }

  @Post('login')
  login(@Body() payload: LoginPayload): { token: string; isStaff: boolean } {
    return this.usersService.login(payload);
  }

  @Post('signup')
  signup(@Body() payload: SignupPayload): { id: number } {
    return this.usersService.signup(payload);
  }

  @Get('profiles')
  getProfiles(): { id: number; name: string; statusMessage: string; tags: string[] }[] {
    return this.usersService.getProfiles();
  }

  @Get('me')
  getMe(@Headers('authorization') authorization?: string) {
    if (!authorization) {
      throw new UnauthorizedException('Missing token');
    }
    const token = authorization.replace('Bearer ', '');
    const payload = (() => {
      try {
        return verifyAuthToken(token);
      } catch {
        throw new UnauthorizedException('Invalid token');
      }
    })();
    const user = this.usersService.getUserByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
