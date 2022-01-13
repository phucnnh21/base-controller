/**
 * Import
 */
import { Schema } from "mongoose";
import mongoose from "mongoose";
import { IOrder } from "../interfaces/IModel";

/**
 * Order Schema
 */
const OrderSchema: Schema = new Schema<IOrder>({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    total: { type: Number, default: 0 },
    status: { type: String, default: "pending" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

/**
 * Export
 */
export default mongoose.model<IOrder>("Order", OrderSchema);
