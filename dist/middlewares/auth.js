"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../@utils/config");
const JWt = {
    createToken(user, res) {
        const secretKey = config_1.config.jwt_access_secret;
        const token = jsonwebtoken_1.default.sign({ userName: user }, secretKey, {
            algorithm: "HS512",
            expiresIn: config_1.config.jwt_expires_in
        });
        return res.status(201).json({
            success: true,
            token,
            message: "Giriş başarılı"
        });
    }
};
exports.default = JWt;
