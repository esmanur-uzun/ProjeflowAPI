import express, {Request, Response} from "express";
import User from "../users/model";
import bcrypt from "bcrypt"
import APIError from "../../@utils/errors";

export const login = async (req:Request,res: Response) =>{
    console.log(req.body);
    return res.json(req.body)
}

export const register = async (req:Request,res: Response) =>{
    const {name, lastName} = req.body
    const userName = `${name.toLowerCase()}${lastName.toLowerCase()}`
    
    const userCheck = await User.findOne({userName})

    if(userCheck){
        throw new APIError("Kullanıcı zaten mevcut",401)
    }

    req.body.password = await bcrypt.hash(req.body.password,10)

    try {
        const userSave =  new User(Object.assign({}, req.body, { userName}))

        await userSave.save().then((response) =>{
            return res.status(201).json({ success : true,data: response,message: "User registered successfully" });
        })
        .catch((err)=>{
            console.log(err);
            
        })
    } catch (error) {
        console.log(error);
        
    }
    

    
    
}

