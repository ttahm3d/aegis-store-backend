import express from "express";
const router = express.Router();
import {
  addCategory,
  getCategories,
} from "../controllers/categoryController.js";

router.get("/categories", getCategories);

router.post("/categories", addCategory);

export default router;
