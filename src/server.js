import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
require("dotenv").config();
import connectBD from "./config/connectDB";

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectBD(); // Connect to database

viewEngine(app);
initWebRoutes(app);

let host = process.env.HOST || "localhost";
let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port http://${host}:${port}`);
});
