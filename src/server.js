import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import path from "path";
import fs from "fs";
require("dotenv").config();
import connectBD from "./config/connectDB";

let app = express();

//Sử dụng body-parser để xử lý các yêu cầu của HTTP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Kết nối Database
connectBD(); // Connect to database

//Sử dụng view engine
viewEngine(app);

// Tạo thư mục public và upload file
fs.mkdirSync(path.join(__dirname, "public/uploads"), { recursive: true });

// Đăng ký các route cho web
initWebRoutes(app);

let host = process.env.HOST || "localhost";
let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port http://${host}:${port}`);
});
