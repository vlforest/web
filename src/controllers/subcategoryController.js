import subCategoryService from "../services/subcategoryService";

// Tạo mới danh mục con

let createSubcategory = async (req, res) => {
  try {
    const subcategory = await subCategoryService.createSubcategory(req.body);
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa danh mục con theo ID
let deleteSubcategory = async (req, res) => {
  try {
    const deletedSubcategory = await subCategoryService.deleteSubcategory(
      req.params.id
    );
    if (!deletedSubcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy tất cả danh mục con
let getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await subCategoryService.getAllSubcategories();
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh mục con theo ID
let getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await subCategoryService.getSubcategoryById(
      req.params.id
    );
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Cập nhật danh mục con
let updateSubcategory = async (req, res) => {
  try {
    const updatedSubcategory = await subCategoryService.updateSubcategory(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedSubcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Lấy danh mục con theo danh mục
let getSubcategoryByCategory = async (req, res) => {
  try {
    const subcategories = await subCategoryService.getSubcategoryByCategory(
      req.params.categoryId
    );
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createSubcategory,
  deleteSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  updateSubcategory,
  getSubcategoryByCategory,
};
