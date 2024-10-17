import BaseController from "../../@base/baseController";
import { Request, Response } from "express";
import { Config, IConfig } from "./model";
import ResponseMessage from "../../@utils/response";
import APIError from "../../@utils/errors";
import upload from "../../middlewares/lib/upload";

class ConfigController extends BaseController<IConfig> {
  constructor() {
    super(Config);
  }

  public createMenuData = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      upload(req, res, async function (err) {
        if (err) {
          throw new APIError("Dosya yükleme hatası!");
          return;
        }

        const { title } = req.body;
        const icon = req.file ? `/uploads/config/${req.file.filename}` : "";

        let config = await Config.findOne({});

        if (!config) {
          config = new Config({
            menu: [],
          });
        }

        config.menu.push({ title, icon });

        await config.save();

        new ResponseMessage("Menü başarıyla eklendi.").success(res);
      });
    } catch (error) {
      console.log(error);
      throw new APIError("Menü listesine ekleme işelminde bir hata oluştu!");
    }
  };
}

const configController = new ConfigController();

export { configController };
