import db from "../models";

// Tạo mới một sản phẩm
let createProduct = async (data) => {
  try {
    const product = await db.Product.create(data);
    return product;
  } catch (error) {
    throw error;
  }
};

// Lấy thông tin sản phẩm theo ID
let getProductById = async (id) => {
  try {
    const product = await db.Product.findByPk(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw error;
  }
};

// Lấy tất cả các sản phẩm
let getAllProducts = async () => {
  try {
    const products = await db.Product.findAll();
    return products;
  } catch (error) {
    throw error;
  }
};

// Lấy tất cả các sản phẩm theo danh mục con
let getProductsBySubcategory = async (subcategoryId) => {
  try {
    const products = await db.Product.findAll({
      where: { subcategory_id: subcategoryId },
    });
    return products;
  } catch (error) {
    throw error;
  }
};

// Cập nhật sản phẩm
let updateProduct = async (id, data) => {
  try {
    const product = await db.Product.findByPk(id);
    if (!product) {
      throw new Error("Product not found");
    }
    await product.update(data);
    return product;
  } catch (error) {
    throw error;
  }
};

// Xóa sản phẩm
let deleteProduct = async (id) => {
  try {
    const product = await db.Product.findByPk(id);
    if (!product) {
      throw new Error("Product not found");
    }
    await product.destroy();
    return product;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsBySubcategory,
};
