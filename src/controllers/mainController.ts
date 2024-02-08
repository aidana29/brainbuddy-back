import { NextFunction, Request, Response } from "express";
import { mainService } from "../services";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const getQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const [randomQuestion] = await mainService.getQuestion(userId);
    
    res.status(200).json({
      message: "QUESTION_SENT",
      data: randomQuestion,
    });
  } catch (err) {
    next(err);
  }
};

const saveAnswerHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userAnswer = req.body.answer;
    const questionId = req.body.questionId;
    const userId = req.userId!;
    await mainService.saveHistory(userId, questionId, userAnswer);

    res.status(200).json({
      message: "USER_HISTORY_SAVED",
    });
  } catch (err) {
    next(err);
  }
};

export default { getQuestion, saveAnswerHistory };
