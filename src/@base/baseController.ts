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
            throw new APIError("Veriler alınırken bir hata oluştu")
        }
    }
}

export default BaseController