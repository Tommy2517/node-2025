import { RoleEnum } from "../enums/role.enum";
import { IBase } from "./base.interfase";

interface IUser extends IBase {
  _id: string;
  name: string;
  surname: string;
  age: number;
  email: string;
  password: string;
  role: RoleEnum;
  isDeleted: boolean;
  isVerified: boolean;
}

type IUserCreateDTO = Pick<
  IUser,
  "email" | "password" | "name" | "surname" | "age"
>;
type IUserUpdateDTO = Pick<
  IUser,
  "email" | "password" | "name" | "surname" | "age"
>;

export { IUser, IUserCreateDTO, IUserUpdateDTO };
