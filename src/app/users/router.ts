import express, {Request, Response} from "express";
import me from "./controller";
const router = express.Router()
import JWt from "../../middlewares/auth";

router.get("/me",JWt.tokenCheck ,me)

export default router