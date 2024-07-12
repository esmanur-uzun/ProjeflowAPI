import APIError from "../@utils/errors";
import {Request,Response,NextFunction, ErrorRequestHandler} from "express"

const errorHandlerMiddleware = (err : Error,req :Request,res :Response,next : NextFunction) => {
    if(err instanceof APIError){
        return res.status(err.statusCode || 400)
        .json({
            success : false,
            message : err.message
        })
    }
    return res.status(500).json({
        success : false,
        message:"API'de bir hata oluştu. Lütfen daha sonra tekrar deneyin."
    })

}

export default errorHandlerMiddleware