import { ICRUDModelFindAll, ICRUDModelFindByID } from '../ICRUDmodel';
import { ITeam } from './ITeam';

export type ITeamFindAll = ICRUDModelFindAll<ITeam>;

export type ITeamFindByID = ICRUDModelFindByID<ITeam>;
