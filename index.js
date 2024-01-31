import express from "express";
import morgan from "morgan";
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));

const port = process.env.PORT;

app.get("/", (req, res) => {
    res.status(200).send("OK");
  });

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})