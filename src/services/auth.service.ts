import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IAuth } from "../interfaces/auth.interface";
import { ITokenPair } from "../interfaces/token.interface";
import { IUser, IUserCreateDTO } from "../interfaces/user.interface";
import { tokenRepository } from "../repositoryes/token.repository";
import { userRepository } from "../repositoryes/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
  public async signUp(
    dto: IUserCreateDTO,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await userService.isEmailUnique(dto.email);
    const password = await passwordService.hashPassword(dto.password);
    const user = await userService.create({ ...dto, password });
    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, userId: user._id });
    return { user, tokens };
  }
  public async signIn(
    dto: IAuth,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.findByEmail(dto.email);
    if (!user) {
      throw new ApiError(
        "Invalid email or password",
        StatusCodesEnum.UNAUTHORIZED,
      );
    }
    const isValidPassword = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new ApiError(
        "Invalid email or password",
        StatusCodesEnum.UNAUTHORIZED,
      );
    }
    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, userId: user._id });
    return { user, tokens };
  }
}

export const authService = new AuthService();
