import express from "express"
import authRouter from "../app/auth/router"
import userRouter from "../app/users/router"

const router = express.Router()

router.use(authRouter)
router.use(userRouter)

export default router