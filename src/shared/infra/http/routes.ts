import { Router } from 'express';

export const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     description: Health
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/health', (req, res) => {
  res.send('OK');
});
