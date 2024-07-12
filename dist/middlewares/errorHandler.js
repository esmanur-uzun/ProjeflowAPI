"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = __importDefault(require("../@utils/errors"));
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof errors_1.default) {
        return res.status(err.statusCode || 400)
            .json({
            success: false,
            message: err.message
        });
    }
    return res.status(500).json({
        success: false,
        message: "API'de bir hata oluştu. Lütfen daha sonra tekrar deneyin."
    });
};
exports.default = errorHandlerMiddleware;
