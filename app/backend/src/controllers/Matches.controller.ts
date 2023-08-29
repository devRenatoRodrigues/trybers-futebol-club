import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP.utils';
import MatchesService from '../services/Matches.service';

export default class TeamsController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.matchesService.getAllMatches();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
