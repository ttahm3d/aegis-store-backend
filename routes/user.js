import express from "express";
import { login, logout, signup } from "../controllers/userController.js";
import {
  addToWishlist,
  getWishlist,
} from "../controllers/wishlistController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.get("/auth/logout", logout);

router.post("/user/wishlist", isAuthenticated, addToWishlist);
router.get("/user/wishlist", isAuthenticated, getWishlist);

export default router;
