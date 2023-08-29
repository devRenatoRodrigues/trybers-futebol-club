import { IMatches } from '../Interfaces/matches/IMatches';
import { IMatchesFindAll } from '../Interfaces/matches/IMatchesModel';
import SequelizeMatches from '../database/models/SequelizeMatches.model';

export default class MatchesModel implements IMatchesFindAll {
  private model = SequelizeMatches ;

  async findAll(): Promise<IMatches[]> {
    const data = await this.model.findAll(
      {
        include: ['homeTeam', 'awayTeam'],
      },
    );
    console.log(data);

    return data.map((matches) => matches.toJSON());
  }
}
