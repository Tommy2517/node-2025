import { IUser, IUserDTO } from "../interfaces/user.interface";
import { userRepository } from "../repositoryes/user.repository";

class UserService {
  public getAll(): Promise<IUser[]> {
    return userRepository.getAll();
  }

  public getById(id: string): Promise<IUser> {
    return userRepository.getById(id);
  }

  public create(user: IUserDTO): Promise<IUser> {
    return userRepository.create(user);
  }

  public updateById(id: string, user: IUserDTO): Promise<IUser> {
    return userRepository.updateById(id, user);
  }

  public deleteById(id: string): Promise<IUser> {
    return userRepository.deleteById(id);
  }
}

export const userService = new UserService();
