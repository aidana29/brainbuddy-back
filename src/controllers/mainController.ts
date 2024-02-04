import { NextFunction, Request, Response } from "express";
import { mainService } from "../services";

const getQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = 1;
    const randomQuestion = await mainService.getQuestion(userId);

    res.status(200).json({
      message: "QUESTION SENT",
      data: randomQuestion
    });
  } catch (err) {
    next(err);
  }
};

export default { getQuestion };
