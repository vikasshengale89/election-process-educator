import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../index';

describe('Health endpoint', () => {
  it('GET /health should return ok status', async () => {
    const res = await request(app).get('/health').expect(200);

    expect(res.body).toMatchObject({
      status: 'ok',
    });
    expect(res.body['timestamp']).toBeDefined();
    expect(typeof res.body['timestamp']).toBe('string');
    expect(Number.isNaN(Date.parse(res.body['timestamp']))).toBe(false);
  });

  it('GET / should return API info', async () => {
    const res = await request(app).get('/').expect(200);

    expect(res.body).toEqual({
      message: 'Election Process Educator API',
      version: '1.0.0',
    });
  });

  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/does-not-exist').expect(404);

    expect(res.body).toEqual({
      success: false,
      error: 'Not found',
    });
  });
});
