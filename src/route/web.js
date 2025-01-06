import express from "express";
import homeController from "../controllers/homeController";
import userRouter from "./userRouter";
import productRouter from "./productRouter";
import uploadRouter from "./uploadRouter";
import cartRouter from "./cartRouter"; // Import cart router
import orderRouter from "./orderRouter"; // Import order router

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  app.use("/", router);
  app.use("/api", userRouter);
  app.use("/api", productRouter);
  app.use("/api", uploadRouter);
  app.use("/api", cartRouter);
  app.use("/api", orderRouter);
};

module.exports = initWebRoutes;
