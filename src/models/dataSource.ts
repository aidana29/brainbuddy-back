import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.RDS_ENDPOINT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  port: 3306,
});

export default AppDataSource;
