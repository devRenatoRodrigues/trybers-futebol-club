import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP.utils';
import UserService from '../services/Users.service';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.userService.login(req.body);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getRole(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const serviceResponse = await this.userService.getRole(authorization);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
