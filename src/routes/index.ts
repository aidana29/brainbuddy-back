import express from "express";
import userRouter from "./userRouter";
import mainRouter from "./mainRouter";
import errorHandler from "../middleware/errorHandler";
import tokenValidation from "../middleware/tokenValidation";

const router = express.Router();

router.use("/users", userRouter);
router.use("/main", tokenValidation, mainRouter);
router.use(errorHandler);

export default router;
