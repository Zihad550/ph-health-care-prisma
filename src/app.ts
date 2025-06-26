import express, { Application } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/User/user.route";
import { AdminRoutes } from "./app/modules/Admin/admin.route";

const app: Application = express();

app.use(cors());
// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/health", (req, res) => {
  res.send("Welcome to ph health care prisma server");
});

app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/admin", AdminRoutes);

export default app;
