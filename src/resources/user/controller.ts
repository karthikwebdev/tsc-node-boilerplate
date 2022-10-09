import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@utils/interfaces/controller';
import HttpException from '@utils/exceptions/http';
import validationMiddleware from '@middlewares/validation';
import authenticationMiddleware from '@middlewares/authentication';
import * as validate from './validation';
import UserService from './service';

class UserController implements Controller {
  public path = '/users';
  public router = Router();
  private userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(validate.register),
      this.register
    );

    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.login),
      this.login
    );

    this.router.get(`${this.path}/me`, authenticationMiddleware, this.getUser);
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const newUser = await this.userService.register(req.body);
      return res
        .status(201)
        .json({ result: newUser, message: 'User registered successfully!' });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { username, password, isRememberEnabled } = req.body;

      const result = await this.userService.login(
        username,
        password,
        isRememberEnabled
      );
      return res.status(200).json({
        result,
        message: 'User Loggedin successfully!',
      });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      await (await req.user.populate('stores')).populate('role');
      return res.status(200).json({ result: req.user });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default UserController;
