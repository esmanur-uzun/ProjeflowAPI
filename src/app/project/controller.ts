import BaseController from "../../@base/baseController";
import APIError from "../../@utils/errors";
import ResponseMessage from "../../@utils/response";
import User, { IUser } from "../users/model";
import { IProject, Project } from "./model";
import { Request, Response } from "express";

class ProjectController extends BaseController<IProject> {
  constructor() {
    super(Project);
  }

  public assignEngineer = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { projectId, userId } = req.body;
      const project = await this.model.findById(projectId);

      if (!project) new ResponseMessage("Proje bulunamadı!").error404(res);

      const user = (await User.findById(userId)) as IUser;
      if (!user || user.role !== "engineer")
        new ResponseMessage("Geçersiz mühendis ID!").error400(res);

      if(project?.teamMembers.includes(userId)) new ResponseMessage("Mühendis zaten projeye atanmış").error400(res)

    project?.teamMembers.push(userId)
    await project?.save()

    } catch (error) {
        throw new APIError("Mühendis atama işleminde bir hata oluştu!")
    }
  };
}

const projectController = new ProjectController();

export { projectController};
