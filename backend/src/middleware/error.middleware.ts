import type { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Internal server error';
}

function getErrorStack(err: unknown): string | undefined {
  return err instanceof Error ? err.stack : undefined;
}

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  const stack = getErrorStack(err);
  logger.error(stack ?? getErrorMessage(err));

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: process.env['NODE_ENV'] === 'production' ? 'Internal server error' : getErrorMessage(err),
  });
};
