import { Injectable } from '@nestjs/common';

@Injectable()
export class AlertsService {
  getAlerts(): { id: number; message: string; createdAt: string }[] {
    return [
      { id: 1, message: '새로운 좋아요를 받았습니다.', createdAt: '방금 전' }
    ];
  }
}
