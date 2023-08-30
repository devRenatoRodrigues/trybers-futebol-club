import { ID } from '.';

export interface ICRUDModelCreator<T> {
  create(data: Partial<T>): Promise<T>,
}

export interface ICRUDModelFindAll<T> {
  findAll(): Promise<T[]>,
}

export interface ICRUDModelByProgress<T> {
  findByProgress(boolean: boolean): Promise<T[]>
}

export interface ICRUDModelFindByID<T> {
  findById(id: ID): Promise<T | null>,
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

export interface ICRUDModel<T>
  extends ICRUDModelCreator<T>, ICRUDMatcheUpdater<T>,
  ICRUDModelDeleter { }
