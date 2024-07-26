"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const projectSchemaFields = {
    title: { type: String, required: true },
    content: { type: String, required: true },
    creationDate: { type: Date, required: true, default: Date.now },
    startDate: { type: Date, required: true },
    terminDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ["planned", "in progress", "completed"],
        required: true,
    },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    teamMembers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    tasks: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Task" }],
    updateDate: { type: Date, default: null },
};
const projectSchema = new mongoose_1.Schema(projectSchemaFields, { collection: "project", timestamps: true });
exports.Project = mongoose_1.default.model("Project", projectSchema);
