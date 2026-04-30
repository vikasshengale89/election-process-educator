import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../index';

describe('auth.routes', () => {
  it('POST /guest should return session_id and user', async () => {
    const res = await request(app).post('/api/v1/auth/guest').expect(200);

    expect(res.body).toHaveProperty('session_id');
    expect(typeof res.body['session_id']).toBe('string');
    expect(res.body['session_id']).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/iu
    );
    expect(res.body['user']).toMatchObject({
      name: 'Guest User',
      isGuest: true,
    });
    expect(typeof res.body['user']['id']).toBe('string');
    expect(res.body['user']['id']).toContain('guest_');
  });

  it('GET /me without auth header should return 401', async () => {
    await request(app).get('/api/v1/auth/me').expect(401);
  });

  it('GET /me with invalid session should return 401', async () => {
    await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', 'Bearer invalid-session-token')
      .expect(401);
  });
});
