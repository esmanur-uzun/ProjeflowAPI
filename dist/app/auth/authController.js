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
exports.register = exports.login = void 0;
const model_1 = __importDefault(require("../users/model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errors_1 = __importDefault(require("../../@utils/errors"));
const response_1 = __importDefault(require("../../@utils/response"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    const user = yield model_1.default.findOne({ userName });
    if (!user) {
        throw new errors_1.default("Kullanıcı adı ya da şifre hatalıdır!", 401);
    }
    const comparePassword = yield bcryptjs_1.default.compare(password, user.password);
    if (!comparePassword) {
        throw new errors_1.default("Kullanıcı adı ya da şifre hatalıdır!", 401);
    }
    auth_1.default.createToken({ userName: user.userName }, res);
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastName } = req.body;
    const userName = `${name.toLowerCase()}${lastName.toLowerCase()}`;
    const userCheck = yield model_1.default.findOne({ userName });
    if (userCheck) {
        throw new errors_1.default("Kullanıcı zaten mevcut", 401);
    }
    req.body.password = yield bcryptjs_1.default.hash(req.body.password, 10);
    const userSave = new model_1.default(Object.assign({}, req.body, { userName }));
    yield userSave
        .save()
        .then((data_res) => {
        return new response_1.default(data_res, "Kayıt Başarıyla Eklendi").created(res);
    })
        .catch((err) => {
        throw new errors_1.default("Kullanıcı Kayıt Edilemedi", 400);
    });
});
exports.register = register;
