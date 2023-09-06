import * as bcrypt from 'bcryptjs';
import { IUserModel } from '../Interfaces/users/IUserModel';
import UserModel from '../models/User.model';
import JWT from '../utils/JWT.utils';
import { ILogin, IUser, IUserRole } from '../Interfaces/users/IUser';
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
      if (!bcrypt.compareSync(data.password, user.password)) {
        return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
      }
      const { email } = user as IUser;
      const token = this.jwtService.sign({ email });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
  }

  public async getRole(token: string | undefined, payload: ILogin)
    : Promise<ServiceResponse<IUserRole>> {
    const { email } = payload;

    if (!token) return { status: 'NOT_FOUND', data: { message: 'Token not found' } };

    const user = await this.userModel.findByEmail(email);

    if (!user) return { status: 'NOT_FOUND', data: { message: 'Token must be a valid token' } };
    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
