import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeams } from '../Interfaces/teams/ITeams';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import TeamModel from '../models/Team.model';

export default class TeamsService {
  constructor(
    private teamModel: ITeamsModel = new TeamModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeams>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    const { teamName } = team as ITeams;
    return { status: 'SUCCESSFUL', data: { id, teamName } };
  }
}
