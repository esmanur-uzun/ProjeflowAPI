"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("../app/auth/router"));
const router_2 = __importDefault(require("../app/users/router"));
const router_3 = __importDefault(require("../app/project/router"));
const router = express_1.default.Router();
router.use(router_1.default);
router.use(router_2.default);
router.use(router_3.default);
exports.default = router;
