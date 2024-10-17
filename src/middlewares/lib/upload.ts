import multer,{FileFilterCallback} from "multer";
import path from 'path';
import fs from 'fs'; 
import { Request,Response,  } from "express";

const fileFilter = (req:Request,file: Express.Multer.File,cb:FileFilterCallback) =>{
    const allowedMimeTypes = ["image/jpg","image/png","image/jpeg","image/svg"]

    if(!allowedMimeTypes.includes(file.mimetype)){
        cb(null,false)
    }
    cb(null,true)
}

const storage = multer.diskStorage({
    destination: function(req:Request,file:Express.Multer.File,callback:(error: Error | null, destination: string) => void){
        const rootDir = path.dirname(require.main?.filename || "")
        const uploadPath = path.join(rootDir, "public/uploads/config");
        fs.mkdirSync(uploadPath,{recursive:true})
        callback(null,uploadPath)
    },
    filename: function(req:Request,file:Express.Multer.File,callback:(error: Error | null, filename: string) => void){
        const extension = file.mimetype.split("/")[1]

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()  * 1E9)

        let url = `image_${uniqueSuffix}.${extension}`

        callback(null,url)
    } 
})

const upload = multer({storage,fileFilter}).single('file')
export default upload