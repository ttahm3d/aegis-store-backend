import express from "express";
import {
  addItemToCart,
  decreaseItemQuantity,
  getCartItems,
  increaseItemQuantity,
  removeItemFromCart,
} from "../controllers/cartController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/user/cart", isAuthenticated, addItemToCart);
router.get("/user/cart", isAuthenticated, getCartItems);
router.post("/user/increaseQuantity", isAuthenticated, increaseItemQuantity);
router.post("/user/decreaseQuantity", isAuthenticated, decreaseItemQuantity);
router.delete("/user/cart/:productId", isAuthenticated, removeItemFromCart);

export default router;
