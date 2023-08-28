import { NextFunction, Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP.utils';

async function validateLoginFields(req: Request, res: Response, next: NextFunction)
  : Promise<unknown> {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(mapStatusHTTP('INVALID_DATA'))
      .json({ message: 'All fields must be filled' });
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Invalid email or password' });
  }

  next();
}

export default validateLoginFields;
