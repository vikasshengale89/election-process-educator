import express from 'express';
import helmet from 'helmet';
import { envConfig } from './config/env.config';
import { corsMiddleware } from './middleware/cors.middleware';
import { errorHandler } from './middleware/error.middleware';
import { logger } from './utils/logger';

import { authRoutes } from './routes/auth.routes';
import { timelineRoutes } from './routes/timeline.routes';
import { glossaryRoutes } from './routes/glossary.routes';
import { pollingRoutes } from './routes/polling.routes';
import { quizRoutes } from './routes/quiz.routes';

const app = express();

// Middleware
app.use(helmet());
app.use(corsMiddleware);
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/timeline', timelineRoutes);
app.use('/api/v1/glossary', glossaryRoutes);
app.use('/api/v1/polling', pollingRoutes);
app.use('/api/v1/quiz', quizRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Election Process Educator API' });
});

// Use error handler
app.use(errorHandler);

const PORT = envConfig.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
