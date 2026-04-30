import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import { requestLogging } from './request-logging.middleware';
import { logger } from '../utils/logger';

describe('requestLogging middleware', () => {
  let infoSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    infoSpy = vi.spyOn(logger, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    infoSpy.mockRestore();
  });

  it('logs http_request with method, path, status, duration, and request id when response finishes', async () => {
    const app = express();

    app.use((req, res, next) => {
      res.setHeader('X-Request-Id', 'correlation-test-id');
      next();
    });

    app.use(requestLogging);

    app.get('/logged-path', (_req, res) => {
      res.status(201).json({ ok: true });
    });

    await request(app).get('/logged-path').expect(201);

    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(infoSpy).toHaveBeenCalledWith(
      'http_request',
      expect.objectContaining({
        method: 'GET',
        path: '/logged-path',
        statusCode: 201,
        requestId: 'correlation-test-id',
      })
    );

    const loggedData = infoSpy.mock.calls[0]?.[1] as { durationMs?: number };
    expect(typeof loggedData.durationMs).toBe('number');
    expect(Number.isNaN(loggedData.durationMs)).toBe(false);
    expect(loggedData.durationMs).toBeGreaterThanOrEqual(0);
  });

  it('omits requestId when X-Request-Id header was not set', async () => {
    const app = express();
    app.use(requestLogging);
    app.get('/no-id', (_req, res) => {
      res.status(204).end();
    });

    await request(app).get('/no-id').expect(204);

    expect(infoSpy).toHaveBeenCalledWith(
      'http_request',
      expect.objectContaining({
        method: 'GET',
        path: '/no-id',
        statusCode: 204,
        requestId: undefined,
      })
    );
  });
});
