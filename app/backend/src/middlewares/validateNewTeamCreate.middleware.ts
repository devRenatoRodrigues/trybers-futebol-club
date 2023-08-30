import { NextFunction, Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP.utils';

async function validateNewTeamCreate(req: Request, res: Response, next: NextFunction)
  : Promise<unknown> {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(mapStatusHTTP('UNPROCESSABLE_ENTITY'))
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  next();
}

export default validateNewTeamCreate;
