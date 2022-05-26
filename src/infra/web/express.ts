import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';

import AppError from '@domain/@shared/errors/AppError';
import routes from '@infra/web/routes';

export const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.status).json({ message: err.message });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});
