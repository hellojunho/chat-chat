import { Body, Controller, Get, Post } from '@nestjs/common';
import { LikesService, LikePayload } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get('status')
  getStatus(): { remaining: number; windowMinutes: number } {
    return this.likesService.getStatus();
  }

  @Post('send')
  sendLike(@Body() payload: LikePayload): { ok: boolean } {
    return this.likesService.sendLike(payload);
  }
}
