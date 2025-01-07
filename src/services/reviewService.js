import db from "../models/";

//  Thêm đánh giá

let addReview = async (userID, productID, rating, comments) => {
  try {
    const review = await db.Review.create({
      userID,
      productID,
      rating,
      comments,
    });
    return review;
  } catch (error) {
    throw new Error(
      `An error occurred while creating a review: ${error.message}`
    );
  }
};

//  Lấy danh sách đánh giá của một sản phẩm

let getProductReviews = async (productID) => {
  try {
    const reviews = await db.Review.findAll({
      where: { productID },
      include: [db.user],
    });
    return reviews;
  } catch (error) {
    throw new Error(
      `An error occurred while fetching reviews: ${error.message}`
    );
  }
};

//  Cập nhật đánh giá

let updateReview = async (userId, reviewID, rating, comments) => {
  try {
    const review = await db.Review.findByPk({
      where: { id: reviewID, userId },
    });
    if (!review) {
      throw new Error("Review not found");
    }
    review.rating = rating;
    review.comments = comments;
    await review.save();
    return review;
  } catch (error) {
    throw new Error(
      `An error occurred while updating review: ${error.message}`
    );
  }
};

//  Xóa đánh giá

let deleteReview = async (userId, reviewID) => {
  try {
    const review = await db.Review.findByPk({
      where: { id: reviewID, userId },
    });
    if (!review) {
      throw new Error("Review not found");
    }
    await review.destroy();
    return review;
  } catch (error) {
    throw new Error(
      `An error occurred while deleting review: ${error.message}`
    );
  }
};

export default {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
};
