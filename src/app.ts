import express, { Application } from "express";
import cors from "cors";

const app: Application = express();
app.use(cors());

app.get("/health", (req, res) => {
  res.send("Welcome to ph health care prisma server");
});

export default app;
