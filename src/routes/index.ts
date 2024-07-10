import express from "express"
import authRouter from "../app/auth/router"

const router = express.Router()

router.use(authRouter)

export default router