import { Server } from "http";
import app from "./app";
import config from "./app/config";
import { prisma } from "./app/database";
import seedSuperAdmin from "./app/DB";

let server: Server;
async function main() {
  try {
    server = app.listen(config.PORT, () => {
      console.log(`app listening on port ${config.PORT}`);
    });
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

(async () => {
  await main();
  await seedSuperAdmin();
})();

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
