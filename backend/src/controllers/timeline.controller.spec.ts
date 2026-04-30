import { describe, it, expect, vi } from 'vitest';
import { getTimeline } from './timeline.controller';
import type { Request, Response, NextFunction } from 'express';

function createMocks(query: Record<string, string> = {}) {
  const req = { query } as unknown as Request;
  const res = {
    json: vi.fn(),
    status: vi.fn().mockReturnThis(),
  } as unknown as Response;
  const next = vi.fn() as NextFunction;
  return { req, res, next };
}

describe('Timeline Controller', () => {
  it('should return timeline events', () => {
    const { req, res, next } = createMocks();
    getTimeline(req, res, next);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, data: expect.any(Array) })
    );
  });

  it('should filter events by location', () => {
    const { req, res, next } = createMocks({ location: 'illinois' });
    getTimeline(req, res, next);
    const response = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.data.every((e: { location: string }) => e.location === 'all' || e.location === 'illinois')).toBe(true);
  });

  it('should return all-location events when no filter', () => {
    const { req, res, next } = createMocks();
    getTimeline(req, res, next);
    const response = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(response.data.every((e: { location: string }) => e.location === 'all')).toBe(true);
  });

  it('events should cover all timeline event types', () => {
    const { req, res, next } = createMocks();
    getTimeline(req, res, next);
    const response = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    const types = new Set(
      response.data.map((e: { type: string }) => e.type)
    );

    expect(types.has('registration')).toBe(true);
    expect(types.has('voting')).toBe(true);
    expect(types.has('deadline')).toBe(true);
    expect(types.has('result')).toBe(true);

    for (const ev of response.data as Array<{ type: string }>) {
      expect(['registration', 'voting', 'deadline', 'result']).toContain(ev.type);
    }
  });
});
