import { describe, it, expect, vi } from 'vitest';
import { getGlossary } from './glossary.controller';
import type { Request, Response, NextFunction } from 'express';

describe('Glossary Controller', () => {
  it('should return all glossary terms', () => {
    const req = { query: {} } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn() as NextFunction;

    getGlossary(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, data: expect.any(Array) })
    );
    const response = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(response.data.length).toBe(16);
  });

  it('should have required fields for each term', () => {
    const req = { query: {} } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn() as NextFunction;

    getGlossary(req, res, next);

    const response = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const term of response.data) {
      expect(term).toHaveProperty('term');
      expect(term).toHaveProperty('definition');
      expect(term).toHaveProperty('category');
      expect(term).toHaveProperty('emoji');
    }
  });

  it('should have terms across voting, registration, government, and process categories', () => {
    const req = { query: {} } as unknown as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn() as NextFunction;

    getGlossary(req, res, next);

    const response = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    const categories = new Set(
      response.data.map((term: { category: string }) => term.category)
    );

    expect(categories.has('voting')).toBe(true);
    expect(categories.has('registration')).toBe(true);
    expect(categories.has('government')).toBe(true);
    expect(categories.has('process')).toBe(true);

    expect(categories.size).toBeGreaterThanOrEqual(4);
    for (const term of response.data) {
      expect(['voting', 'registration', 'government', 'process']).toContain(term.category);
    }
  });
});
