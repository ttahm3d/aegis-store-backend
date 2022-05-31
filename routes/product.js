import express from "express";
const router = express.Router();
import {
  addProduct,
  getProducts,
  getProductById,
} from "../controllers/product.js";

router.get("/", getProducts);

router.post("/", addProduct);

router.get("/:id", getProductById);

export default router;
