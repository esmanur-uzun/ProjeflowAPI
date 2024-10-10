import BaseController from "../../@base/baseController";
import { Request, Response } from "express";

// import APIError from "../../@utils/errors";
// import ResponseMessage from "../../@utils/response";
import { Config, IConfig } from "./model";
import ResponseMessage from "../../@utils/response";
import APIError from "../../@utils/errors";

class ConfigController extends BaseController<IConfig>{
    constructor(){
        super(Config)
    }
    
    public createMenuData = async (req:Request,res:Response) : Promise<void> =>{
        try {
            const {title,icon} = req.body
            const validExtensions = ['.svg', '.png', '.jpg', '.jpeg'];
            const extension = icon.slice(icon.lastIndexOf('.'));

            if (!validExtensions.includes(extension)) {
                new ResponseMessage ("Geçersiz icon formatı! Sadece SVG, PNG, JPG ve JPEG formatına izin verilir. ").error400(res)
                return 
            }
            const configs = await Config.findOne({});
            if (!configs) {
                const newConfig = new Config({
                    menu: [{ title, icon}],
                });
                await newConfig.save();
                // configs.menu.push({ title, icon });
                // await configs.save(); 
                // new ResponseMessage("Menü listesine eklendi").success(res)
            }else{
                configs.menu.push({ title, icon });

                await configs.save();
            }
       

        } catch (error) {
            console.log(error);
            throw new APIError("Menü listesine ekleme işelminde bir hata oluştu!")
            
        }
        
    }
}

const configController = new ConfigController

export {configController}