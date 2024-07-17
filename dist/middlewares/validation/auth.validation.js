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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const errors_1 = __importDefault(require("../../@utils/errors"));
const userValidationSchema = zod_1.default.object({
    name: zod_1.default.string({
        required_error: "İsim alanı boş geçilemez!",
        invalid_type_error: "İsim alanı yalnızca alfabetik karakterler içermelidir!"
    })
        .trim()
        .max(30, "İsim alanı en fazla 30 karakterden oluşabilir!")
        .min(3, "İsim alanı en az 3 karakter içermelidir!"),
    lastName: zod_1.default.string({
        required_error: "Soyisim alanı boş geçilemez!",
        invalid_type_error: "Soyisim alanı yalnızca alfabetik karakterler içermelidir!"
    })
        .trim()
        .min(2, "Soyisim alanı en az 2 karakter içermelidir!")
        .max(30, "Soyisim alanı en fazla 30 karakterden oluşabilir!"),
    email: zod_1.default.string({
        required_error: "Email alanı boş geçilemez!",
        invalid_type_error: "Geçersiz email formatı!"
    })
        .email("Geçersiz email formatı!"),
    password: zod_1.default.string({
        required_error: "Şifre alanı boş geçilemez!",
        invalid_type_error: "Şifre alanı yalnızca karakterler içermelidir!"
    })
        .min(6, "Şifre en az 6 karakterden oluşmalıdır!")
        .max(10, "Şifre en fazla 10 karakter içerebilir!"),
    role: zod_1.default.enum(["engineer", "R&D manager", "admin"], {
        errorMap: () => ({ message: "Role must be either 'engineer', 'admin', or 'R&D manager'" })
    }),
    phoneNumber: zod_1.default.string({
        required_error: "Telefon numarası alanı boş geçilemez!",
        invalid_type_error: "Telefon numarası yalnızca karakterler içermelidir!"
    })
        .min(10, "Telefon numarası en az 10 karakterden oluşmalıdır!"),
    department: zod_1.default.string({
        required_error: "Departman alanı boş geçilemez!",
    }),
    profilePhoto: zod_1.default.string().optional(),
    startingDate: zod_1.default.date().optional()
});
class authValidation {
    constructor() { }
}
_a = authValidation;
authValidation.register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userValidationSchema.parseAsync(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            const formattedErrors = error.errors.map(err => err.message).join(", ");
            next(new errors_1.default(formattedErrors, 400));
        }
        else {
            next(error);
        }
    }
});
exports.default = authValidation;
