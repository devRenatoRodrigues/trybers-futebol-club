import { ITeam } from '../Interfaces/teams/ITeam';
import { ILeaderboard, ILeaderboardWithoutSum } from '../Interfaces/leaderboard/ILeaderboard';
import { IMatchesTeam } from '../Interfaces/matches/IMatches';

export function formatTable(teams: ITeam[]): ILeaderboardWithoutSum[] {
  const leaderboard:ILeaderboardWithoutSum[] = [];
  teams.forEach((team) => leaderboard.push({
    name: team.teamName,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
  }));
  return leaderboard;
}

export function updateVictories(matches: IMatchesTeam[], leaderboard: ILeaderboardWithoutSum[])
  : ILeaderboardWithoutSum[] {
  matches.forEach((match) => {
    const homeTeam = leaderboard.find((team) => team.name === match.homeTeam.teamName);
    const awayTeam = leaderboard.find((team) => team.name === match.awayTeam.teamName);

    if (homeTeam && awayTeam) {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        homeTeam.totalVictories += 1;
        awayTeam.totalLosses += 1;
      } else if (match.homeTeamGoals < match.awayTeamGoals) {
        awayTeam.totalVictories += 1;
        homeTeam.totalLosses += 1;
      } else {
        homeTeam.totalDraws += 1;
        awayTeam.totalDraws += 1;
      }
    }
  });
  return leaderboard;
}

export function upateTableGoals(matches: IMatchesTeam[], leaderboard: ILeaderboardWithoutSum[])
  : ILeaderboardWithoutSum[] {
  matches.forEach((match) => {
    const homeTeam = leaderboard.find((team) => team.name === match.homeTeam.teamName);
    const awayTeam = leaderboard.find((team) => team.name === match.awayTeam.teamName);

    if (homeTeam && awayTeam) {
      homeTeam.goalsFavor += match.homeTeamGoals;
      homeTeam.goalsOwn += match.awayTeamGoals;
      awayTeam.goalsFavor += match.awayTeamGoals;
      awayTeam.goalsOwn += match.homeTeamGoals;
      homeTeam.goalsBalance += match.homeTeamGoals - match.awayTeamGoals;
      awayTeam.goalsBalance += match.awayTeamGoals - match.homeTeamGoals;
      homeTeam.totalGames += 1;
      awayTeam.totalGames += 1;
    }
  });
  return leaderboard;
}

function compareTeams(teamA: ILeaderboard, teamB: ILeaderboard): number {
  if (teamA.totalVictories > teamB.totalVictories) {
    return -1;
  } if (teamA.totalVictories < teamB.totalVictories) {
    return 1;
  }

  if (teamA.goalsBalance > teamB.goalsBalance) {
    return -1;
  } if (teamA.goalsBalance < teamB.goalsBalance) {
    return 1;
  }

  if (teamA.goalsFavor > teamB.goalsFavor) {
    return -1;
  } if (teamA.goalsFavor < teamB.goalsFavor) {
    return 1;
  }

  return 0;
}

export function sortLeaderboard(leaderboard: ILeaderboard[]): ILeaderboard[] {
  return leaderboard.sort(compareTeams);
}

export function upateTablePoints(leaderboard: ILeaderboardWithoutSum[])
  : ILeaderboard[] {
  const updatedLeaderboard = leaderboard.map((team) => {
    const totalPoints = (team.totalVictories * 3) + (team.totalDraws * 1);
    const efficiencySum = ((totalPoints / (team.totalGames * 3)) * 100).toFixed(2);

    const efficiency = efficiencySum.toString();

    return { ...team, totalPoints, efficiency };
  });

  return sortLeaderboard(updatedLeaderboard);
}
