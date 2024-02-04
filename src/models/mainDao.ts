import AppDataSource from "./dataSource";

const getHistory = async (userId: number) => {
  const answeredQuestions = await AppDataSource.query(
    `SELECT question_id FROM users_questions WHERE user_id = ? AND is_right=1`,
    [userId]
  )
  return answeredQuestions;
}

const getQuestion = async (userId: number) => {
    const randomNumber = Math.floor((Math.random()*3) + 1)
    // const [repeatedQuestion] = await AppDataSource.query(
    //   `SELECT * FROM questions WHERE id = ? AND is_right=0`,
    //   [randomNumber]
    // )
    // repeatedQuestion ? 

    const [randomQuestion] = await AppDataSource.query(
        `SELECT * FROM questions WHERE id = ?`,
        [randomNumber]
      );
    return randomQuestion;
  };

export default { getQuestion };