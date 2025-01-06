import express from "express";
import multer from "multer";
import upload from "../config/multerConfig";
import {
  createProductImage,
  uploadMultipleFiles,
} from "../controllers/uploadController";
import { auth, checkAdmin } from "../middlewares/auth"; // Import middleware xác thực và kiểm tra quyền

let router = express.Router();

// Route để upload một file và lưu URL vào cơ sở dữ liệu với kiểm tra xác thực và quyền admin
router.post("/upload", auth, checkAdmin, (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        message: "Multer error occurred when uploading.",
        error: err.message,
      });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    createProductImage(req, res);
  });
});

// Route để upload nhiều file với kiểm tra xác thực và quyền admin
router.post("/upload-multiple", auth, checkAdmin, (req, res) => {
  upload.array("files", 10)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        message: "Multer error occurred when uploading.",
        error: err.message,
      });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    uploadMultipleFiles(req, res);
  });
});

module.exports = router;
