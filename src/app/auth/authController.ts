import express, {Request, Response} from "express";

export const login = async (req:Request,res: Response) =>{
    console.log(req.body);
    return res.json(req.body)
}

export const register = async (req:Request,res: Response) =>{
    console.log(req.body);
}

