import { mainDao } from "../models";

const getQuestion = async (userId: number) => {
    const question = await mainDao.getQuestion(userId);
    return question;
}

export default { getQuestion }