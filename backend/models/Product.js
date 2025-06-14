import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  stocks: { type: Number, required: true }
});

const Product = mongoose.model("Product", productSchema);
export default Product;
