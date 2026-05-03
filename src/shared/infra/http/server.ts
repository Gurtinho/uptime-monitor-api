import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../../../swagger';
import { AppError } from '../errors/appError';
import { type NextFunction, type Request, type Response } from 'express';
import { rateLimiter } from './rateLimiter';
import { router } from './routes';
import env from 'dotenv';

env.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(rateLimiter);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(router);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }
  return response.status(500).json({
    status: 'Error',
    message: `Internal Server Error: ${err.message}`
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on http://localhost:${process.env.APP_PORT}`);
  console.log(`Docs available on http://localhost:${process.env.APP_PORT}/docs`);
});
