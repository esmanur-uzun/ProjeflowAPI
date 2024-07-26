import { Request,Response } from "express";
import { Model,Document } from "mongoose";
import ResponseMessage from "../@utils/response";
import APIError from "../@utils/errors";

class BaseController <T extends Document>{
    protected model : Model<T>

    constructor (model:Model<T>){
        this.model = model
    }

    // create a data
    public create = async (req:Request,res:Response) :Promise<void> =>{
        try {
            const document = new this.model(req.body)
            await document.save()
            new ResponseMessage("İşlem başarılı").created(res)
        } catch (error) {
            console.log(error);
            
            throw new APIError("Veriler eklenirken bir hata oluştu!")
        }
    }

    // get all data
    public getAll = async (req:Request,res:Response) : Promise<void> =>{
        try {
            const documents = await this.model.find()
            new ResponseMessage(documents,"Veriler başarıyla alındı").success(res)
        } catch (error) {
            throw new APIError("Veriler alınırken bir hata oluştu!")
        }
    }

    // get data by id

    public getById = async (req:Request,res:Response): Promise<void> =>{
        try {
            const document = await this.model.findById(req.params.id)

            if(!document) new ResponseMessage("Veri bulunamadı!").error404(res)
            else new ResponseMessage(document,"Veriler başarıyla alındı").success(res)

        } catch (error) {
            throw new APIError("Veri alınırken bir hata oluştu!")
        }
    }

    // delete a data

    public delete = async(req:Request,res:Response) : Promise<void> =>{
        try {
            const document = this.model.findByIdAndDelete(req.params.id)

            if(!document) new ResponseMessage("Veri bulunamadı!").error404(res)
            else new ResponseMessage("Veri başarıyla silindi").success(res)
        } catch (error) {
            
            throw new APIError("Veri silinirken bir hata oluştu!")
        }
    }

    // update a data
    public update = async(req:Request,res:Response) :Promise<void> =>{
        try {
            const document = await this.model.findByIdAndUpdate(req.params.id,req.body, {new :true})
            if(!document) new ResponseMessage("Veri bulunumadı").error404(res)
            else new ResponseMessage("Veri başarıyla güncellendi").success(res)
        } catch (error) {
            throw new APIError("Veri güncelleme işleminde bir hata oluştu!")
        }
    }
}

export default BaseController