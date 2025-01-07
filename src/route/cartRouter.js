import express from "express";
import { auth } from "../middlewares/auth";
import {
  addToCart,
  getCart,
  updateQuantity,
  removeItem,
} from "../controllers/cartController";

let router = express.Router();

router.post("/cart/add", auth, addToCart);
router.get("/cart", auth, getCart);
router.put("/cart/update", auth, updateQuantity);
router.delete("/cart/remove", auth, removeItem);

module.exports = router;
