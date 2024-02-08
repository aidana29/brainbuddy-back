import { mainDao } from "../models";

const getQuestion = async (userId: number) => {
  const question = await mainDao.getQuestion(userId);
  return question;
};

const saveHistory = async (
  userId: number,
  questionId: number,
  answer: string
) => {
  await mainDao.saveAnswerHistory(userId, questionId, answer);
};

export default { getQuestion, saveHistory };
