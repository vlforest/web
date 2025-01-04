import db from "../models";

// Tạo mới một hình ảnh sản phẩm
let createProductImage = async (data) => {
  try {
    const productImage = await db.ProductImage.create(data);
    return productImage;
  } catch (error) {
    throw error;
  }
};

// Lấy thông tin hình ảnh sản phẩm theo ID
let getProductImageById = async (id) => {
  try {
    const productImage = await db.ProductImage.findByPk(id);
    if (!productImage) {
      throw new Error("Product Image not found");
    }
    return productImage;
  } catch (error) {
    throw error;
  }
};

// Lấy tất cả các hình ảnh của một sản phẩm
let getAllProductImages = async (productId) => {
  try {
    const productImages = await db.ProductImage.findAll({
      where: { product_id: productId },
    });
    return productImages;
  } catch (error) {
    throw error;
  }
};

// Cập nhật hình ảnh sản phẩm
let updateProductImage = async (id, data) => {
  try {
    const productImage = await db.ProductImage.findByPk(id);
    if (!productImage) {
      throw new Error("Product Image not found");
    }
    await productImage.update(data);
    return productImage;
  } catch (error) {
    throw error;
  }
};

// Xóa hình ảnh sản phẩm
let deleteProductImage = async (id) => {
  try {
    const productImage = await db.ProductImage.findByPk(id);
    if (!productImage) {
      throw new Error("Product Image not found");
    }
    await productImage.destroy();
    return productImage;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProductImage,
  getProductImageById,
  getAllProductImages,
  updateProductImage,
  deleteProductImage,
};
