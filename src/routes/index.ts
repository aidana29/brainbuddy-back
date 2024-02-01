import express from "express"
import userRouter from "./userRouter"
import errorHandler from "../middleware/errorHandler";

const router = express.Router();

router.use("/users", userRouter);
router.use(errorHandler);

export default router;