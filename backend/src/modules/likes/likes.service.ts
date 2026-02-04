import { Injectable } from '@nestjs/common';

export interface LikePayload {
  userId: number;
}

@Injectable()
export class LikesService {
  getStatus(): { remaining: number; windowMinutes: number } {
    return { remaining: 5, windowMinutes: 10 };
  }

  sendLike(_payload: LikePayload): { ok: boolean } {
    return { ok: true };
  }
}
