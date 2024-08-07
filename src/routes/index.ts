import express from "express"
import authRouter from "../app/auth/router"
import userRouter from "../app/users/router"
import projectRouter from "../app/project/router"
import taskRouter from "../app/tasks/router"
import noticeRouter from "../app/notificaiton/router"

const router = express.Router()

router.use(authRouter)
router.use(userRouter)
router.use(projectRouter)
router.use(taskRouter)
router.use(noticeRouter)

export default router