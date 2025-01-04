import productService from "../services/productService";

// Tạo mới sản phẩm
let createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy thông tin sản phẩm theo ID
let getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Lấy tất cả các sản phẩm
let getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy tất cả các sản phẩm theo danh mục con
let getProductsBySubcategory = async (req, res) => {
  try {
    const products = await productService.getProductsBySubcategory(
      req.params.subcategoryId
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Cập nhật sản phẩm
let updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Xóa sản phẩm
let deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
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
