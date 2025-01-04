import db from "../models";

//Tạo mới danh mục con
let createSubcategory = async (data) => {
  try {
    const subcategory = await db.Subcategory.create(data);
    return subcategory;
  } catch (error) {
    throw error;
  }
};
//Lấy danh mục con theo id
let getSubcategoryById = async (id) => {
  try {
    const subcategory = await db.Subcategory.findByPk(id);
    if (!subcategory) {
      throw new Error("Subcategory not found");
    }
    return subcategory;
  } catch (error) {
    throw error;
  }
};

//Cập nhật danh mục con
let updateSubcategory = async (id, data) => {
  try {
    const subcategory = await db.Subcategory.findByPk(id);
    if (!subcategory) {
      throw new Error("Subcategory not found");
    }
    await subcategory.update(data);
    return subcategory;
  } catch (error) {
    throw error;
  }
};

//Xóa danh mục con
let deleteSubcategory = async (id) => {
  try {
    const subcategory = await db.Subcategory.findByPk(id);
    if (!subcategory) {
      throw new Error("Subcategory not found");
    }
    await subcategory.destroy();
    return true;
  } catch (error) {
    throw error;
  }
};

//Lấy danh sách danh mục con theo danh mục cha
let getSubcategoriesByCategory = async (categoryId) => {
  try {
    const subcategories = await db.Subcategory.findAll({
      where: {
        categoryId: categoryId,
      },
    });
    return subcategories;
  } catch (error) {
    throw error;
  }
};

//Lấy tất cả danh mục con
let getAllSubcategories = async () => {
  try {
    const subcategories = await db.Subcategory.findAll();
    return subcategories;
  } catch (error) {
    throw error;
  }
};

export default {
  createSubcategory,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
  getSubcategoriesByCategory,
  getAllSubcategories,
};
