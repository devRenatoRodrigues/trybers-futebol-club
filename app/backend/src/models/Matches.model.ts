import { IMatchModel } from '../Interfaces/matches/IMatchesModel';
import { NewEntity } from '../Interfaces';
import { IMatches } from '../Interfaces/matches/IMatches';

import SequelizeMatches from '../database/models/SequelizeMatches.model';

export default class MatchesModel implements IMatchModel {
  private model = SequelizeMatches ;

  async findAll(): Promise<IMatches[]> {
    const data = await this.model.findAll(
      {
        include: ['homeTeam', 'awayTeam'],
      },
    );

    return data;
  }

  async findByProgress(progress: boolean): Promise<IMatches[]> {
    const data = await this.model.findAll({ where: { inProgress: progress },
      include: ['homeTeam', 'awayTeam'] });
    return data;
  }

  async findByPk(id: IMatches['id']): Promise<IMatches | null> {
    const data = await this.model.findByPk(id);
    if (!data) return null;
    return data;
  }

  async updateProgress(id: IMatches['id']): Promise<IMatches | null> {
    const [affectedRows] = await this.model.update({ inProgress: false }, { where: { id } });
    if (affectedRows === 0) return null;
    return this.findByPk(id);
  }

  async updateGoals(
    id: IMatches['id'],
    data: Partial<IMatches>,
  ): Promise<IMatches | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;
    return this.findByPk(id);
  }

  async create(data: NewEntity<IMatches>): Promise<IMatches | null> {
    const dbData = await this.model.create(data);
    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress } = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
