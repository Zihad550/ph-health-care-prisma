import express, { Application } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(cors());
// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.get("/health", (req, res) => {
  res.send("Welcome to ph health care prisma server");
});
app.use("/api/v1", router);

app.use(globalErrorHandler);
app.use(notFound);
export default app;
