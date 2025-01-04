import { validationResult } from "express-validator";
import userService from "../services/userService";

// Đăng kí
let register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // console.log("Register user with data: ", req.body);
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    // console.log("Error while registering user: ", error);
    res.status(500).json({ message: error.message });
  }
};

// Đăng nhập
let login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { user, token } = await userService.login(
      req.body.email,
      req.body.password
    );
    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Đăng xuất
let logout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const result = await userService.logout(token);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// Lấy thông tin người dùng theo ID
let getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật thông tin người dùng theo ID
let updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa người dùng theo ID
let deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Đổi mật khẩu người dùng
let changePassword = async (req, res) => {
  const { newPassword } = req.body;
  try {
    const updatedUser = await userService.changePassword(
      req.user.id,
      newPassword
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách tất cả người dùng
let getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Thay đởi quyền của người dùng
let changeRole = async (req, res) => {
  try {
    const updatedUser = await userService.changeRole(
      req.params.id,
      req.body.role
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  getUser,
  updateUser,
  deleteUser,
  changePassword,
  getUsers,
  changeRole,
};
