import { NewEntity } from '../Interfaces';
import MatchesModel from '../models/Matches.model';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatches } from '../Interfaces/matches/IMatches';
import { IMatchModel } from '../Interfaces/matches/IMatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchModel = new MatchesModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async findByProgress(progress: boolean): Promise<ServiceResponse<IMatches[]>> {
    const findAllMatches = await this.matchesModel.findByProgress(progress);
    return { status: 'SUCCESSFUL', data: findAllMatches };
  }

  public async updateMatchProgress(id: IMatches['id'])
    : Promise<ServiceResponse<ServiceMessage>> {
    if (!id) return { status: 'NOT_FOUND', data: { message: 'Match Not Found' } };

    const updateProgress = await this.matchesModel.updateProgress(id);
    if (!updateProgress) {
      return { status: 'CONFLICT',
        data: { message: `There are no updates to perform in match ${id}` } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatchGoals(id: IMatches['id'], match: IMatches)
    : Promise<ServiceResponse<ServiceMessage>> {
    if (!id) return { status: 'NOT_FOUND', data: { message: 'Match Not Found' } };

    const updateProgress = await this.matchesModel.updateGoals(id, match);
    if (!updateProgress) {
      return { status: 'CONFLICT',
        data: { message: `There are no updates to perform in match ${id}` } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async createNewMatch(data:NewEntity<IMatches>): Promise<ServiceResponse<IMatches | null>> {
    const homeTeamExist = await this.matchesModel.findByPk(data.homeTeamId);
    const awayTeamExist = await this.matchesModel.findByPk(data.awayTeamId);
    if (!homeTeamExist || !awayTeamExist) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const newmatch = await this.matchesModel.create(data);
    console.log(data);
    console.log(newmatch);

    return { status: 'CREATED', data: newmatch };
  }
}
