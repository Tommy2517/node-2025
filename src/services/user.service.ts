import {IUser, IUserDTO} from "../interfaces/user.interface";
import {userRepository} from "../repositoryes/user.repository";

class UserService {
    public getAll():Promise<IUser[]>{
        return userRepository.getAll();
    }

    public getById(id:string):Promise<IUser | null>{
        return userRepository.getById(id)
    }

    public create(body:IUserDTO):Promise<IUser> {
        return userRepository.create(body);
    }

    public updateById(id:string, body:IUserDTO):Promise<IUser>{
        return userService.updateById(id, body)
    }

    public deleteById(id:string):Promise<IUser | null>{
        return userRepository.deleteById(id)
    }
}

export const userService = new UserService();