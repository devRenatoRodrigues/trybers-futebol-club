import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP.utils';
import MatchesService from '../services/Matches.service';

export default class TeamsController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress) {
      const queryToBool = inProgress === 'true';
      const serviceResponse = await this.matchesService.findByProgress(queryToBool);
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    const serviceResponse = await this.matchesService.getAllMatches();
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

  public async createNewMatch(req: Request, res: Response) {
    const newMatchData = req.body;
    const serviceResponse = await this.matchesService.createNewMatch(newMatchData);
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
