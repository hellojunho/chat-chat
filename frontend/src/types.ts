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
