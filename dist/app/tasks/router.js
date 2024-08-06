"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.post("/tasks/:id", controller_1.taskController.createTask);
router.get("/projects/:projectId/tasks", controller_1.taskController.getAllTasks);
router.get("/tasks/:id", controller_1.taskController.getById);
router.delete("/tasks/:id", controller_1.taskController.delete);
router.put("/tasks/:id", controller_1.taskController.update);
exports.default = router;
