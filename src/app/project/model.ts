import mongoose, { Schema } from "mongoose";
import { IBaseModel } from "../../@base/baseModel";
import { ITask } from "../tasks/model"; // Bu import satırı aslında kullanılmıyor
import { IUser } from "../users/model";

export interface IProject extends IBaseModel {
  title: string;
  content: string;
  creationDate: Date;
  startDate: Date;
  terminDate: Date;
  status: "planned" | "in progress" | "completed";
  owner: string;
  teamMembers: IUser[];
  tasks: ITask[]; 
  updateDate: Date;
}

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
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  teamMembers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  updateDate: { type: Date, default: null },
};

const projectSchema = new Schema(projectSchemaFields, { collection: "project", timestamps: true });

export const Project = mongoose.model<IProject>("Project", projectSchema);
