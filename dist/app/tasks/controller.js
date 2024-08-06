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
exports.taskController = void 0;
const baseController_1 = __importDefault(require("../../@base/baseController"));
const model_1 = require("./model");
const response_1 = __importDefault(require("../../@utils/response"));
const model_2 = require("../project/model");
const errors_1 = __importDefault(require("../../@utils/errors"));
class TaskController extends baseController_1.default {
    constructor() {
        super(model_1.Task);
        this.createTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { title, description, assignedTo, startDate, endDate, status } = req.body;
                const project = yield model_2.Project.findById(id);
                if (!project) {
                    new response_1.default("Proje bulunamadı!").error404(res);
                    return;
                }
                const newTask = new model_1.Task({
                    title,
                    description,
                    assignedTo,
                    startDate,
                    endDate,
                    status,
                });
                yield newTask.save();
                project.tasks.push(newTask._id);
                yield project.save();
                new response_1.default(newTask, "Görev başarıyla oluşturuldu ve projeye eklendi!").success(res);
            }
            catch (error) {
                console.log(error);
                throw new errors_1.default("Görev oluşturulken bir hata oluştu!");
            }
        });
        this.getAllTasks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId } = req.params;
                const project = yield model_2.Project.findById(projectId).populate("tasks");
                if (!project) {
                    new response_1.default("Proje bulunamadı!").error404(res);
                    return;
                }
                if (!project.tasks || project.tasks.length === 0) {
                    new response_1.default("Bu proje için henüz görev bulunmamaktadır!").success(res);
                    return;
                }
                new response_1.default(project.tasks, "Görevler başarıyla getirildi!").success(res);
            }
            catch (error) {
                console.log(error);
                throw new errors_1.default("Görevler getirilirken bir hata oluştu!");
            }
        });
    }
}
const taskController = new TaskController();
exports.taskController = taskController;
