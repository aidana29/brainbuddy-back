import express from "express";
import morgan from "morgan";
import "dotenv/config";
import AppDataSource from "./src/models/dataSource";
import router from "./src/routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(router);

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

AppDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
