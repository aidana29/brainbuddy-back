import AppDataSource from "./dataSource";

const saveAnswerHistory = async (
  userId: number,
  questionId: number,
  answer: string
) => {
  let answerToBoolean;
  answer === "right" ? (answerToBoolean = 1) : (answerToBoolean = 0);
  const [allUserQuestions] = await AppDataSource.query(
    `SELECT question_id FROM user_history WHERE user_id = ? && question_id = ?`,
    [userId, questionId]
  );

  if (allUserQuestions) {
    return await AppDataSource.query(
      `UPDATE user_history SET is_right = ? WHERE question_id = ?`,
      [answerToBoolean, questionId]
    );
  } else {
    return await AppDataSource.query(
      `INSERT INTO user_history(user_id, question_id, is_right) VALUES (?, ?, ?)`,
      [userId, questionId, answerToBoolean]
    );
  }
};

const getQuestion = async (userId: number) => {
  const answeredRight = await AppDataSource.query(
    `SELECT question_id FROM user_history WHERE user_id=? && is_right = 1`,
    [userId]
  );
  const answeredRightIds = answeredRight.map(
    (answeredQuestion: { question_id: number }) => {
      return answeredQuestion.question_id;
    }
  );

  const allQuestions = await AppDataSource.query(`SELECT id FROM questions`);
  const arrayAllIds = allQuestions.map((question: { id: number }) => {
    return question.id;
  });

  if (answeredRightIds) {
    const filteredQuestions = arrayAllIds.filter(
      (questionId: number) => !answeredRightIds.includes(questionId)
    );

    const randomQuestionId =
      filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
    const randomQuestion = await AppDataSource.query(
      `SELECT * FROM questions WHERE id=?`,
      [randomQuestionId]
    );

    return randomQuestion;
    
  } else if (!answeredRight) {
    const randomNumber = Math.floor(Math.random() * arrayAllIds.length);
    const randomQuestion = await AppDataSource.query(
      `SELECT * FROM questions WHERE id = ?`,
      [randomNumber]
    );

    return randomQuestion;
  }
};

export default { getQuestion, saveAnswerHistory };
