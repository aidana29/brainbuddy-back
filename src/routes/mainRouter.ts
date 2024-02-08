import express from "express";
import { mainController } from "../controllers";

const mainRouter = express.Router();

mainRouter.get("/", mainController.getQuestion);
mainRouter.post("/answered", mainController.saveAnswerHistory);

export default mainRouter;
