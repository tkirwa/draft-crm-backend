const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const logger = require("morgan");
const mongoose = require("mongoose");

// Load dotenv in Your Application
require("dotenv").config();

// const routingMiddleware = require('./middlewares/routingMiddleware');

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const resetPasswordRoutes = require('./routes/resetPasswordRoutes');

const app = express();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use('/auth-reset', resetPasswordRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Handle 404 errors for routes that are not defined
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
