import mongoose, { Schema, ObjectId } from 'mongoose';
import { IBaseModel } from "../../@base/baseModel";

export interface ITask extends IBaseModel {
    title: string;
    description?: string;
    assignedTo?: ObjectId[]; 
    startDate?: Date;
    endDate?: Date;
    status: 'not started' | 'in progress' | 'completed';
}

const taskSchemaFields = {
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
    startDate: { type: Date },
    endDate: { type: Date },
    status: { type: String, enum: ['not started', 'in progress', 'completed'], required: true }
};

const taskSchema = new Schema<ITask>(taskSchemaFields, {
    timestamps: true,
    collection: 'tasks' 
});

export const Task = mongoose.model<ITask>('Task', taskSchema);
