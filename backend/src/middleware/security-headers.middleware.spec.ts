import { describe, it, expect, vi } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import { securityHeaders } from './security-headers.middleware';

describe('securityHeaders middleware', () => {
  it('sets X-Request-Id header and calls next', () => {
    const req = {} as Request;
    const setHeader = vi.fn();
    const res = { setHeader } as unknown as Response;
    const next = vi.fn() as NextFunction;

    securityHeaders(req, res, next);

    expect(setHeader).toHaveBeenCalledWith('X-Request-Id', expect.any(String));
    const requestId = setHeader.mock.calls[0][1] as string;
    expect(requestId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu
    );
    expect(next).toHaveBeenCalledWith();
  });
});
