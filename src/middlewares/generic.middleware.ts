import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';

const validateBody = (schema: ZodObject<any>) => (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const parsedValue = schema.safeParse(req.body);

  if (!parsedValue.success) return next(parsedValue.error);

  next();
};

export default validateBody;
