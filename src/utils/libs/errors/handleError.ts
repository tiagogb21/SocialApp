import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

const handleError = (
  error: Error | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return res.status(400).json({ message: error.issues });
  }

  return res.status(404).json({ error: error.message });
};

export default handleError;
