import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userDao } from "../models";

interface Error {
  status?: number;
  message?: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const tokenValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      const err: Error = new Error("NO_TOKEN");
      err.status = 401;
      throw err;
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    const userIdFromToken = decodedToken.userId;
    const foundUser = await userDao.existingUserById(userIdFromToken);

    if (!foundUser) {
      const err: Error = new Error("USER_NOT_FOUND");
      err.status = 404;
      throw err;
    }

    req.userId = userIdFromToken;
    next();
  } catch (error) {
    next(error);
  }
};

export default tokenValidation;
