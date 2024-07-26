import express, {Request, Response} from "express";
import  { userController } from "./controller";
const router = express.Router()
import JWt from "../../middlewares/auth";

router.get("/me",JWt.tokenCheck ,userController.me)
router.get("/users",userController.getAll)
router.get("/users/:id",userController.getById)
router.delete("/users/:id",userController.delete)
router.put("/users/:id",userController.update)

export default router