import { describe, it, expect, vi } from 'vitest';
import { getPollingLocation } from './polling.controller';
import type { Request, Response, NextFunction } from 'express';

function createMocks(query: Record<string, string> = {}) {
  const req = { query } as unknown as Request;
  const res = { json: vi.fn(), status: vi.fn().mockReturnThis() } as unknown as Response;
  const next = vi.fn() as NextFunction;
  return { req, res, next };
}

describe('Polling Controller', () => {
  it('should return polling locations for a zip code', () => {
    const { req, res, next } = createMocks({ zip: '62701' });
    getPollingLocation(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.objectContaining({
          locations: expect.any(Array),
          idRequirements: expect.any(Object),
          state: expect.any(String),
          zip: '62701'
        })
      })
    );
  });

  it('should detect Illinois from zip prefix 6xx', () => {
    const { req, res, next } = createMocks({ zip: '60601' });
    getPollingLocation(req, res, next);

    const response = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(response.data.state).toBe('Illinois');
  });

  it('should detect California from zip prefix 9xx', () => {
    const { req, res, next } = createMocks({ zip: '90210' });
    getPollingLocation(req, res, next);

    const response = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(response.data.state).toBe('California');
  });

  it('should detect New York from zip prefix 1xx', () => {
    const { req, res, next } = createMocks({ zip: '10001' });
    getPollingLocation(req, res, next);

    const response = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(response.data.state).toBe('New York');
  });

  it('should fall back to General for unknown zips', () => {
    const { req, res, next } = createMocks({ zip: '33101' });
    getPollingLocation(req, res, next);

    const response = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(response.data.state).toBe('General');
  });

  it('should include accessibility info for locations', () => {
    const { req, res, next } = createMocks({ zip: '62701' });
    getPollingLocation(req, res, next);

    const response = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const loc of response.data.locations) {
      expect(loc.accessibility).toBeDefined();
      expect(loc.accessibility.length).toBeGreaterThan(0);
    }
  });
});
