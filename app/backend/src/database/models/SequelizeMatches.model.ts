import { CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
} from 'sequelize';
import db from '.';
import SequelizeTeam from './SequelizeTeam.model';

class SequelizeMatches extends Model<InferAttributes<SequelizeMatches>,
InferCreationAttributes<SequelizeMatches>> {
  declare id: CreationOptional<number>;

  declare homeTeamGoals: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

SequelizeMatches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  tableName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeMatches.belongsTo(SequelizeTeam, { as: 'homeTeam', foreignKey: 'homeTeamsId' });
SequelizeMatches.belongsTo(SequelizeTeam, { as: 'awayTeam', foreignKey: 'awayTeamsId' });

export default SequelizeMatches;
