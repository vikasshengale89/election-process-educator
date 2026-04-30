import rateLimit from 'express-rate-limit';

export const API_RATE_LIMIT_OPTIONS = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
} as const;

export const AUTH_RATE_LIMIT_OPTIONS = {
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
} as const;

const API_MESSAGE = {
  success: false,
  error: 'Too many requests, please try again later.',
} as const;

const AUTH_MESSAGE = {
  success: false,
  error: 'Too many authentication attempts, please try again later.',
} as const;

export const apiLimiter = rateLimit({
  ...API_RATE_LIMIT_OPTIONS,
  message: API_MESSAGE,
});

export const authLimiter = rateLimit({
  ...AUTH_RATE_LIMIT_OPTIONS,
  message: AUTH_MESSAGE,
});
