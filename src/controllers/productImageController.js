import productImageService from "../services/productImageService";

// Tạo mới hình ảnh sản phẩm
let createProductImage = async (req, res) => {
  try {
    const productImage = await productImageService.createProductImage(req.body);
    res.status(201).json(productImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy thông tin hình ảnh sản phẩm theo ID
let getProductImageById = async (req, res) => {
  try {
    const productImage = await productImageService.getProductImageById(
      req.params.id
    );
    res.status(200).json(productImage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Lấy tất cả các hình ảnh của một sản phẩm
let getAllProductImages = async (req, res) => {
  try {
    const productImages = await productImageService.getAllProductImages(
      req.params.productId
    );
    res.status(200).json(productImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật hình ảnh sản phẩm
let updateProductImage = async (req, res) => {
  try {
    const productImage = await productImageService.updateProductImage(
      req.params.id,
      req.body
    );
    res.status(200).json(productImage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Xóa hình ảnh sản phẩm
let deleteProductImage = async (req, res) => {
  try {
    await productImageService.deleteProductImage(req.params.id);
    res.status(200).json({ message: "Product Image deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createProductImage,
  getProductImageById,
  getAllProductImages,
  updateProductImage,
  deleteProductImage,
};
