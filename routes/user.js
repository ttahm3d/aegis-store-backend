import express from "express";
import { signup } from "../controllers/userController.js";

const router = express.Router();

router.post("/auth/signup", signup);
// router.get("/auth/signup", () => {});

export default router;
