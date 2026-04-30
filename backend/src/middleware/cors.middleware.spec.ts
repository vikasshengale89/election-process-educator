import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../index';
import { ALLOWED_ORIGINS, corsConfiguration } from './cors.middleware';

describe('cors.middleware', () => {
  it('includes OPTIONS, max-age for preflight, and credentials enabled', () => {
    expect(corsConfiguration.methods).toContain('OPTIONS');
    expect(corsConfiguration.methods).toEqual(
      expect.arrayContaining(['GET', 'POST', 'PUT', 'DELETE'])
    );
    expect(corsConfiguration.maxAge).toBe(86400);
    expect(corsConfiguration.credentials).toBe(true);
    expect(corsConfiguration.allowedHeaders).toContain('Authorization');
    expect(ALLOWED_ORIGINS.length).toBeGreaterThan(0);
  });

  it('returns preflight response with caching header for allowed origin', async () => {
    const origin = ALLOWED_ORIGINS[0];
    const response = await request(app)
      .options('/health')
      .set('Origin', origin)
      .set('Access-Control-Request-Method', 'GET');

    expect(response.status).toBe(204);
    expect(response.headers['access-control-max-age']).toBe('86400');
  });
});
