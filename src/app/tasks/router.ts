import express from "express";
import { taskController } from "./controller";

const router = express.Router();

router.post("/tasks/:id", taskController.createTask);
router.get("/projects/:projectId/tasks", taskController.getAllTasks); 
router.get("/tasks/:id", taskController.getById);
router.delete("/tasks/:id", taskController.delete);
router.put("/tasks/:id", taskController.update);

export default router;
