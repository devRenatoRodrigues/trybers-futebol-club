import { Request, Response } from 'express';
import JWTUtils from '../utils/JWT.utils';
import mapStatusHTTP from '../utils/mapStatusHTTP.utils';
import UserService from '../services/Users.service';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.userService.login(req.body);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getRole(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const { payload } = req.body;

    const validToken = JWTUtils.barerExtract(authorization as string);
    const serviceResponse = await this.userService.getRole(validToken, payload);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
