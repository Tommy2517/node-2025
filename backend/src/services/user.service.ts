import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IUser, IUserCreateDTO } from "../interfaces/user.interface";
import { userRepository } from "../repositoryes/user.repository";

class UserService {
  public getAll(): Promise<IUser[]> {
    return userRepository.getAll();
  }

  public async getById(id: string): Promise<IUser> {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
    }
    return user;
  }

  public create(user: IUserCreateDTO): Promise<IUser> {
    return userRepository.create(user);
  }

  public async updateById(id: string, user: Partial<IUser>): Promise<IUser> {
    const data = await userRepository.getById(id);
    if (!data) {
      throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
    }
    return await userRepository.updateById(id, user);
  }

  public async deleteById(id: string): Promise<void> {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
    }
    await userRepository.deleteById(id);
  }
  public async isEmailUnique(email: string): Promise<void> {
    const user = await userRepository.findByEmail(email);
    if (user) {
      throw new ApiError(
        "User is already existed",
        StatusCodesEnum.BED_REQUEST,
      );
    }
  }
  public async blockUser(id: string): Promise<IUser> {
    const user = userRepository.getById(id);
    if (!user) {
      throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
    }
    return await userRepository.changeIsActive(id, { isActive: false });
  }
  public async unBlockUser(id: string): Promise<IUser> {
    const user = userRepository.getById(id);
    if (!user) {
      throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
    }
    return await userRepository.changeIsActive(id, { isActive: true });
  }
  public async isActive(id: string): Promise<boolean> {
    const user = await this.getById(id);
    return user.isActive;
  }
  public async findByEmail(email: string): Promise<IUser> {
    return await userRepository.findByEmail(email);
  }
}

export const userService = new UserService();
