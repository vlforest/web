import express from "express";
import { auth } from "../middlewares/authMiddleware";
import {
  addToCart,
  viewCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cartController";

let router = express.Router();

router.post("/cart/add", auth, addToCart);
router.get("/cart", auth, viewCart);
router.put("/cart/update", auth, updateCartItem);
router.delete("/cart/remove", auth, removeCartItem);

module.exports = router;
