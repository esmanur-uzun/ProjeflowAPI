"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("./authController");
const router = express_1.default.Router();
const auth_validation_1 = __importDefault(require("../../middlewares/validation/auth.validation"));
router.post("/login", auth_validation_1.default.login, authController_1.login);
router.post("/register", auth_validation_1.default.register, authController_1.register);
exports.default = router;
