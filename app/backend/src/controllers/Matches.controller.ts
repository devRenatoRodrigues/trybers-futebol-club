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

  public async findByProgress(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const queryToBool = inProgress === 'true';

    const serviceResponse = await this.matchesService.findByProgress(queryToBool);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateMatchProgress(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const serviceResponse = await this.matchesService.updateMatchProgress(Number(id));
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateMatchGoals(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = req.body;

    const serviceResponse = await this.matchesService.updateMatchGoals(Number(id), data);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
