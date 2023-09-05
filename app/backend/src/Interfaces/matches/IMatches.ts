import { Identifiable } from '..';

export interface IMatches extends Identifiable {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress?: boolean
}

export interface IMatchesTeam extends Identifiable {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress?: boolean
  homeTeam: {
    teamName: string
  }
  awayTeam: {
    teamName: string
  }
}
