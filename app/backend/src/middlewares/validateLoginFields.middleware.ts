import { NextFunction, Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP.utils';

async function loginMiddleware(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(mapStatusHTTP('INVALID_DATA'))
      .json({ message: 'All fields must be filled' });
  }

  next();
}

export default loginMiddleware;
