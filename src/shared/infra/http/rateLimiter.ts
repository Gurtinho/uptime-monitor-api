import { type Request, type Response, type NextFunction } from 'express';

// Store request counts per IP
const requestCounts: Record<string, { count: number; lastRequest: number }> = {};

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip as string;
  const now = Date.now();

  if (!requestCounts[ip]) {
    requestCounts[ip] = { count: 1, lastRequest: now };
  } else {
    const timeSinceLastRequest = now - requestCounts[ip].lastRequest;
    const timeLimit = 15 * 60 * 1000; // 15 minutes

    if (timeSinceLastRequest < timeLimit) {
      requestCounts[ip].count += 1;
    } else {
      requestCounts[ip] = { count: 1, lastRequest: now }; // Reset after time window
    }
  }

  const maxRequests = 100;

  if (requestCounts[ip].count > maxRequests) {
    return res.status(429).json({ message: 'Too many requests, please try again later.' });
  }

  requestCounts[ip].lastRequest = now;
  next();
};
