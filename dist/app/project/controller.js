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
exports.projectController = void 0;
const baseController_1 = __importDefault(require("../../@base/baseController"));
const errors_1 = __importDefault(require("../../@utils/errors"));
const response_1 = __importDefault(require("../../@utils/response"));
const model_1 = __importDefault(require("../users/model"));
const model_2 = require("./model");
class ProjectController extends baseController_1.default {
    constructor() {
        super(model_2.Project);
        this.assignEngineer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { userId } = req.body;
                const project = yield this.model.findById(id);
                if (!project)
                    new response_1.default("Proje bulunamadı!").error404(res);
                const user = (yield model_1.default.findById(userId));
                if (!user || user.role !== "engineer") {
                    new response_1.default("Geçersiz mühendis ID!").error400(res);
                    return;
                }
                if (project === null || project === void 0 ? void 0 : project.teamMembers.includes(userId)) {
                    new response_1.default("Mühendis zaten projeye atanmış").error400(res);
                    return;
                }
                project === null || project === void 0 ? void 0 : project.teamMembers.push(userId);
                new response_1.default("Mühendis projeye atandı").success(res);
                yield (project === null || project === void 0 ? void 0 : project.save());
            }
            catch (error) {
                console.log(error);
                throw new errors_1.default("Mühendis atama işleminde bir hata oluştu!");
            }
        });
        this.removeMember = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { userId } = req.body;
                const project = yield this.model.findById(id);
                if (!project) {
                    new response_1.default("Proje bulunamadı!").error404(res);
                    return;
                }
                project.teamMembers = project.teamMembers.filter((member) => member.toString() !== userId);
                yield project.save();
                new response_1.default("Mühendis projeden çıkarıldı!").success(res);
            }
            catch (error) {
                console.log(error);
                throw new errors_1.default("Mühendis silme işleminde bir hata oluştu!");
            }
        });
    }
}
const projectController = new ProjectController();
exports.projectController = projectController;
