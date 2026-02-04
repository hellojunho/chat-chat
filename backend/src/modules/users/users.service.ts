import { Injectable } from '@nestjs/common';
import { TagType, TagTypeLabels } from '../../entities/tag.enum';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  displayName: string;
}

@Injectable()
export class UsersService {
  getTags(): { key: string; label: string }[] {
    return Object.values(TagType).map((tag) => ({
      key: tag,
      label: TagTypeLabels[tag]
    }));
  }

  login(_payload: LoginPayload): { token: string } {
    return { token: 'mock-token' };
  }

  signup(_payload: SignupPayload): { id: number } {
    return { id: 1 };
  }
}
