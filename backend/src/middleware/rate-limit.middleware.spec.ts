import { describe, it, expect } from 'vitest';
import {
  apiLimiter,
  authLimiter,
  API_RATE_LIMIT_OPTIONS,
  AUTH_RATE_LIMIT_OPTIONS,
} from './rate-limit.middleware';

describe('rate-limit.middleware', () => {
  it('configures api limiter window, max throughput, and modern headers only', () => {
    expect(API_RATE_LIMIT_OPTIONS.windowMs).toBe(15 * 60 * 1000);
    expect(API_RATE_LIMIT_OPTIONS.max).toBe(100);
    expect(API_RATE_LIMIT_OPTIONS.standardHeaders).toBe(true);
    expect(API_RATE_LIMIT_OPTIONS.legacyHeaders).toBe(false);
    expect(typeof apiLimiter).toBe('function');
  });

  it('configures auth limiter with stricter throughput than api limiter', () => {
    expect(AUTH_RATE_LIMIT_OPTIONS.windowMs).toBe(15 * 60 * 1000);
    expect(AUTH_RATE_LIMIT_OPTIONS.max).toBe(20);
    expect(AUTH_RATE_LIMIT_OPTIONS.standardHeaders).toBe(true);
    expect(AUTH_RATE_LIMIT_OPTIONS.legacyHeaders).toBe(false);
    expect(typeof authLimiter).toBe('function');
    expect(AUTH_RATE_LIMIT_OPTIONS.max).toBeLessThan(API_RATE_LIMIT_OPTIONS.max);
  });
});
