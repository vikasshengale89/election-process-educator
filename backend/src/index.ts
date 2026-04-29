import express from 'express';
import helmet from 'helmet';
import { envConfig } from './config/env.config';
import { corsMiddleware } from './middleware/cors.middleware';
import { errorHandler } from './middleware/error.middleware';
import { apiLimiter, authLimiter } from './middleware/rate-limit.middleware';
import { logger } from './utils/logger';

import { authRoutes } from './routes/auth.routes';
import { timelineRoutes } from './routes/timeline.routes';
import { glossaryRoutes } from './routes/glossary.routes';
import { pollingRoutes } from './routes/polling.routes';
import { quizRoutes } from './routes/quiz.routes';

const app = express();

app.use(helmet());
app.use(corsMiddleware);
app.use(express.json());
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

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});

export { app };
