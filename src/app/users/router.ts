import express, {Request, Response} from "express";
import  { userController } from "./controller";
const router = express.Router()
import JWt from "../../middlewares/auth";

router.get("/me",JWt.tokenCheck ,userController.me)
router.get("/users",userController.getAll)

export default router