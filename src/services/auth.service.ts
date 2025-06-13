import { config } from "../configs/config";
import { emailConstants } from "../constants/email.constants";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailEnum } from "../enums/email.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IAuth } from "../interfaces/auth.interface";
import { ITokenPair } from "../interfaces/token.interface";
import { IUser, IUserCreateDTO } from "../interfaces/user.interface";
import { tokenRepository } from "../repositoryes/token.repository";
import { userRepository } from "../repositoryes/user.repository";
import { emailService } from "./email.service";
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
    const token = tokenService.generateActionToken(
      { userId: user._id, role: user.role },
      ActionTokenTypeEnum.ACTIVATE,
    );
    await emailService.sendEmail(
      user.email,
      emailConstants[EmailEnum.ACTIVATE],
      {
        name: user.name,
        url: `${config.FRONTEND_URL}/activate/${token}`,
      },
    );
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user: user, tokens };
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

    if (!user.isActive) {
      throw new ApiError("Account is not active", StatusCodesEnum.FORBIDDEN);
    }
    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, userId: user._id });
    return { user, tokens };
  }

  public async activate(token: string): Promise<IUser> {
    const { userId } = tokenService.verifyToken(
      token,
      ActionTokenTypeEnum.ACTIVATE,
    );
    return await userService.updateById(userId, { isActive: true });
  }

  public async recoveryPasswordRequest(email: string): Promise<void> {
    const user = await userService.findByEmail(email);
    const token = tokenService.generateActionToken(
      {
        userId: user._id,
        role: user.role,
      },
      ActionTokenTypeEnum.RECOVERY,
    );
    const url = `${config.FRONTEND_URL}/recovery/${token}`;
    await emailService.sendEmail(
      user.email,
      emailConstants[EmailEnum.RECOVERY],
      {
        name: user.name,
        url,
      },
    );
  }
  public async recoveryPassword(
    token: string,
    password: string,
  ): Promise<IUser> {
    const { userId } = tokenService.verifyToken(
      token,
      ActionTokenTypeEnum.RECOVERY,
    );
    const hashedPassword = await passwordService.hashPassword(password);
    return await userService.updateById(userId, { password: hashedPassword });
  }
}

export const authService = new AuthService();
