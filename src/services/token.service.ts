import jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { tokenRepository } from "../repositoryes/token.repository";

class TokenService {
  public generateTokens(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, config.ACCESS_SECRET, {
      expiresIn: config.ACCESS_LIFETIME,
    });
    const refreshToken = jwt.sign(payload, config.REFRESH_SECRET, {
      expiresIn: config.REFRESH_LIFETIME,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  public verifyToken(token: string, type: "access" | "refresh"): ITokenPayload {
    try {
      let secret: string;
      switch (type) {
        case "access":
          secret = config.ACCESS_SECRET;
          break;
        case "refresh":
          secret = config.REFRESH_SECRET;
          break;
        default:
          throw new ApiError("Invalid token type", StatusCodesEnum.BED_REQUEST);
      }
      return jwt.verify(token, secret) as ITokenPayload;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new ApiError("Invalid token", StatusCodesEnum.UNAUTHORIZED);
    }
  }

  public async isTokenExist(
    token: string,
    type: "accessToken" | "refreshToken",
  ): Promise<boolean> {
    const ITokenPromise = await tokenRepository.findByParams({ [type]: token });
    return !!ITokenPromise;
  }
}

export const tokenService = new TokenService();
