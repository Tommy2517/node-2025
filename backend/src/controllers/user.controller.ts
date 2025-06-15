import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IUserUpdateDTO } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getAll(req: Request, res: Response) {
    const data = await userService.getAll();
    res.status(StatusCodesEnum.OK).json(data);
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data = await userService.getById(id);
      res.status(StatusCodesEnum.OK).json(data);
      next();
    } catch (e) {
      next(e);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as IUserUpdateDTO;
      const id = req.params.id;
      const data = await userService.updateById(id, body);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await userService.deleteById(id);
      res.status(StatusCodesEnum.NO_CONTENT).end();
    } catch (e) {
      next(e);
    }
  }

  public async blockUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const user = await userService.blockUser(id);
      res.status(StatusCodesEnum.OK).json(user);
    } catch (e) {
      next(e);
    }
  }
  public async unBlockUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const user = await userService.unBlockUser(id);
      res.status(StatusCodesEnum.OK).json(user);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
