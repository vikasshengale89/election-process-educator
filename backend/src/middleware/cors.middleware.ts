import cors from 'cors';
import { envConfig } from '../config/env.config';

const allowedOrigins = [
  envConfig.frontendUrl,
  'https://election-process-educator.web.app',
  'https://election-process-educator.firebaseapp.com',
];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error('CORS policy violation'), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
