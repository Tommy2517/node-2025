import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IAuth } from "../interfaces/auth.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUserCreateDTO } from "../interfaces/user.interface";
import { tokenRepository } from "../repositoryes/token.repository";
import { authService } from "../services/auth.service";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as IUserCreateDTO;
      const data = await authService.signUp(body);
      res.status(StatusCodesEnum.CREATED).json(data);
    } catch (e) {
      next(e);
    }
  }
  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as IAuth;
      const data = await authService.signIn(body);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }
  public async me(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = res.locals.tokenPayload as ITokenPayload;
      const { userId } = tokenPayload;
      const user = await userService.getById(userId);
      res.status(StatusCodesEnum.OK).json(user);
    } catch (e) {
      next(e);
    }
  }
  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, role } = req.res.locals.tokenPayload as ITokenPayload;
      const tokens = tokenService.generateTokens({ userId, role });
      await tokenRepository.create({ ...tokens, _userId: userId });
      res.status(StatusCodesEnum.OK).json(tokens);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
