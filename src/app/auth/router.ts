import express, {Request, Response} from "express";
import { login,register } from "./authController";
const router = express.Router()
import authValidation from "../../middlewares/validation/auth.validation"

router.post("/login",authValidation.login, login)
router.post("/register",authValidation.register, register)

export default router