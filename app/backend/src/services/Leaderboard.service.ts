import LeaderboardModel from '../models/Leaderboard.model';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';

export default class LeaderboardService {
  constructor(
    private leaderboardModel: ILeaderboardModel = new LeaderboardModel(),
  ) { }

  public async getHomeTeams(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeams = await this.leaderboardModel.getHomeTeamsClassification();
    if (!allTeams) {
      return { status: 'NOT_FOUND', data: { message: 'error' } };
    }
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getAwayTeams(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeams = await this.leaderboardModel.getAwayClassification();
    if (!allTeams) {
      return { status: 'NOT_FOUND', data: { message: 'error' } };
    }
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getClassification(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeams = await this.leaderboardModel.getClassification();
    if (!allTeams) {
      return { status: 'NOT_FOUND', data: { message: 'error' } };
    }
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
