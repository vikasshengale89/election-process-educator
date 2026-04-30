import type { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export function requestLogging(req: Request, res: Response, next: NextFunction): void {
  const startedAt = Date.now();
  res.on('finish', () => {
    const requestId = res.getHeader('X-Request-Id');
    logger.info('http_request', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
      requestId: typeof requestId === 'string' ? requestId : undefined,
    });
  });
  next();
}
