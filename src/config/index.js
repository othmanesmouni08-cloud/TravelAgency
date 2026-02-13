export { env } from "./env.js";

const { default: mongoose } = require("../mongoose.js");

module.exports = {
  env,
  db,
  mongoose,
};
