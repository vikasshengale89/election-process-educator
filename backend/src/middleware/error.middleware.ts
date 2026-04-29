import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err.stack ?? err.message);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: process.env['NODE_ENV'] === 'production' ? 'Internal server error' : err.message,
  });
};
