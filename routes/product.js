import express from "express";
const router = express.Router();
import {
  addProduct,
  getProducts,
  getProductById,
} from "../controllers/productController.js";

router.get("/products", getProducts);

router.post("/products", addProduct);

router.get("/products/:id", getProductById);

export default router;
