/**
 * Import
 */
import { Schema } from "mongoose";
import mongoose from "mongoose";
import { IProduct } from "../interfaces/IModel";

/**
 * Product Schema
 */
const ProductSchema: Schema = new Schema<IProduct>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    categories: [{ type: String }],
    quantity: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

/**
 * Export
 */
export default mongoose.model<IProduct>("Product", ProductSchema);
