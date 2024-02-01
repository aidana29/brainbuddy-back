import express from "express";
import { userController } from "../controllers";

const userRouter = express.Router();

userRouter.post("/register", userController.registration);
userRouter.post("/", userController.login);

export default userRouter;
