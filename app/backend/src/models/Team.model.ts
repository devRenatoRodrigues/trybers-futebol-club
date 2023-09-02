// import { NewEntity } from '../Interfaces';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam.model';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const data = await this.model.findAll();
    return data.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findByPk(id: ITeam['id']): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    if (!team) return null;
    const { teamName } = team;
    return { id, teamName };
  }
}
