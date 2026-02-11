export const appConfig = () => ({
  port: parseInt(process.env.APP_PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
});

export const databaseConfig = () => ({
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    name: process.env.DB_DATABASE || 'billthedevlab',
  },
});

export const redisConfig = () => ({
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
  },
});

export const awsConfig = () => ({
  aws: {
    region: process.env.AWS_REGION || 'ap-southeast-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    s3Bucket: process.env.AWS_S3_BUCKET || 'billthedevlab-assets',
    s3PrivateBucket: process.env.AWS_S3_PRIVATE_BUCKET || 'billthedevlab-private',
    signedUrlExpiry: parseInt(process.env.AWS_SIGNED_URL_EXPIRY || '300', 10),
  },
});

export const stripeConfig = () => ({
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    successUrl: process.env.STRIPE_SUCCESS_URL || 'http://localhost:3000/shop/success',
    cancelUrl: process.env.STRIPE_CANCEL_URL || 'http://localhost:3000/shop/cancel',
  },
});

export const googleConfig = () => ({
  google: {
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
    privateKey: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID || '',
    sheetName: process.env.GOOGLE_SHEET_NAME || 'Analytics',
  },
});

export default () => ({
  ...appConfig(),
  ...databaseConfig(),
  ...redisConfig(),
  ...awsConfig(),
  ...stripeConfig(),
  ...googleConfig(),
});
