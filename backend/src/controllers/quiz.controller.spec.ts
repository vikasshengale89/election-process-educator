import { describe, it, expect, vi } from 'vitest';
import { getQuiz } from './quiz.controller';
import type { Request, Response, NextFunction } from 'express';

describe('Quiz Controller', () => {
  it('should return quiz questions', () => {
    const req = {} as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn() as NextFunction;

    getQuiz(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, data: expect.any(Array) })
    );
  });

  it('should return 7 questions', () => {
    const req = {} as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn() as NextFunction;

    getQuiz(req, res, next);

    const response = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(response.data.length).toBe(7);
  });

  it('should have valid question structure', () => {
    const req = {} as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn() as NextFunction;

    getQuiz(req, res, next);

    const response = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    for (const q of response.data) {
      expect(q).toHaveProperty('id');
      expect(q).toHaveProperty('question');
      expect(q).toHaveProperty('options');
      expect(q.options.length).toBe(4);
      expect(q).toHaveProperty('correctIndex');
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
    }
  });

  it('should include explanation for every question', () => {
    const req = {} as Request;
    const res = { json: vi.fn() } as unknown as Response;
    const next = vi.fn() as NextFunction;

    getQuiz(req, res, next);

    const response = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(response.data.length).toBe(7);

    const explanations = response.data.map((q: { explanation: unknown }) => q.explanation);
    for (const ex of explanations) {
      expect(typeof ex).toBe('string');
      expect((ex as string).trim().length).toBeGreaterThan(0);
    }
  });
});
