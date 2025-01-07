import express from "express";
import { auth } from "../middlewares/auth";
import {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController";

let router = express.Router();

router.post("/reviews", auth, addReview);
router.get("/reviews/:productId", getProductReviews);
router.put("/reviews", auth, updateReview);
router.delete("/reviews", auth, deleteReview);

module.exports = router;
