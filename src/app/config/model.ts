import mongoose, { Schema } from "mongoose";
import { IBaseModel } from "../../@base/baseModel";

export interface IMenu {
  title: string;
  icon: string;
}
export interface IConfig extends IBaseModel {
  menu: IMenu[];
}
const configSchemaFields = {
  menu: [
    {
      title: { type: String, required: true },
      icon: { type: String, required: false },
    },
  ],
};

const configSchema = new Schema<IConfig>(configSchemaFields, {
  
  timestamps: true,
  collection: "configs",
});

export const Config = mongoose.model<IConfig>("Config", configSchema);
