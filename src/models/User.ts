/**
 * Import
 */
import { Schema } from "mongoose";
import mongoose from "mongoose";
import { IUser } from "../interfaces/IModel";

/**
 * User Schema
 */
const UserSchema: Schema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    role: { type: String, default: "user" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

/**
 * Export
 */
export default mongoose.model<IUser>("User", UserSchema);
