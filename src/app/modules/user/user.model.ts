import { model, Schema } from "mongoose";
import { IAuthProvider, IsActive, iUser, Role } from "./user.interface";


const authProviderSchema = new Schema<IAuthProvider>(
    {
        provider: { type: String, required: true },
        providerId: { type: String, required: true }
    },
    {
        versionKey: false,
        _id: false
    })


// create user schema

const userSchema = new Schema<iUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        role: {
            type: String,
            enum: Object.values(Role),
            default: Role.User
        },
        phone: { type: String },
        picture: { type: String },
        address: { type: String },
        isDeleted: { type: Boolean, default: false },
        isActive: {
            type: String,
            enum: Object.values(IsActive),
            default: IsActive.Active
        },
        isVarified: { type: Boolean, defaul: false },
        auths: [authProviderSchema],

    },
    {
        timestamps: true,
        versionKey: false
    });



// create user model

export const User = model<iUser>("User", userSchema);