import jwt from "jsonwebtoken";
import db from "../models";

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

export default auth;
