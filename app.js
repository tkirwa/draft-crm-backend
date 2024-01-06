const createError = require("http-errors");
const express = require("express");
const cors = require('cors');
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

const complaintRoutes = require('./routes/complaintRoutes');
const responseRoutes = require('./routes/responseRoutes');
const customerRoutes = require('./routes/customerRoutes');
const ratingRoutes = require('./routes/ratingRoutes');

const app = express();

const PORT = 8000;

// Enable CORS for all routes
app.use(cors());

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
app.use("/api", usersRouter);
app.use("/api", authRouter);
app.use('/api', complaintRoutes);
app.use('/api', responseRoutes);
app.use('/api', customerRoutes);
app.use('/api', ratingRoutes);

// 404 Error Handling
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});

module.exports = app;
