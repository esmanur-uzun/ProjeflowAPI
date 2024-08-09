import mongoose, { Schema, ObjectId } from "mongoose";
import { IBaseModel } from "../../@base/baseModel";

export interface INotification extends IBaseModel {
  user: ObjectId;
  recipients: ObjectId[];
  subject: string;
  project?: ObjectId;
  task?: ObjectId;
  message: string;
  isRead: boolean;
}

const notificationSchemaFields = {
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  recipients: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  subject: { type: String, required: true },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
  task: { type: Schema.Types.ObjectId, ref: "Task" },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
};

const notificationSchema = new Schema<INotification>(notificationSchemaFields, {
  timestamps: true,
  collection: "notifications",
});

export const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);
