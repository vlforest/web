import express from "express";
import { body } from "express-validator";
import homeController from "../controllers/homeController";
import UserController from "../controllers/UserController";
import auth from "../middleware/auth";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

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
    UserController.register
  );

  // Route đăng nhập
  router.post(
    "/login",
    [
      body("email").isEmail().withMessage("Invalid email format"),
      body("password").notEmpty().withMessage("Password is required"),
    ],
    UserController.login
  );

  // Route thông tin người dùng thông qua ID
  router.get("/users/:id", auth, UserController.getUser);

  // Route cập nhật thông tin người dùng
  router.put(
    "/users/:id",
    [
      auth,
      body("firstName").notEmpty().withMessage("First Name is required"),
      body("lastName").notEmpty().withMessage("Last Name is required"),
      body("address").notEmpty().withMessage("Address is required"),
      body("district").notEmpty().withMessage("District is required"),
      body("country").notEmpty().withMessage("Country is required"),
      body("phone").notEmpty().withMessage("Phone is required"),
    ],
    UserController.updateUser
  );

  // Route xóa người dùng
  router.delete("/users/:id", auth, UserController.deleteUser);

  // Route đổi mật khẩu
  router.put(
    "/users/:id/password",
    [
      auth,
      body("newPassword")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    ],
    UserController.changePassword
  );

  app.use("/", router);
};

module.exports = initWebRoutes;
