import mongoose, { Document, Schema } from 'mongoose';

export interface IBaseModel extends Document {
    createdAt: Date;
    updatedAt: Date;
}

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

const baseSchema = new Schema(baseSchemaFields, { _id: false });

export default baseSchema;
