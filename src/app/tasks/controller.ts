import BaseController from "../../@base/baseController";
import { ITask, Task } from "./model";
import { Request, Response } from "express";
import ResponseMessage from "../../@utils/response";
import { Project } from "../project/model";
import APIError from "../../@utils/errors";

class TaskController extends BaseController<ITask> {
  constructor() {
    super(Task);
  }
  public createTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { title, description, assignedTo, startDate, endDate, status } =
        req.body;
      const project = await Project.findById(id);
      if (!project) {
        new ResponseMessage("Proje bulunamadı!").error404(res);
        return;
      }

      const newTask = new Task({
        title,
        description,
        assignedTo,
        startDate,
        endDate,
        status,
      });
      await project.save();

      project.tasks.push(newTask._id as any);
      await project.save();
      new ResponseMessage(
        newTask,
        "Görev başarıyla oluşturuldu ve projeye eklendi!"
      ).success(res);
    } catch (error) {
        console.log(error);
        throw new APIError("Görev oluşturulken bir hata oluştu!")
        
    }
  };
}

const taskController = new TaskController();

export { taskController };