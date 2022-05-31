import express from "express";
const router = express.Router();
import { addProduct, getProducts } from "../controllers/product.js";

router.get("/products", getProducts);

router.post("/products", addProduct);

export default router;
