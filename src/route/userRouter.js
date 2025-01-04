import express from "express";
import { body } from "express-validator";
import userController from "../controllers/userController";
import { auth, checkAdmin, checkId } from "../middlewares/auth";

let router = express.Router();

// Route đăng ký người dùng
router.post(
  "/register",
  [
    body("firstName").notEmpty().withMessage("First Name is required"),
    body("lastName").notEmpty().withMessage("Last Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  userController.register
);

// Route đăng nhập
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  userController.login
);

// Route đăng xuất
router.get("/logout", auth, userController.logout);

// Route thông tin người dùng thông qua ID
router.get("/users/:id", auth, checkId, userController.getUser);

// Route cập nhật thông tin người dùng
router.put(
  "/users/:id",
  [
    auth,
    checkId,
    body("firstName").notEmpty().withMessage("First Name is required"),
    body("lastName").notEmpty().withMessage("Last Name is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("district").notEmpty().withMessage("District is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
  ],
  userController.updateUser
);

// Route xóa người dùng
router.delete("/users/:id", auth, userController.deleteUser);

// Route đổi mật khẩu
router.put(
  "/users/:id/password",
  [
    auth,
    checkId,
    body("newPassword")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  userController.changePassword
);

// Route lấy danh sách người dùng
router.get("/users", auth, checkAdmin, userController.getUsers);

// Route thay đổi quyền người dùng
router.put(
  "/users/:id/role",
  [
    auth,
    checkAdmin,
    body("role").isIn(["admin", "user"]).withMessage("Invalid role"),
  ],
  userController.changeRole
);

module.exports = router;
