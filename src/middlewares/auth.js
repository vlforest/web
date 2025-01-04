import jwt from "jsonwebtoken";
import db from "../models";

//////////////////////////////////////  Kiểm tra xác thực   //////////////////////////////////////
const auth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Kiểm tra nếu không có header Authorization
  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Lấy token và kiểm tra
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const tokenRecord = await db.Token.findOne({ where: { token } });
    if (!tokenRecord || tokenRecord.isDeleted) {
      throw new Error("Token is not valid");
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

//////////////////////////////////////  Kiểm tra quyền admin  //////////////////////////////////////
const checkAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Access denied, Admins only" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//////////////////////////////////////  Kiểm tra quyền thao tác đến thông tin user  //////////////////////////////////////
const checkId = (req, res, next) => {
  const userID = req.user.id;
  const reqID = req.params.id;
  if (userID === parseInt(reqID) || req.user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Access denied, you cannot access this user" });
  }
};
module.exports = {
  auth,
  checkAdmin,
  checkId,
};
