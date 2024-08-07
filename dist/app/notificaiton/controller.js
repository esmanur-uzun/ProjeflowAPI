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
exports.notificationController = void 0;
const baseController_1 = __importDefault(require("../../@base/baseController"));
const errors_1 = __importDefault(require("../../@utils/errors"));
const response_1 = __importDefault(require("../../@utils/response"));
const model_1 = require("./model");
class NotificationController extends baseController_1.default {
    constructor() {
        super(model_1.Notification);
        this.getNotificationsForUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                yield model_1.Notification.find({ user: userId }).sort({ createdAt: -1, });
                new response_1.default("Bildirimler başarıyla alındı!").success(res);
            }
            catch (error) {
                console.log(error);
                throw new errors_1.default("Bildirim alınırken bir hata oluştu!");
            }
        });
    }
}
const notificationController = new NotificationController();
exports.notificationController = notificationController;
