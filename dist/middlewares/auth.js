"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../@utils/config");
const errors_1 = __importDefault(require("../@utils/errors"));
const model_1 = __importDefault(require("../app/users/model"));
const JWT = {
    createToken(user, res) {
        const secretKey = config_1.config.jwt_access_secret;
        const token = jsonwebtoken_1.default.sign({ userName: user.userName }, secretKey, {
            algorithm: "HS512",
            expiresIn: config_1.config.jwt_expires_in
        });
        return res.status(201).json({
            success: true,
            token,
            message: "Giriş başarılı"
        });
    },
    tokenCheck(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ");
            if (!headerToken) {
                throw new errors_1.default("Geçersiz oturum, lütfen giriş yapın!", 401);
            }
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token) {
                throw new errors_1.default("Token bulunamadı, lütfen giriş yapın!", 401);
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt_access_secret);
            if (decoded && typeof decoded === 'object' && 'userName' in decoded) {
                const userInfo = yield model_1.default.findOne({ userName: decoded.userName });
                console.log(userInfo);
                if (!userInfo) {
                    throw new errors_1.default("Kullanıcı bulunamadı!", 404);
                }
                req.user = userInfo;
            }
            next();
        });
    }
};
exports.default = JWT;
