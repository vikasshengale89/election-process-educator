import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const envConfig = {
  port: process.env['PORT'] ?? 3000,
  nodeEnv: process.env['NODE_ENV'] ?? 'development',
  apiPrefix: process.env['API_PREFIX'] ?? '/api/v1',
  frontendUrl: process.env['FRONTEND_URL'] ?? 'http://localhost:4200',
  googleClientId: process.env['GOOGLE_CLIENT_ID'] ?? '',
  googleClientSecret: process.env['GOOGLE_CLIENT_SECRET'] ?? '',
  googleRedirectUri: process.env['GOOGLE_REDIRECT_URI'] ?? 'http://localhost:3000/api/v1/auth/google/callback',
};
