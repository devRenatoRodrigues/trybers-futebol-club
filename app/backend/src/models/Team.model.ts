// import { NewEntity } from '../Interfaces';
import { ITeams } from '../Interfaces/teams/ITeams';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import SequelizeTeam from '../database/models/SequelizeTeam.model';

export default class TeamModel implements ITeamsModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeams[]> {
    const data = await this.model.findAll();
    return data.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const team = await this.model.findByPk(id);
    if (!team) return null;
    const { teamName } = team;
    return { id, teamName };
  }
}
