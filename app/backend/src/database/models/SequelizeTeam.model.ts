import { CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
} from 'sequelize';
import db from '.';
import SequelizeMatches from './SequelizeMatches.model';

class SequelizeTeam extends Model<InferAttributes<SequelizeTeam>,
InferCreationAttributes<SequelizeTeam>> {
  declare id: CreationOptional<number>;

  declare teamName: string;
}
SequelizeTeam.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});

SequelizeTeam.belongsTo(SequelizeMatches, { foreignKey: 'id', as: 'homeTeamId' });
SequelizeTeam.belongsTo(SequelizeMatches, { foreignKey: 'id', as: 'awayTeamId' });

export default SequelizeTeam;
