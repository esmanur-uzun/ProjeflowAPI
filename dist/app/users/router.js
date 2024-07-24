"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../../middlewares/auth"));
router.get("/me", auth_1.default.tokenCheck, controller_1.userController.me);
router.get("/users", controller_1.userController.getAll);
exports.default = router;
