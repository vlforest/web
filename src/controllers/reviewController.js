import db from "../models";

// Thêm đánh giá
export const addReview = async (userId, productId, rating, comment) => {
  try {
    const review = await db.Review.create({
      userId,
      productId,
      rating,
      comment,
    });
    return review;
  } catch (error) {
    throw new Error(
      `An error occurred while adding the review: ${error.message}`
    );
  }
};

// Lấy danh sách đánh giá của sản phẩm
export const getProductReviews = async (productId) => {
  try {
    const reviews = await db.Review.findAll({
      where: { productId },
      include: [db.User],
    });
    return reviews;
  } catch (error) {
    throw new Error(
      `An error occurred while fetching the reviews: ${error.message}`
    );
  }
};

// Cập nhật đánh giá
export const updateReview = async (userId, reviewId, rating, comment) => {
  try {
    const review = await db.Review.findOne({ where: { id: reviewId, userId } });

    if (!review) {
      throw new Error("Review not found.");
    }

    review.rating = rating;
    review.comment = comment;
    await review.save();

    return review;
  } catch (error) {
    throw new Error(
      `An error occurred while updating the review: ${error.message}`
    );
  }
};

// Xóa đánh giá
export const deleteReview = async (userId, reviewId) => {
  try {
    const review = await db.Review.findOne({ where: { id: reviewId, userId } });

    if (!review) {
      throw new Error("Review not found.");
    }

    await review.destroy();

    return { message: "Review deleted successfully." };
  } catch (error) {
    throw new Error(
      `An error occurred while deleting the review: ${error.message}`
    );
  }
};
