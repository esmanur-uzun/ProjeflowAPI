import { Request,Response } from "express";
import { Model,Document } from "mongoose";
import ResponseMessage from "../@utils/response";
import APIError from "../@utils/errors";

class BaseController <T extends Document>{
    private model : Model<T>

    constructor (model:Model<T>){
        this.model = model
    }

    // get all document
    public getAll = async (req:Request,res:Response) : Promise<void> =>{
        try {
            const documents = await this.model.find()
            new ResponseMessage(documents,"Veriler başarıyla alındı").success(res)
        } catch (error) {
            throw new APIError("Veriler alınırken bir hata oluştu!")
        }
    }

    // get document by id

    public getById = async (req:Request,res:Response): Promise<void> =>{
        try {
            const document = await this.model.findById(req.params.id)

            if(!document) new ResponseMessage("Veri bulunamadı!").error404(res)
            else new ResponseMessage(document,"Veriler başarıyla alındı").success(res)

        } catch (error) {
            throw new APIError("Veri alınırken bir hata oluştu!")
        }
    }

    // delete a document

    public delete = async(req:Request,res:Response) : Promise<void> =>{
        try {
            const document = this.model.findByIdAndDelete(req.params.id)

            if(!document) new ResponseMessage("Veri bulunamadı!").error404(res)
            else new ResponseMessage("Veri başarıyla silindi").success(res)
        } catch (error) {
            console.log(error);
            
            throw new APIError("Veri silinirken bir hata oluştu!")
        }
    }
}

export default BaseController