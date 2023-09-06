import { IMatchesTeam } from '../Interfaces/matches/IMatches';
import { formatTable,
  upateTableGoals,
  upateTablePoints,
  updateVictories } from '../utils/formatLeaderboard';
import SequelizeTeam from '../database/models/SequelizeTeam.model';
import SequelizeMatches from '../database/models/SequelizeMatches.model';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
// import SequelizeMatches from '../database/models/SequelizeMatches.model';

export default class LeaderboardModel implements ILeaderboardModel {
  private matchesmodel = SequelizeMatches;
  private teamsmodel = SequelizeTeam;
  protected queryHome = `SELECT
  t.team_name as name,
  CAST(SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 3
    WHEN m.home_team_goals = m.away_team_goals THEN 1
    ELSE 0 END) AS SIGNED) AS totalPoints,
  CAST(COUNT(*) AS SIGNED) AS totalGames,
  CAST(SUM(CASE WHEN m.home_team_goals > m.away_team_goals 
    THEN 1 ELSE 0 END) AS SIGNED) AS totalVictories,
  CAST(SUM(CASE WHEN m.home_team_goals = m.away_team_goals 
    THEN 1 ELSE 0 END) AS SIGNED) AS totalDraws,
  CAST(SUM(CASE WHEN m.home_team_goals < m.away_team_goals 
    THEN 1 ELSE 0 END) AS SIGNED) AS totalLosses,
  CAST(SUM(m.home_team_goals) AS SIGNED) AS goalsFavor,
  CAST(SUM(m.away_team_goals) AS SIGNED) AS goalsOwn,
  CAST(SUM(m.home_team_goals - m.away_team_goals) AS SIGNED) AS goalsBalance,
  CAST(((SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 3
    WHEN m.home_team_goals = m.away_team_goals THEN 1
    ELSE 0 END) / (COUNT(*) * 3.0)) * 100) AS DECIMAL(10, 2)) AS efficiency
FROM
  matches m
JOIN
  teams t ON m.home_team_id = t.id
  WHERE
  NOT m.in_progress
GROUP BY
  t.team_name
ORDER BY
  totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC
`;

  protected queryAway = `SELECT
t.team_name as name,
CAST(SUM(CASE WHEN m.away_team_goals > m.home_team_goals THEN 3
  WHEN m.away_team_goals = m.home_team_goals THEN 1
  ELSE 0 END) AS SIGNED) AS totalPoints,
CAST(COUNT(*) AS SIGNED) AS totalGames,
CAST(SUM(CASE WHEN m.away_team_goals > m.home_team_goals 
  THEN 1 ELSE 0 END) AS SIGNED) AS totalVictories,
CAST(SUM(CASE WHEN m.away_team_goals = m.home_team_goals 
  THEN 1 ELSE 0 END) AS SIGNED) AS totalDraws,
CAST(SUM(CASE WHEN m.away_team_goals < m.home_team_goals 
  THEN 1 ELSE 0 END) AS SIGNED) AS totalLosses,
CAST(SUM(m.away_team_goals) AS SIGNED) AS goalsFavor,
CAST(SUM(m.home_team_goals) AS SIGNED) AS goalsOwn,
CAST(SUM(m.away_team_goals - m.home_team_goals) AS SIGNED) AS goalsBalance,
CAST(((SUM(CASE WHEN m.away_team_goals > m.home_team_goals THEN 3
  WHEN m.away_team_goals = m.home_team_goals THEN 1
  ELSE 0 END) / (COUNT(*) * 3.0)) * 100) AS DECIMAL(10, 2)) AS efficiency
FROM
matches m
JOIN
teams t ON m.away_team_id = t.id
WHERE
NOT m.in_progress
GROUP BY
t.team_name
ORDER BY
totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC
`;

  async getHomeTeamsClassification(): Promise<ILeaderboard[] | null > {
    const [results] = await this.matchesmodel.sequelize?.query(this.queryHome) || [[], null];
    if (results.length === 0) {
      return null;
    }

    return results as ILeaderboard[];
  }

  async getAwayClassification(): Promise<ILeaderboard[] | null> {
    const [results] = await this.matchesmodel.sequelize?.query(this.queryAway) || [[], null];
    if (results.length === 0) {
      return null;
    }

    return results as ILeaderboard[];
  }

  async getClassification(): Promise<ILeaderboard[] | null> {
    const allMatches = await this.matchesmodel.findAll({
      where: { inProgress: false },
      include: [
        { model: this.teamsmodel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this.teamsmodel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    }) as unknown as IMatchesTeam[];

    const teams = await this.teamsmodel.findAll();
    const leaderboard = formatTable(teams);
    updateVictories(allMatches, leaderboard);
    upateTableGoals(allMatches, leaderboard);
    const table = upateTablePoints(leaderboard);
    return table;
  }
}
