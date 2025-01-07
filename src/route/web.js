import express from "express";
import homeController from "../controllers/homeController";
import userRouter from "./userRouter";
import productRouter from "./productRouter";
import uploadRouter from "./uploadRouter";
import cartRouter from "./cartRouter";
import orderRouter from "./orderRouter";
import reviewRouter from "./reviewRouter";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  app.use("/", router);
  app.use("/api", userRouter);
  app.use("/api", productRouter);
  app.use("/api", uploadRouter);
  app.use("/api", cartRouter);
  app.use("/api", orderRouter);
  app.use("/api", reviewRouter);
};

module.exports = initWebRoutes;
