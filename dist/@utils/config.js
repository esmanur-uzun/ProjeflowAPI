"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT,
    database_url: process.env.DB_URL,
    jwt_access_secret: process.env.JWT_SECRET_KEY,
    jwt_expires_in: process.env.JWT_EXPIRES_IN
};
