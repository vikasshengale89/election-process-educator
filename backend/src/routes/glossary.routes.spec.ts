import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../index';

describe('glossary.routes', () => {
  it('GET /api/v1/glossary should return success with terms array', async () => {
    const res = await request(app).get('/api/v1/glossary').expect(200);

    expect(res.body).toMatchObject({ success: true });
    expect(Array.isArray(res.body['data'])).toBe(true);
    expect(res.body['data'].length).toBe(16);
  });

  it('terms should have required fields', async () => {
    const res = await request(app).get('/api/v1/glossary').expect(200);
    const terms = res.body['data'] as Array<{
      term: unknown;
      definition: unknown;
      category: unknown;
      emoji: unknown;
    }>;

    for (const t of terms) {
      expect(typeof t.term).toBe('string');
      expect(typeof t.definition).toBe('string');
      expect(typeof t.category).toBe('string');
      expect(typeof t.emoji).toBe('string');
      expect(t.term.length).toBeGreaterThan(0);
      expect(t.definition.length).toBeGreaterThan(0);
    }
  });
});
