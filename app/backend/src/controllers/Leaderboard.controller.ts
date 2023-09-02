import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP.utils';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getHomeTeams(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.leaderboardService.getHomeTeams();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getAwayTeams(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.leaderboardService.getAwayTeams();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getClassification(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.leaderboardService.getClassification();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
