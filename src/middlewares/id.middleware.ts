import { Request, Response, NextFunction } from 'express';
import httpStatusCode from 'http-status-codes';

import { idError, idLength } from '../utils/data/constants';

const validId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (id.length === idLength) return next();

  return res.status(httpStatusCode.BAD_REQUEST).json({ idError });
};

export default validId;
