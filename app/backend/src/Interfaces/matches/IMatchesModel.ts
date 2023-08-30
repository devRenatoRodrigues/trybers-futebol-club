import { ICRUDMatcheUpdater, ICRUDModelByProgress,
  ICRUDModelCreator,
  ICRUDModelFindAll,
  ICRUDModelFindByPK,
} from '../ICRUDmodel';
// import { ServiceMessage } from '../ServiceResponse';
import { IMatches } from './IMatches';

export type IMatchesFindAll = ICRUDModelFindAll<IMatches>;
export type IMatchesFindbyPk = ICRUDModelFindByPK<IMatches>;
export type IMatchesFindbyProgress = ICRUDModelByProgress<IMatches>;
export type IMatchesUpdate = ICRUDMatcheUpdater<IMatches>;
export type IMatchesCreate = ICRUDModelCreator<IMatches>;
