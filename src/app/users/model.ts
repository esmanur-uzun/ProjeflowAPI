import mongoose, { Schema } from 'mongoose';
import { IBaseModel } from '../../@base/baseModel';

export interface IUser extends IBaseModel {
    name: string;
    lastName: string,
    userName: string,
    email: string;
    password: string;
    role: 'engineer' | 'R&D manager' | 'Admin';
    phoneNumber: string;
    department: string;
    profilePhoto?: string;
    startingDate?: Date;
}

const userSchemaFields = {
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Name is required"]
    },
    userName: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        default: 'engineer',
        enum: {
            values: ["engineer", "R&D manager", "admin"],
            message: "Role must be either 'engineer' , 'admin'  or 'R&D manager'"
        }
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone is required"],
        
    },
    department: {
        type: String,
        required: [true, "Department is required"]
    },
    profilePhoto: {
        type: String
    },
    startingDate: {
        type: Date,
        default: Date.now
    }
};

const userSchema = new Schema(userSchemaFields, { collection: "users", timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);

export default User;
