import jwt from "jsonwebtoken"
import { Response } from "express";
import { config } from "../@utils/config";

const JWt = {
    createToken(user :{userName : string},res:Response){
        const secretKey = config.jwt_access_secret as string
                
        const token = jwt.sign({userName : user},secretKey,{
            algorithm:"HS512",
            expiresIn: config.jwt_expires_in
        })
       
        return res.status(201).json({
            success : true,
            token,
            message:"Giriş başarılı"
        })
    }
}

export default JWt