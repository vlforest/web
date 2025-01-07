import express from "express";
import { auth } from "../middlewares/auth";
import {
  createOrder,
  getOrders,
  getOrderDetails,
  updateOrderStatus,
} from "../controllers/orderController";

let router = express.Router();

router.post("/orders", auth, createOrder);
router.get("/orders", auth, getOrders);
router.get("/orders/:id", auth, getOrderDetails);
router.put("/orders/:id/status", auth, updateOrderStatus);

module.exports = router;
