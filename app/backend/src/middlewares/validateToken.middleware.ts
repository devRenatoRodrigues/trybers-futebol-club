import { NextFunction, Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP.utils';
import JWTUtils from '../utils/JWT.utils';

async function validateToken(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token not found' });
  }
  const validToken = JWTUtils.barerExtract(authorization);

  try {
    const decoded = JWTUtils.verify(validToken);
    req.body.payload = decoded;

    return next();
  } catch (e) {
    return res
      .status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token must be a valid token' });
  }
}

export default validateToken;
