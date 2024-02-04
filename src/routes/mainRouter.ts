import express from "express";
import { mainController } from "../controllers";

const mainRouter = express.Router();

mainRouter.get("/", mainController.getQuestion)

export default mainRouter;