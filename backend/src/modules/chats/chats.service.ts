import { Injectable } from '@nestjs/common';

export interface SendMessagePayload {
  chatId: number;
  message: string;
}

@Injectable()
export class ChatsService {
  getPreview(): { id: number; name: string; lastMessage: string; time: string }[] {
    return [
      {
        id: 1,
        name: '김도건',
        lastMessage: '구라임',
        time: '오전 8:13'
      }
    ];
  }

  sendMessage(_payload: SendMessagePayload): { ok: boolean } {
    return { ok: true };
  }
}
