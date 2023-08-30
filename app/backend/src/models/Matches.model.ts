import { ID } from '../Interfaces';
import { IMatches } from '../Interfaces/matches/IMatches';
import { IMatchesFindAll,
  IMatchesFindbyPk, IMatchesFindbyProgress } from '../Interfaces/matches/IMatchesModel';
import SequelizeMatches from '../database/models/SequelizeMatches.model';

export default class MatchesModel implements IMatchesFindAll,
 IMatchesFindbyPk,
 IMatchesFindbyProgress {
  private model = SequelizeMatches ;

  async findAll(): Promise<IMatches[]> {
    const data = await this.model.findAll(
      {
        include: ['homeTeam', 'awayTeam'],
      },
    );
    console.log(data);

    return Promise.all(data.map((matches) => matches.toJSON()));
  }

  async findByProgress(progress: boolean): Promise<IMatches[]> {
    const data = await this.model.findAll({ where: { inProgress: progress },
      include: ['homeTeam', 'awayTeam'] });
    return Promise.all(data.map((matches) => matches.toJSON()));
  }

  async findByPk(id: ID): Promise<IMatches | null> {
    const data = await this.model.findByPk(id);
    if (!data) return null;
    return data.toJSON();
  }
}
