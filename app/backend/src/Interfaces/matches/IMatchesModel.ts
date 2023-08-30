import { ICRUDMatcheUpdater, ICRUDModelByProgress,
  ICRUDModelFindAll,
  ICRUDModelFindByPK,
} from '../ICRUDmodel';
import { IMatches } from './IMatches';

export type IMatchesFindAll = ICRUDModelFindAll<IMatches>;
export type IMatchesFindbyPk = ICRUDModelFindByPK<IMatches>;
export type IMatchesFindbyProgress = ICRUDModelByProgress<IMatches>;
export type IMatchesUpdate = ICRUDMatcheUpdater<IMatches>;
