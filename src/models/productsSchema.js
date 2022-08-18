import mongoose from "mongoose";

export const ProductsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  stock: { type: Number, default: 0 },
});
