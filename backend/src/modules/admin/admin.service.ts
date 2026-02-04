import { Injectable } from '@nestjs/common';

export interface AdminUserDetail {
  id: number;
  email: string;
  displayName: string;
  username: string;
  isStaff: boolean;
  gender: string | null;
  statusMessage: string;
  token: number;
  isActive: boolean;
  emailChecked: boolean;
  createdAt: string;
  lastLoginedAt: string | null;
}

const adminSeed: AdminUserDetail = {
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

const adminUsers: AdminUserDetail[] = [
  adminSeed,
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
  }
];

@Injectable()
export class AdminService {
  getUsers(page: number): { users: AdminUserDetail[]; page: number; totalPages: number } {
    const pageSize = 10;
    const totalPages = Math.max(1, Math.ceil(adminUsers.length / pageSize));
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const startIndex = (currentPage - 1) * pageSize;
    return {
      users: adminUsers.slice(startIndex, startIndex + pageSize),
      page: currentPage,
      totalPages
    };
  }

  getUser(id: number): AdminUserDetail | null {
    return adminUsers.find((user) => user.id === id) ?? null;
  }

  updateUser(id: number, payload: Partial<AdminUserDetail>): AdminUserDetail | null {
    const user = adminUsers.find((item) => item.id === id);
    if (!user) {
      return null;
    }
    const updated = {
      ...user,
      ...payload,
      id: user.id,
      email: user.email
    };
    Object.assign(user, updated);
    return user;
  }
}
