import express from "express";
import categoryController from "../controllers/categoryController";
import subcategoryController from "../controllers/subcategoryController";
import productController from "../controllers/productController";
import productImageController from "../controllers/productImageController";
import { auth, checkAdmin } from "../middlewares/auth";

let router = express.Router();

//////////Categories
router.post("/categories", auth, checkAdmin, categoryController.createCategory); // Tạo mới danh mục (yêu cầu quyền admin)
router.get("/categories/:id", categoryController.getCategoryById); // Lấy thông tin danh mục theo ID (không yêu cầu đăng nhập)
router.get("/categories", categoryController.getAllCategories); // Lấy tất cả các danh mục (không yêu cầu đăng nhập)
router.put(
  "/categories/:id",
  auth,
  checkAdmin,
  categoryController.updateCategory // Cập nhật danh mục (yêu cầu quyền admin)
);
router.delete(
  "/categories/:id",
  auth,
  checkAdmin,
  categoryController.deleteCategory // Xóa danh mục (yêu cầu quyền admin)
);

//////////SubCategories
router.post(
  "/subcategories",
  auth,
  checkAdmin,
  subcategoryController.createSubcategory // Tạo mới danh mục con (yêu cầu quyền admin)
);
router.get("/subcategories/:id", subcategoryController.getSubcategoryById); // Lấy thông tin danh mục con theo ID (không yêu cầu đăng nhập)
router.get("/subcategories", subcategoryController.getAllSubcategories); // Lấy tất cả các danh mục con (không yêu cầu đăng nhập)
router.get(
  "/categories/:categoryId/subcategories",
  subcategoryController.getSubcategoryByCategory // Lấy danh mục con theo danh mục chính (không yêu cầu đăng nhập)
);
router.put(
  "/subcategories/:id",
  auth,
  checkAdmin,
  subcategoryController.updateSubcategory // Cập nhật danh mục con (yêu cầu quyền admin)
);
router.delete(
  "/subcategories/:id",
  auth,
  checkAdmin,
  subcategoryController.deleteSubcategory // Xóa danh mục con (yêu cầu quyền admin)
);

//////////Products
router.get("/products/:id", productController.getProductById); // Lấy thông tin sản phẩm theo ID (không yêu cầu đăng nhập)
router.get("/products", productController.getAllProducts); // Lấy tất cả các sản phẩm (không yêu cầu đăng nhập)
router.get(
  "/subcategories/:subcategoryId/products",
  productController.getProductsBySubcategory
); // Lấy sản phẩm theo danh mục con (không yêu cầu đăng nhập)
router.post("/products", auth, checkAdmin, productController.createProduct); // Tạo mới sản phẩm (yêu cầu quyền admin)
router.put("/products/:id", auth, checkAdmin, productController.updateProduct); // Cập nhật sản phẩm (yêu cầu quyền admin)
router.delete(
  "/products/:id",
  auth,
  checkAdmin,
  productController.deleteProduct
); // Xóa sản phẩm (yêu cầu quyền admin)

////////////phần hình ánh sản phẩm

// Route không yêu cầu đăng nhập
router.get("/product-images/:id", productImageController.getProductImageById); // Lấy thông tin hình ảnh sản phẩm theo ID
router.get(
  "/products/:productId/images",
  productImageController.getAllProductImages
); // Lấy tất cả các hình ảnh của một sản phẩm

// Các route còn lại yêu cầu quyền admin
router.post(
  "/product-images",
  auth,
  checkAdmin,
  productImageController.createProductImage
); // Tạo mới hình ảnh sản phẩm
router.put(
  "/product-images/:id",
  auth,
  checkAdmin,
  productImageController.updateProductImage
); // Cập nhật hình ảnh sản phẩm
router.delete(
  "/product-images/:id",
  auth,
  checkAdmin,
  productImageController.deleteProductImage
); // Xóa hình ảnh sản phẩm

module.exports = router;
