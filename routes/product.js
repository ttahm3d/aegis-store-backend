import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getProducts);
router.post("/products", addProduct);
router.get("/products/:id", getProductById);

export default router;
