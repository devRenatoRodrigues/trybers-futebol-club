// import * as bcrypt from 'bcryptjs';
import { IUserModel } from '../Interfaces/users/IUserModel';
import UserModel from '../models/User.model';
import JWT from '../utils/JWT.utils';
import { ILogin, IUser } from '../Interfaces/users/IUser';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import { IToken } from '../Interfaces/IToken';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) { }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (user) {
      const { email } = user as IUser;
      const token = this.jwtService.sign({ email });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'NOT_FOUND', data: { message: 'User not found' } };
  }
}
