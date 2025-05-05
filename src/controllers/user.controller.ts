import {Request, Response} from "express";
import {userService} from "../services/user.service";
import {IUserDTO} from "../interfaces/user.interface";
import {StatusCodesEnum} from "../enums/status-codes.enum";

class UserController {
    public async getAll(req: Request, res: Response) {
        const data = await userService.getAll();
        res.status(StatusCodesEnum.OK).json(data)
    }

    public async getById(req: Request, res: Response) {
        const id = req.params.id
        const data = await userService.getById(id);
        res.status(StatusCodesEnum.OK).json(data)
    }

    public async create(req: Request, res: Response) {
        const body = req.body as IUserDTO
        const data = await userService.create(body);
        res.status(StatusCodesEnum.CREATED).json(data)
    }

    public async updateById(req: Request, res: Response) {
        const body = req.body as IUserDTO
        const id = req.params.id
        const data = await userService.updateById(id, body);
        res.status(StatusCodesEnum.OK).json(data)
    }

    public async deleteById(req: Request, res: Response) {
        const id = req.params.id
        await userService.deleteById(id);
        res.status(StatusCodesEnum.NO_CONTENT).end()
    }

}

export const userController = new UserController();