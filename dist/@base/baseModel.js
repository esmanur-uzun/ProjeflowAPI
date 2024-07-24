"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const baseSchemaFields = {
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        auto: true,
    },
};
const baseSchemaOptions = {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
    _id: false,
};
const baseSchema = new mongoose_1.Schema(baseSchemaFields, baseSchemaOptions);
exports.default = baseSchema;
