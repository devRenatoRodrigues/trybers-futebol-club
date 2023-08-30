import { IMatches } from '../Interfaces/matches/IMatches';
import { IMatchesFindAll,
  IMatchesFindbyPk,
  IMatchesFindbyProgress,
  IMatchesUpdate,
} from '../Interfaces/matches/IMatchesModel';
import SequelizeMatches from '../database/models/SequelizeMatches.model';

export default class MatchesModel implements IMatchesFindAll,
 IMatchesFindbyPk,
 IMatchesFindbyProgress,
 IMatchesUpdate {
  private model = SequelizeMatches ;

  async findAll(): Promise<IMatches[]> {
    const data = await this.model.findAll(
      {
        include: ['homeTeam', 'awayTeam'],
      },
    );

    return data.map((matches) => matches.toJSON());
  }

  async findByProgress(progress: boolean): Promise<IMatches[]> {
    const data = await this.model.findAll({ where: { inProgress: progress },
      include: ['homeTeam', 'awayTeam'] });
    return Promise.all(data.map((matches) => matches.toJSON()));
  }

  async findByPk(id: IMatches['id']): Promise<IMatches | null> {
    const data = await this.model.findByPk(id);
    if (!data) return null;
    return data.toJSON();
  }

  async updateProgress(id: IMatches['id']): Promise<IMatches | null> {
    const data = await this.findByPk(id);
    if (!data) return null;
    const [affectedRows] = await this.model.update({ inProgress: true }, { where: { id } });
    if (affectedRows === 0) return null;
    return this.findByPk(id);
  }

  async updateGoals(
    id: IMatches['id'],
    data: Partial<IMatches>,
  ): Promise<IMatches | null> {
    const dataMatch = await this.findByPk(id);
    if (!dataMatch) return null;
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;
    return this.findByPk(id);
  }
}
