import { NextFunction, Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP.utils';
import JWTUtils from '../utils/JWT.utils';
import SequelizeUser from '../database/models/SequelizeUser.model';

async function validateToken(req: Request, res: Response, next: NextFunction)
  : Promise<unknown> {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token not found' });
  }

  try {
    const decoded = JWTUtils.verify(token);

    const user = await SequelizeUser.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res
        .status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token must be a valid token' });
    }

    next();
  } catch (e) {
    return res
      .status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token must be a valid token' });
  }

  return next();
}

export default validateToken;
