import { Server } from "http";
import app from "./app";
import config from "./app/config";
import seedSuperAdmin from "./app/DB";
import prisma from "./app/utils/prisma";

let server: Server;
async function main() {
  try {
    await seedSuperAdmin();

    server = app.listen(config.PORT, () => {
      console.log(`app listening on port ${config.PORT}`);
    });
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info("Server closed!");
    });
  }
  process.exit(1);
};

process.on("uncaughtException", (error) => {
  console.error(error);
  exitHandler();
});

process.on("unhandledRejection", (error) => {
  console.error(error);
  exitHandler();
});
