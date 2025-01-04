import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();

// Phương thức tạo người dùng mới
let createUser = async (userData) => {
  const { firstName, lastName, email, password } = userData;
  try {
    // Kiểm tra tồn tại email trong cơ sở dữ liệu
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Tiến hành mã hoá password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Tạo người dùng mới với role mặc định là "user"
    const user = await db.User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "user",
    });

    return user;
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
};

// Phương thức đăng nhập người dùng
let login = async (email, password) => {
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    // Kiểm tra password
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    // Tạo token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // token hết hạn sau 1 giờ
    );

    // Lưu token JWT vào bảng Tokens
    await db.Token.create({
      user_id: user.id,
      token: token,
      expires_at: new Date(Date.now() + 60 * 60 * 1000), // Token hết hạn sau 1 giờ
    });

    // Trả về người dùng và token
    return { user, token };
  } catch (error) {
    console.error("Error logging in: ", error);
    throw error;
  }
};

// Phương thức lấy thông tin người dùng theo ID
let getUserById = async (id) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error getting user by ID: ", error);
    throw error;
  }
};

// Phương thức cập nhật thông tin người dùng
let updateUser = async (id, userData) => {
  const { firstName, lastName, address, district, city, country, phone } =
    userData;
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.update({
      firstName,
      lastName,
      address,
      district,
      city,
      country,
      phone,
    });
    return user;
  } catch (error) {
    console.error("Error updating user: ", error);
    throw error;
  }
};

// Phương thức xóa người dùng theo ID
let deleteUser = async (id) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
    return true;
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error;
  }
};

// Phương thức đổi mật khẩu
let changePassword = async (id, newPassword) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }

    // Mã hóa mật khẩu mới
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await user.update({ password: hashedPassword });

    return user;
  } catch (error) {
    console.error("Error changing password: ", error);
    throw error;
  }
};

module.exports = {
  createUser,
  login,
  getUserById,
  updateUser,
  deleteUser,
  changePassword,
};
