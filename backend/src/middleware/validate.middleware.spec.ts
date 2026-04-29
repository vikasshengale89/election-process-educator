import { describe, it, expect, vi } from 'vitest';
import Joi from 'joi';
import { validate } from './validate.middleware';
import type { Request, Response, NextFunction } from 'express';

describe('Validate Middleware', () => {
  const schema = Joi.object({ name: Joi.string().required() });

  it('should call next() on valid input', () => {
    const req = { query: { name: 'test' } } as unknown as Request;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as unknown as Response;
    const next = vi.fn() as NextFunction;

    validate(schema, 'query')(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 400 on invalid input', () => {
    const req = { query: {} } as unknown as Request;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as unknown as Response;
    const next = vi.fn() as NextFunction;

    validate(schema, 'query')(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, error: 'Validation failed' })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should validate body when source is body', () => {
    const req = { body: { name: 'valid' } } as unknown as Request;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as unknown as Response;
    const next = vi.fn() as NextFunction;

    validate(schema, 'body')(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
