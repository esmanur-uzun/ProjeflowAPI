import BaseController from "../../@base/baseController";
import APIError from "../../@utils/errors";
import ResponseMessage from "../../@utils/response";
import { INotification, Notification } from "./model";
import { Request, Response } from "express";

class NotificationController extends BaseController<INotification> {
  constructor() {
    super(Notification);
  }

  public getNotificationsForUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

       await Notification.find({ user: userId }).sort({createdAt: -1,});

      new ResponseMessage("Bildirimler başarıyla alındı!").success(res);
    } catch (error) {
        console.log(error);
        throw new APIError("Bildirim alınırken bir hata oluştu!")
        
    }
  };
}

const notificationController = new NotificationController();
export { notificationController };
