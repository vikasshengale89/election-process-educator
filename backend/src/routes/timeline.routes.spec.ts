import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../index';

const EVENT_TYPES = ['registration', 'voting', 'result', 'deadline'] as const;

describe('timeline.routes', () => {
  it('GET /api/v1/timeline should return success with events array', async () => {
    const res = await request(app).get('/api/v1/timeline').expect(200);

    expect(res.body).toMatchObject({
      success: true,
      location: 'all',
    });
    expect(Array.isArray(res.body['data'])).toBe(true);
    expect(res.body['data'].length).toBeGreaterThan(0);
  });

  it('events should have required fields (date, title, description, type)', async () => {
    const res = await request(app).get('/api/v1/timeline').expect(200);
    const events = res.body['data'] as Array<{
      date: unknown;
      title: unknown;
      description: unknown;
      type: unknown;
    }>;

    for (const ev of events) {
      expect(typeof ev.date).toBe('string');
      expect(ev.date?.toString().length).toBeGreaterThan(0);
      expect(typeof ev.title).toBe('string');
      expect(typeof ev.description).toBe('string');
      expect(EVENT_TYPES).toContain(ev.type);
    }
  });
});
