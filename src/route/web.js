import express from "express";
import homeController from "../controllers/homeController";
import userRouter from "./userRouter";
import productRouter from "./productRouter";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  app.use("/", router);
  app.use("/", userRouter);
  app.use("/", productRouter);
};

module.exports = initWebRoutes;
