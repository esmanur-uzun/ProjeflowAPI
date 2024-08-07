"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.post("/notification", controller_1.notificationController.create);
router.get("/notification/:userId", controller_1.notificationController.getNotificationsForUser);
router.delete("/notification/:id", controller_1.notificationController.delete);
exports.default = router;
