import BaseController from '../../@base/baseController';
import { Request, Response } from "express";
import ResponseMessage from "../../@utils/response";
import User, { IUser } from './model';

class UserController extends BaseController<IUser> {
    constructor() {
        super(User);
    }
    public me = async (req: Request, res: Response) => {
        return new ResponseMessage(req.user).success(res);
    };
}

const userController = new UserController();

export { userController };




