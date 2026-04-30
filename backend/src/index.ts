import express from 'express';
import helmet from 'helmet';
import session from 'express-session';
import { envConfig } from './config/env.config';
import { corsMiddleware } from './middleware/cors.middleware';
import { errorHandler } from './middleware/error.middleware';
import { apiLimiter, authLimiter } from './middleware/rate-limit.middleware';
import { requestLogging } from './middleware/request-logging.middleware';
import { securityHeaders } from './middleware/security-headers.middleware';
import { logger } from './utils/logger';

import { authRoutes } from './routes/auth.routes';
import { timelineRoutes } from './routes/timeline.routes';
import { glossaryRoutes } from './routes/glossary.routes';
import { pollingRoutes } from './routes/polling.routes';
import { quizRoutes } from './routes/quiz.routes';

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(corsMiddleware);
app.use(securityHeaders);
app.use(requestLogging);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '1kb' }));
app.use(
  session({
    secret: envConfig.sessionSecret,
    resave: false,
    saveUninitialized: false,
    name: 'epe.sid',
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: envConfig.nodeEnv === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(apiLimiter);

app.use('/api/v1/auth', authLimiter, authRoutes);
app.use('/api/v1/timeline', timelineRoutes);
app.use('/api/v1/glossary', glossaryRoutes);
app.use('/api/v1/polling', pollingRoutes);
app.use('/api/v1/quiz', quizRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (_req, res) => {
  res.json({ message: 'Election Process Educator API', version: '1.0.0' });
});

app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Not found' });
});

app.use(errorHandler);

const PORT = envConfig.port;

if (process.env['VITEST'] !== 'true') {
  app.listen(PORT, () => {
    logger.info(`Server started on port ${String(PORT)}`);
  });
}

export { app };
