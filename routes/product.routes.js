import express from "express";
const router = express.Router();
import { addProduct, getProducts } from "../controllers/product.controller.js";

router.get("/products", getProducts);

router.post("/products", addProduct);

export default router;
