import express from "express"
import authRouter from "../app/auth/router"
import userRouter from "../app/users/router"
import projectRouter from "../app/project/router"

const router = express.Router()

router.use(authRouter)
router.use(userRouter)
router.use(projectRouter)

export default router