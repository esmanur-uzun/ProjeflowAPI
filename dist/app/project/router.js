"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.post("/projects", controller_1.projectController.create);
router.get("/projects", controller_1.projectController.getAll);
router.get("/projects/:id", controller_1.projectController.getById);
router.put("/projects/:id", controller_1.projectController.update);
router.delete("/projects/:id", controller_1.projectController.delete);
router.post("/projects/assign-user/:id", controller_1.projectController.assignEngineer);
router.delete("/projects/assign-user/:id", controller_1.projectController.removeMember);
exports.default = router;
