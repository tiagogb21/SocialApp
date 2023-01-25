import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import httpStatusCode from 'http-status-codes'

const handleError = (
  error: Error | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ZodError) {
    return res.status(httpStatusCode.BAD_REQUEST).json({ message: error.issues });
  }

  return res.status(httpStatusCode.NOT_FOUND).json({ error: error.message });
};

export default handleError;
