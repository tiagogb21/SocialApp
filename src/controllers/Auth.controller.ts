import { Request, Response } from 'express';
import httpStatusCode from 'http-status-codes';

// INTERFACE
import { IUser } from '../@types/interfaces/IUser';
import { AuthService } from '../services/Auth.service';

export default class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request & { body:IUser }, res: Response<IUser>) {
    const result = await this.authService.register(req.body);
    return res.status(httpStatusCode.CREATED).json(result);
  }

  async confirm(req: Request & { body:IUser }, res: Response<{message: string}>) {
    const { hash } = req.params;
    await this.authService.confirm(hash);
    return res.status(httpStatusCode.CREATED).json({ message: 'User confirmed'});
  }

  async login(req: Request, res: Response<{ token: string }>) {
    const findUser = await this.authService.login(req.body);
    return res.status(httpStatusCode.OK).json(findUser);
  }
}
