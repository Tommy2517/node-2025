import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPayload } from "../interfaces/token.interface";
import { userService } from "../services/user.service";

class CommonMiddleware {
  public isIdValidate(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[key];

        if (!isObjectIdOrHexString(id)) {
          throw new ApiError(`${key} - invalid`, StatusCodesEnum.BED_REQUEST);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isBodyValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body);
        next();
      } catch (e) {
        next(new ApiError(e.details[0].message, StatusCodesEnum.BED_REQUEST));
      }
    };
  }

  public async isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      const user = await userService.getById(tokenPayload.userId);
      if (user.role !== "admin") {
        throw new ApiError("Uncown command", StatusCodesEnum.FORBIDDEN);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const commonMiddleware = new CommonMiddleware();
