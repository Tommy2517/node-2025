import {IUser, IUserDTO} from "../interfaces/user.interface";
import {User} from "../modules/user.module";

class UserRepository {
    public getAll(): Promise<IUser[]> {
        return User.find()
    }

    public create(user: IUserDTO): Promise<IUser> {
        return User.create(user)
    }

    public getById(id: string): Promise<IUser | null> {
        return User.findById(id)
    }

    public updateById(id: string, body: IUserDTO): Promise<IUser | null> {
        return User.findByIdAndUpdate(id, body)
    }

    public deleteById(id: string): Promise<IUser | null> {
        return User.findByIdAndDelete(id)
    }
}

export const userRepository = new UserRepository()