import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../index';

describe('quiz.routes', () => {
  it('GET /api/v1/quiz should return questions', async () => {
    const res = await request(app).get('/api/v1/quiz').expect(200);

    expect(res.body).toMatchObject({ success: true });
    expect(Array.isArray(res.body['data'])).toBe(true);
    expect(res.body['data'].length).toBe(7);
  });

  it('questions should have proper structure', async () => {
    const res = await request(app).get('/api/v1/quiz').expect(200);
    const questions = res.body['data'] as Array<{
      id: unknown;
      question: unknown;
      options: unknown;
      correctIndex: unknown;
      explanation?: unknown;
    }>;

    for (const q of questions) {
      expect(typeof q.id).toBe('number');
      expect(typeof q.question).toBe('string');
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options?.length).toBe(4);
      expect(typeof q.correctIndex).toBe('number');
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
      expect(typeof q.explanation).toBe('string');
      expect(q.explanation?.length).toBeGreaterThan(0);
    }
  });
});
