import cors from 'cors';
import { envConfig } from '../config/env.config';

export const ALLOWED_ORIGINS = [
  envConfig.frontendUrl,
  'https://election-process-educator-01.web.app',
  'https://election-process-educator-01.firebaseapp.com',
] as const satisfies readonly string[];

export const corsConfiguration = {
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] as const,
  allowedHeaders: ['Content-Type', 'Authorization'] as const,
  maxAge: 86400 as const,
  credentials: true as const,
};

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const isAllowed = (ALLOWED_ORIGINS as readonly string[]).includes(origin);
    if (!isAllowed) {
      return callback(new Error('CORS policy violation'), false);
    }
    return callback(null, true);
  },
  methods: [...corsConfiguration.methods],
  allowedHeaders: [...corsConfiguration.allowedHeaders],
  credentials: corsConfiguration.credentials,
  maxAge: corsConfiguration.maxAge,
});
