import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../index';

describe('polling.routes', () => {
  it('GET /api/v1/polling?zip=62701 should return locations', async () => {
    const res = await request(app).get('/api/v1/polling').query({ zip: '62701' }).expect(200);

    expect(res.body).toMatchObject({
      success: true,
    });
    const data = res.body['data'] as {
      locations: unknown[];
      idRequirements: { state?: string };
      state: string;
      zip: string;
    };
    expect(Array.isArray(data.locations)).toBe(true);
    expect(data.locations.length).toBeGreaterThan(0);
    expect(data.zip).toBe('62701');
    expect(typeof data.state).toBe('string');
    expect(data.idRequirements).toBeDefined();

    const loc = data.locations[0] as {
      name?: unknown;
      address?: unknown;
      hours?: unknown;
      distance?: unknown;
      accessibility?: unknown;
    };
    expect(loc).toHaveProperty('name');
    expect(loc).toHaveProperty('address');
  });

  it('invalid zip should fail validation', async () => {
    const resTooShort = await request(app).get('/api/v1/polling').query({ zip: '6270' }).expect(400);

    expect(resTooShort.body).toMatchObject({
      success: false,
      error: 'Validation failed',
    });
    expect(Array.isArray(resTooShort.body['details'])).toBe(true);

    await request(app).get('/api/v1/polling').query({ zip: '6270a1' }).expect(400);

    const resMissing = await request(app).get('/api/v1/polling').expect(400);

    expect(resMissing.body).toMatchObject({
      success: false,
      error: 'Validation failed',
    });
  });
});
