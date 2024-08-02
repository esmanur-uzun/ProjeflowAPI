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
      const { id } = req.params;
      const { userId } = req.body;
      const project = await this.model.findById(id);

      if (!project) new ResponseMessage("Proje bulunamadı!").error404(res);

      const user = (await User.findById(userId)) as IUser;
      if (!user || user.role !== "engineer") {
        new ResponseMessage("Geçersiz mühendis ID!").error400(res);
        return;
      }

      if (project?.teamMembers.includes(userId)) {
        new ResponseMessage("Mühendis zaten projeye atanmış").error400(res);
        return;
      }

      project?.teamMembers.push(userId);
      new ResponseMessage("Mühendis projeye atandı").success(res);
      await project?.save();
    } catch (error) {
      console.log(error);
      
      throw new APIError("Mühendis atama işleminde bir hata oluştu!");
    }
  };

  public removeMember = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const project = await this.model.findById(id);

      if (!project) {
        new ResponseMessage("Proje bulunamadı!").error404(res);
        return;
      }

      project.teamMembers = project.teamMembers.filter(
        (member) => member.toString() !== userId
      );
      await project.save();

      new ResponseMessage("Mühendis projeden çıkarıldı!").success(res);
    } catch (error) {
      console.log(error);
      
      throw new APIError("Mühendis silme işleminde bir hata oluştu!");
    }
  };
}

const projectController = new ProjectController();

export { projectController };
