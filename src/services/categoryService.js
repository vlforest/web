import db from "../models";

//Tạo danh mục mới
let createCategory = async (data) => {
  try {
    const category = await db.Category.create(data);
    return category;
  } catch (error) {
    throw error;
  }
};
//Lấy danh mục theo ID

let getCategoryById = async (id) => {
  try {
    const category = await db.Category.findByPk(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  } catch (error) {
    throw error;
  }
};

//Lấy tất cả danh mục
let getAllCategories = async () => {
  try {
    const categories = await db.Category.findAll();
    return categories;
  } catch (error) {
    throw error;
  }
};

//Cập nhật danh mục
let updateCategory = async (id, data) => {
  try {
    const category = await db.Category.findByPk(id);
    if (!category) {
      throw new Error("Category not found");
    }
    await category.update(data);
    return category;
  } catch (error) {
    throw error;
  }
};

//Xóa danh mục
let deleteCategory = async (id) => {
  try {
    const category = await db.Category.findByPk(id);
    if (!category) {
      throw new Error("Category not found");
    }
    await category.destroy();
    return true;
  } catch (error) {
    throw error;
  }
};

export default {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
