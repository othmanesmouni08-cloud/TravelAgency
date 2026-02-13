const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const { MongoStore } = require("connect-mongo");

require("./config/passport");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        scriptSrcAttr: ["'unsafe-inline'"],
        styleSrc: ["'self'", "https:", "'unsafe-inline'"],
        fontSrc: ["'self'", "https:", "data:"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "http://localhost:5000"],
      },
    },
  }),
);

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());

// Session management for OAuth
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

const routes = require("./routes");
app.use("/api", routes);

const path = require("path");
const { errorHandler } = require("./middleware/error.middleware");
app.use(errorHandler);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

module.exports = app;
