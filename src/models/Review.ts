/**
 * Import
 */
import { Schema } from "mongoose";
import mongoose from "mongoose";
import { IReview } from "../interfaces/IModel";

/**
 * Review Schema
 */
const ReviewSchema: Schema = new Schema<IReview>({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    content: { type: String, required: true },
    rating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

/**
 * Export
 */
export default mongoose.model<IReview>("Review", ReviewSchema);
