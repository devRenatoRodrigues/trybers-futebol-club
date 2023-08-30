import MatchesModel from '../models/Matches.model';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatches } from '../Interfaces/matches/IMatches';
import { IMatchesFindAll, IMatchesFindbyProgress } from '../Interfaces/matches/IMatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesFindAll = new MatchesModel(),
    private matchesModelByProgress: IMatchesFindbyProgress = new MatchesModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async findByProgress(progress: boolean): Promise<ServiceResponse<IMatches[]>> {
    const findAllMatches = await this.matchesModelByProgress.findByProgress(progress);
    return { status: 'SUCCESSFUL', data: findAllMatches };
  }
}
