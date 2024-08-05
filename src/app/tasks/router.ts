import express from "express"
import { taskController } from "./controller"

const router = express.Router()

router.post("/tasks",taskController.createTask)

export default router