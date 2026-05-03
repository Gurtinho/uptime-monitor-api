import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { type Request, type Response, type NextFunction } from 'express';
import { rateLimiter } from './rateLimiter';

describe('rateLimiter Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    // Mock time
    vi.useFakeTimers();

    req = { ip: '127.0.0.1' };
    res = {
      status: vi.fn().mockReturnThis(), // mockReturnThis permite encadear res.status().json()
      json: vi.fn()
    };
    next = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call next() on the first request', () => {
    rateLimiter(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledOnce();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should return 429 when exceeding 100 requests', () => {
    req = { ip: '192.168.1.100' };

    // Mock 100 requests
    for (let i = 0; i < 100; i++) {
      rateLimiter(req as Request, res as Response, next);
    }

    // Mock 101th request (should be blocked)
    rateLimiter(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Too many requests, please try again later.'
    });
    expect(next).toHaveBeenCalledTimes(100);
  });

  it('should reset count after 15 minutes', () => {
    req = { ip: '10.0.0.5' };

    // Mock 100 requests
    for (let i = 0; i < 101; i++) {
      rateLimiter(req as Request, res as Response, next);
    }
    expect(res.status).toHaveBeenCalledWith(429);

    // Advance time by 15 minutes and 1 second (15 * 60 * 1000 + 1000)
    vi.advanceTimersByTime(901000);

    // Mock one more request (should be allowed)
    rateLimiter(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledTimes(101);
  });
});
