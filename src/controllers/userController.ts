import { NextFunction, Request, Response } from "express";
import { userService } from "../services";

const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nickname, email, password } = req.body;

    await userService.registration(nickname, email, password);

    res.status(201).json({
      message: "SIGNUP_SUCCESS",
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;
    const userData = await userService.login(email, password);

    res.status(200).json({
      message: "LOGIN_SUCCESS",
      nickname: userData.nickname,
      token: userData.token,
    });
  } catch (err) {
    next(err);
  }
};

export default { registration, login };
