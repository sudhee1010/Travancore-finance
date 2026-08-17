require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDatabase();

  const server = app.listen(PORT, () => {
    console.log(`Travancore Finance API running on port ${PORT} (${process.env.NODE_ENV || "development"})`);
  });

  // Fail loudly on unhandled promise rejections rather than continuing
  // in an unknown state.
  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err.message);
    server.close(() => process.exit(1));
  });
}

start();
