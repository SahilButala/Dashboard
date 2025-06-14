import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/ProductController.js";

const ProductRouter = express.Router();

ProductRouter.post("/", createProduct);
ProductRouter.get("/all", getAllProducts);
ProductRouter.get("/:id", getProductById);
ProductRouter.put("/:id", updateProduct);
ProductRouter.delete("/:id", deleteProduct);

export default ProductRouter;
