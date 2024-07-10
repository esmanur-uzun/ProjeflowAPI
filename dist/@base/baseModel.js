"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const baseSchemaFields = {
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true
    }
};
const baseSchema = new mongoose_1.Schema(baseSchemaFields, { _id: false });
exports.default = baseSchema;
