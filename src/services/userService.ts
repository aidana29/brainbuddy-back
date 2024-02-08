import { userDao } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface Error {
  status?: number;
  message?: string;
}

const registration = async (
  nickname: string,
  email: string,
  password: string
) => {
  if (!email || !password || !nickname) {
    const err: Error = new Error("KEY_ERROR");
    err.status = 400;
    throw err;
  }

  const [existingUser] = await userDao.existingUserByEmail(email);
  if (existingUser) {
    const err: Error = new Error("ALREADY_REGISTERED");
    err.status = 400;
    throw err;
  }

  const encodedPassword = await bcrypt.hash(password, 10);
  await userDao.userRegistration(nickname, email, encodedPassword);
};

const login = async (email: string, password: string) => {
  if (!email || !password) {
    const error: Error = new Error("KEY_ERROR");
    error.status = 400;
    throw error;
  }

  const [existingUser] = await userDao.existingUserByEmail(email);
  if (!existingUser) {
    const err: Error = new Error("NOT_REGISTERED");
    err.status = 400;
    throw err;
  }

  const isPasswordRight = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordRight) {
    const error: Error = new Error("WRONG_PASSWORD");
    error.status = 400;
    throw error;
  }

  const nickname = existingUser.nickname;
  const token = jwt.sign(
    { userId: existingUser.id },
    process.env.JWT_SECRET as string
  );

  return { token, nickname };
};

export default { registration, login };
