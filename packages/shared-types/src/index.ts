export enum UserRole {
  VISITOR = 'visitor',
  MEMBER = 'member',
  ADMIN = 'admin',
}

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum PostLayout {
  FULL_WIDTH = 'full-width',
  SIDEBAR_RIGHT = 'sidebar-right',
  LANDING_PAGE = 'landing-page',
}

export enum ProductType {
  ASSET = 'asset',
  COURSE = 'course',
  BOOK = 'book',
  BUNDLE = 'bundle',
}

export enum PurchaseStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  REFUNDED = 'refunded',
  FAILED = 'failed',
}

export enum CalloutVariant {
  INFO = 'info',
  WARNING = 'warning',
  TIP = 'tip',
  DANGER = 'danger',
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface UserDto {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  role: UserRole;
  isSubscribed: boolean;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage: string;
  layout: PostLayout;
  featured: boolean;
  estimatedReadTime: number;
  projectSlug?: string;
  productId?: string;
  views?: number;
}

export interface PostDto extends PostMeta {
  id: string;
  status: PostStatus;
  likes: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  type: ProductType;
  thumbnailUrl: string | null;
  fileSizeBytes: number;
  stripePriceId: string | null;
  postId: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface PurchaseDto {
  id: string;
  userId: string;
  productId: string;
  amountPaid: number;
  status: PurchaseStatus;
  downloadCount: number;
  createdAt: string;
}

export interface AnalyticsDto {
  postId: string;
  title: string;
  views: number;
  uniqueVisitors: number;
  downloads: number;
  revenue: number;
  date: string;
}

export interface ViewTrackPayload {
  fingerprint: string;
  referrer?: string;
}

export interface BuffViewPayload {
  postId: string;
  amount: number;
}

export interface CheckoutPayload {
  productId: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface CheckoutResponse {
  sessionId: string;
  url: string;
}

export interface DownloadResponse {
  url: string;
  expiresIn: number;
  fileName: string;
}

export interface SearchResult {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  coverImage: string;
  estimatedReadTime: number;
  score: number;
}

export interface ProjectConfig {
  slug: string;
  title: string;
  tagline: string;
  genre: string;
  engine: string;
  status: string;
  heroImage: string;
  accentColor: string;
  sections: ProjectSection[];
}

export interface ProjectSection {
  id: string;
  type: 'gallery' | 'features' | 'devlog' | 'download' | 'custom';
  title: string;
  content?: string;
  items?: ProjectSectionItem[];
}

export interface ProjectSectionItem {
  title: string;
  description?: string;
  image?: string;
  link?: string;
  date?: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  author: AuthorConfig;
  social: SocialConfig;
  nav: NavItem[];
}

export interface AuthorConfig {
  name: string;
  bio: string;
  avatar: string;
  email: string;
}

export interface SocialConfig {
  twitter?: string;
  github?: string;
  youtube?: string;
  discord?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  email?: string;
}

export interface NavItem {
  label: string;
  href: string;
}
