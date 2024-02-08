import AppDataSource from "./dataSource";

const userRegistration = async (
  nickname: string,
  email: string,
  password: string
) => {
  await AppDataSource.query(
    `INSERT INTO users (
            email, 
            password, 
            nickname
            ) VALUES (?, ?, ?)`,
    [email, password, nickname]
  );
};

const existingUserByEmail = async (email: string) => {
  const existingUser = await AppDataSource.query(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );
  return existingUser;
};

const existingUserById = async (userId: number) => {
  const existingUser = await AppDataSource.query(
    `SELECT * FROM users WHERE id = ?`,
    [userId]
  );
  return existingUser;
};

export default { userRegistration, existingUserByEmail, existingUserById };
