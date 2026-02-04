import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService, LoginPayload, SignupPayload } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('tags')
  getTags(): { key: string; label: string }[] {
    return this.usersService.getTags();
  }

  @Post('login')
  login(@Body() payload: LoginPayload): { token: string } {
    return this.usersService.login(payload);
  }

  @Post('signup')
  signup(@Body() payload: SignupPayload): { id: number } {
    return this.usersService.signup(payload);
  }
}
