import { NewEntity } from '../Interfaces';
import MatchesModel from '../models/Matches.model';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatches } from '../Interfaces/matches/IMatches';
import { IMatchesCreate, IMatchesFindAll,
  IMatchesFindbyProgress,
  IMatchesUpdate,
} from '../Interfaces/matches/IMatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesFindAll = new MatchesModel(),
    private matchesModelByProgress: IMatchesFindbyProgress = new MatchesModel(),
    private matchesModelUpdate: IMatchesUpdate = new MatchesModel(),
    private matchesModelCreate: IMatchesCreate = new MatchesModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async findByProgress(progress: boolean): Promise<ServiceResponse<IMatches[]>> {
    const findAllMatches = await this.matchesModelByProgress.findByProgress(progress);
    return { status: 'SUCCESSFUL', data: findAllMatches };
  }

  public async updateMatchProgress(id: IMatches['id'])
    : Promise<ServiceResponse<ServiceMessage>> {
    if (!id) return { status: 'NOT_FOUND', data: { message: 'Match Not Found' } };

    const updateProgress = await this.matchesModelUpdate.updateProgress(id);
    if (!updateProgress) {
      return { status: 'CONFLICT',
        data: { message: `There are no updates to perform in match ${id}` } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatchGoals(id: IMatches['id'], match: IMatches)
    : Promise<ServiceResponse<ServiceMessage>> {
    if (!id) return { status: 'NOT_FOUND', data: { message: 'Match Not Found' } };

    const updateProgress = await this.matchesModelUpdate.updateGoals(id, match);
    if (!updateProgress) {
      return { status: 'CONFLICT',
        data: { message: `There are no updates to perform in match ${id}` } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async createNewMatch(data:NewEntity<IMatches>): Promise<ServiceResponse<IMatches | null>> {
    console.log(data);

    if (!data) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const newmatch = await this.matchesModelCreate.create(data);
    return { status: 'CREATED', data: newmatch };
  }
}
