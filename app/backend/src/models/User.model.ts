import { IUser, IUserResponse } from '../Interfaces/users/IUser';
import SequelizeUser from '../database/models/SequelizeUser.model';
import { IUserModel } from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, password, username, role } = user;
    return { id, email, username, password, role };
  }

  async findByid(id: IUser['id']): Promise<IUserResponse | null> {
    const user = await this.model.findByPk(id);
    if (!user) return null;
    const { email, username, role } = user;
    return { id, email, username, role };
  }
}
