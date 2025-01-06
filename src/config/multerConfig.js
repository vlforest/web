import multer, { diskStorage } from "multer";
import { extname } from "path";

// Cấu hình Multer để lưu trữ file
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/uploads/"); // Thư mục lưu trữ file
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Chỉ cho phép các file ảnh
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only images are allowed!"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
