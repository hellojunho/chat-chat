export type Tag =
  | '스포츠'
  | '독서'
  | '영화시청'
  | '산책'
  | '여행'
  | '주식'
  | '재태크';

export interface UserProfile {
  id: number;
  name: string;
  statusMessage: string;
  tags: Tag[];
}

export interface UserDetail {
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

export interface ChatPreview {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
}

export interface AlertItem {
  id: number;
  content: string;
  time: string;
}

export interface LikeStatus {
  remaining: number;
  windowMinutes: number;
}

export interface AdminUser {
  id: number;
  email: string;
  displayName: string;
  username: string;
  isStaff: boolean;
}

export interface AdminUserDetail extends AdminUser {
  gender: string | null;
  statusMessage: string;
  token: number;
  isActive: boolean;
  emailChecked: boolean;
  createdAt: string;
  lastLoginedAt: string | null;
}
