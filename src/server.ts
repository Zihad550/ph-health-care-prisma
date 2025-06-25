import express, { Application } from "express";

const app: Application = express();

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
