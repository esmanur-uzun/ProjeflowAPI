import { Request, Response } from "express";
import ResponseMessage from "../../@utils/response";

const me = async (req: Request, res: Response) => {

    return new ResponseMessage(req.user).success(res);
}

export default me;
