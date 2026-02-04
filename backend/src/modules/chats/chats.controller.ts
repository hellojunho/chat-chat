import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatsService, SendMessagePayload } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get('preview')
  getPreview(): { id: number; name: string; lastMessage: string; time: string }[] {
    return this.chatsService.getPreview();
  }

  @Post('send')
  sendMessage(@Body() payload: SendMessagePayload): { ok: boolean } {
    return this.chatsService.sendMessage(payload);
  }
}
