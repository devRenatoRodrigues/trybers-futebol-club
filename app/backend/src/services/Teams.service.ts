import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamFindAll, ITeamFindByID } from '../Interfaces/teams/ITeamModel';
import TeamModel from '../models/Team.model';

export default class TeamsService {
  constructor(
    private teamModelAll: ITeamFindAll = new TeamModel(),
    private teamModelFinByID: ITeamFindByID = new TeamModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModelAll.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModelFinByID.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    const { teamName } = team as ITeam;
    return { status: 'SUCCESSFUL', data: { id, teamName } };
  }
}
