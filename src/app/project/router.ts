import express from "express"
import { projectController } from "./controller"
const router = express.Router()

router.post("/projects",projectController.create)
router.get("/projects",projectController.getAll)

export default router