import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP.utils';
import TeamsService from '../services/Teams.service';

export default class TeamsController {
  constructor(
    private teamService = new TeamsService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response): Promise<Response> {
    console.log(res);

    const serviceResponse = await this.teamService.getAllTeams();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const serviceResponse = await this.teamService.getTeamById(Number(id));
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
