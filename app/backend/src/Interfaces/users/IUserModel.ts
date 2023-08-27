// import { ICRUDModelReader } from '../ICRUDmodel';
import { IUser } from './IUser';

export interface IUserModel{
  findByEmail(email: IUser['email']):Promise<IUser | null>,
}
