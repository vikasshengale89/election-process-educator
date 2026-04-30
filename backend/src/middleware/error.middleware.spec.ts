import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import { errorHandler } from './error.middleware';

describe('error.middleware', () => {
  const originalEnv = process.env['NODE_ENV'];

  beforeEach(() => {
    vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env['NODE_ENV'] = originalEnv;
  });

  it('returns sanitized message when NODE_ENV is production', () => {
    process.env['NODE_ENV'] = 'production';

    const req = {} as Request;
    const res = {
      statusCode: 200,
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    const next = vi.fn() as NextFunction;

    errorHandler(new Error('Sensitive detail'), req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Internal server error',
    });
  });

  it('returns underlying message when NODE_ENV is not production', () => {
    process.env['NODE_ENV'] = 'development';

    const req = {} as Request;
    const res = {
      statusCode: 200,
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    const next = vi.fn() as NextFunction;

    errorHandler(new Error('Validation failed locally'), req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Validation failed locally',
    });
  });

  it('handles non-Error rejects with generic client message', () => {
    process.env['NODE_ENV'] = 'development';

    const req = {} as Request;
    const res = {
      statusCode: 200,
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    const next = vi.fn() as NextFunction;

    errorHandler('not an Error instance', req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Internal server error',
    });
  });

  it('preserves non-200 response status codes when already set', () => {
    process.env['NODE_ENV'] = 'development';

    const req = {} as Request;
    const res = {
      statusCode: 422,
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    const next = vi.fn() as NextFunction;

    errorHandler(new Error('Unprocessable'), req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
  });
});
