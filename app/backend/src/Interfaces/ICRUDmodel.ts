import { ID } from '.';

export interface ICRUDModelCreator<T> {
  create(data: Partial<T>): Promise<T | null>,
}

export interface ICRUDModelFindAll<T> {
  findAll(): Promise<T[]>,
}

export interface ICRUDModelByProgress<T> {
  findByProgress(boolean: boolean): Promise<T[]>
}

export interface ICRUDModelFindByPK<T> {
  findByPk(id: ID): Promise<T | null>,
}

export interface ICRUDMatcheUpdater<T> {
  updateProgress(id: ID): Promise<T | null>,
  updateGoals(id: ID, data: Partial<T>): Promise<T | null>,
}

export interface ICRUDModelDeleter {
  delete(id: ID): Promise<number>,
}

export interface ICRUDMatch<T>
  extends ICRUDModelFindByPK<T>, ICRUDModelFindAll<T>,
  ICRUDMatcheUpdater<T>, ICRUDModelCreator<T>, ICRUDModelByProgress<T> { }

export interface ICRUDTeams<T>
  extends ICRUDModelFindByPK<T>, ICRUDModelFindAll<T> { }

export interface ICRUDModelLeaderboard<T> {
  getHomeTeamsClassification(): Promise<T[] | null>,
  getAwayClassification(): Promise<T[] | null>,
  getClassification(): Promise<T[] | null>,
}
