export const REDIS_KEYS = {
  postViews: (postId: string) => `views:post:${postId}`,
  postDailyViews: (postId: string, date: string) => `views:post:${postId}:daily:${date}`,
  visitorCooldown: (postId: string, fingerprint: string) => `visitor:${postId}:${fingerprint}`,
  downloadRateLimit: (userId: string) => `ratelimit:download:${userId}`,
  buffRateLimit: (adminId: string) => `ratelimit:buff:${adminId}`,
  searchIndex: 'search:index',
} as const;

export const RATE_LIMITS = {
  viewCooldownSeconds: 30,
  maxDownloadsPerMinute: 5,
  downloadWindowSeconds: 60,
  maxBuffsPerHour: 10,
  buffWindowSeconds: 3600,
  buffMinAmount: 1,
  buffMaxAmount: 10000,
} as const;

export const QUEUE_NAMES = {
  analytics: 'analytics',
  googleSheets: 'google-sheets',
  email: 'email',
} as const;

export const JOB_NAMES = {
  syncViewsToPostgres: 'sync-views-to-postgres',
  syncToGoogleSheets: 'sync-to-google-sheets',
  recordView: 'record-view',
} as const;
