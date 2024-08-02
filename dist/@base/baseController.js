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
const response_1 = __importDefault(require("../@utils/response"));
const errors_1 = __importDefault(require("../@utils/errors"));
class BaseController {
    constructor(model) {
        // create a data
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const document = new this.model(req.body);
                yield document.save();
                new response_1.default("İşlem başarılı").created(res);
            }
            catch (error) {
                console.log(error);
                throw new errors_1.default("Veriler eklenirken bir hata oluştu!");
            }
        });
        // get all data
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const documents = yield this.model.find();
                new response_1.default(documents, "Veriler başarıyla alındı").success(res);
            }
            catch (error) {
                throw new errors_1.default("Veriler alınırken bir hata oluştu!");
            }
        });
        // get data by id
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const document = yield this.model.findById(req.params.id);
                if (!document)
                    new response_1.default("Veri bulunamadı!").error404(res);
                else
                    new response_1.default(document, "Veriler başarıyla alındı").success(res);
            }
            catch (error) {
                throw new errors_1.default("Veri alınırken bir hata oluştu!");
            }
        });
        // delete a data
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const document = yield this.model.findByIdAndDelete(req.params.id);
                if (!document)
                    new response_1.default("Veri bulunamadı!").error404(res);
                else
                    new response_1.default("Veri başarıyla silindi").success(res);
            }
            catch (error) {
                throw new errors_1.default("Veri silinirken bir hata oluştu!");
            }
        });
        // update a data
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const document = yield this.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!document)
                    new response_1.default("Veri bulunumadı").error404(res);
                else
                    new response_1.default("Veri başarıyla güncellendi").success(res);
            }
            catch (error) {
                throw new errors_1.default("Veri güncelleme işleminde bir hata oluştu!");
            }
        });
        this.model = model;
    }
}
exports.default = BaseController;
