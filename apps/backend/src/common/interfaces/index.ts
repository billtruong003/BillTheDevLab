import { UserRole } from '@billthedevlab/shared-types';

export interface JwtPayload {
  sub: string;
  email: string;
  displayName: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface RedisViewData {
  postId: string;
  views: number;
}

export interface GoogleSheetsRow {
  postId: string;
  title: string;
  views: number;
  uniqueVisitors: number;
  downloads: number;
  revenue: number;
  date: string;
}
