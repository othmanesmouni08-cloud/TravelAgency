const http = require("http");
const path = require("path");
const connectDB = require("./config/db");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const app = require("./app");

const { PORT } = require("./config/env");

connectDB();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});
 
