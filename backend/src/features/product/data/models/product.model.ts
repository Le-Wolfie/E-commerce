import mongoose, { Document, Schema } from "mongoose";

// Define the IProduct interface extending Document
interface IProduct extends Document {
  code: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

// Create the ProductSchema
const ProductSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create and export the Product model
const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export { IProduct, ProductModel };
