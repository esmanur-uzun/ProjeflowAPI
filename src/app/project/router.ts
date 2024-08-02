import express from "express"
import { projectController } from "./controller"
const router = express.Router()

router.post("/projects",projectController.create)
router.get("/projects",projectController.getAll)
router.get("/projects/:id",projectController.getById)
router.put("/projects/:id",projectController.update)
router.delete("/projects/:id",projectController.delete)
router.post("/projects/assign-user/:id",projectController.assignEngineer)
router.delete("/projects/assign-user/:id",projectController.removeMember)

export default router