import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TagType, TagTypeLabels } from '../../entities/tag.enum';
import { AuthTokenPayload, signAuthToken } from '../../auth/jwt';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  displayName: string;
  username: string;
}

export interface UserSummary {
  id: number;
  email: string;
  displayName: string;
  username: string;
  isStaff: boolean;
}

export interface UserDetail extends UserSummary {
  gender: string | null;
  statusMessage: string;
  token: number;
  isActive: boolean;
  emailChecked: boolean;
  createdAt: string;
  lastLoginedAt: string | null;
}

const adminUser: UserDetail = {
  id: 1,
  email: 'admin@admin.com',
  displayName: '관리자',
  username: 'admin',
  isStaff: true,
  gender: null,
  statusMessage: '관리자 계정',
  token: 0,
  isActive: true,
  emailChecked: true,
  createdAt: '2024-01-01 00:00:00',
  lastLoginedAt: null
};

const mockUsers: UserDetail[] = [
  adminUser,
  {
    id: 2,
    email: 'user1@example.com',
    displayName: '김도건',
    username: 'dogeon',
    isStaff: false,
    gender: 'male',
    statusMessage: '오늘은 산책하고 싶어요.',
    token: 3,
    isActive: true,
    emailChecked: true,
    createdAt: '2024-03-01 10:00:00',
    lastLoginedAt: '2024-04-10 09:00:00'
  },
  {
    id: 3,
    email: 'user2@example.com',
    displayName: '한지민',
    username: 'jimin',
    isStaff: false,
    gender: 'female',
    statusMessage: '책 읽는 시간 좋아요.',
    token: 7,
    isActive: true,
    emailChecked: true,
    createdAt: '2024-03-10 11:12:00',
    lastLoginedAt: '2024-04-12 18:12:00'
  },
  {
    id: 4,
    email: 'user3@example.com',
    displayName: '박준호',
    username: 'junho',
    isStaff: false,
    gender: 'male',
    statusMessage: '주말엔 여행 계획 중.',
    token: 2,
    isActive: true,
    emailChecked: true,
    createdAt: '2024-03-20 09:30:00',
    lastLoginedAt: '2024-04-15 13:20:00'
  }
];

const profileTags: Record<number, TagType[]> = {
  2: [TagType.Walking, TagType.Movie],
  3: [TagType.Reading, TagType.Finance],
  4: [TagType.Travel, TagType.Sports]
};

@Injectable()
export class UsersService {
  getTags(): { key: string; label: string }[] {
    return Object.values(TagType).map((tag) => ({
      key: tag,
      label: TagTypeLabels[tag]
    }));
  }

  login(payload: LoginPayload): { token: string; isStaff: boolean } {
    const user = mockUsers.find((item) => item.email === payload.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const expectedPassword = user.isStaff ? 'admin1234' : 'user1234';
    if (payload.password !== expectedPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const tokenPayload: AuthTokenPayload = {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      isStaff: user.isStaff
    };
    return { token: signAuthToken(tokenPayload), isStaff: user.isStaff };
  }

  signup(_payload: SignupPayload): { id: number } {
    return { id: 99 };
  }

  getProfiles(): { id: number; name: string; statusMessage: string; tags: string[] }[] {
    return mockUsers
      .filter((user) => !user.isStaff)
      .map((user) => ({
        id: user.id,
        name: user.displayName,
        statusMessage: user.statusMessage,
        tags: (profileTags[user.id] ?? []).map((tag) => TagTypeLabels[tag])
      }));
  }

  getUserByEmail(email: string): UserDetail | null {
    return mockUsers.find((user) => user.email === email) ?? null;
  }

  getAdminUsers(): { users: UserSummary[]; page: number; totalPages: number } {
    const users = mockUsers.map((user) => ({
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      username: user.username,
      isStaff: user.isStaff
    }));
    return { users, page: 1, totalPages: 1 };
  }

  getUserDetail(id: number): UserDetail | null {
    return mockUsers.find((user) => user.id === id) ?? null;
  }

  updateUser(id: number, payload: Partial<UserDetail>): UserDetail | null {
    const user = mockUsers.find((item) => item.id === id);
    if (!user) {
      return null;
    }
    const updated: UserDetail = {
      ...user,
      ...payload,
      id: user.id,
      email: user.email
    };
    Object.assign(user, updated);
    return user;
  }
}
