import z from "zod"
import APIError from "../../@utils/errors"
import { Request,Response,NextFunction } from "express"

class authValidation{
    constructor(){}
    static register = async(req:Request,res:Response,next:NextFunction) =>{
        try {
            z.object({
                name: z.string({
                    required_error: "İsim alanı boş geçilemez !",
                    invalid_type_error: "İsim alanı yalnızca alfabetik karakterler içermelidir !"
                })
                .trim()
                .max(30,"İsim alanı en fazla 30 karakterden oluşabilir !")
                .min(3,"İsim alanı en az 3 karakter içermelidir !"),
                lastName : z.string({
                    required_error: "Soyisim alanı boş geçilemez !",
                    invalid_type_error: "Soyisim alanı yalnızca alfabetik karakterler içermelidir !"
                })
                .trim()
                .min(2,"Soyisim alanı en az 3 karakter içermelidir !")
                .max(30,"Soyisim alanı en fazla 30 karakterden oluşabilir !")
            })
        } catch (error) {
            
        }
    }
}