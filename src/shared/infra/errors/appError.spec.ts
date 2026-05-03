import { AppError } from './appError';
import { describe, expect, it } from 'vitest';

describe('AppError', () => {
  it('should be able to create an error with status code', () => {
    const error = new AppError('Error', 500);

    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe('Error');
    expect(error.statusCode).toBe(500);
  });
});
