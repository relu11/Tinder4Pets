import createError from "http-errors";
import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import indexRouter from "./routes/index";
import authRouter from "./routes/auth";
import eventsRouter from "./routes/events";
import petsRouter from "./routes/pets";
import articlesRouter from "./routes/articles";
import usersRouter from "./routes/users";
import { CLIENTS } from "./config/config";

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: CLIENTS,
    credentials: true,
  })
);

app.use("/api/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/events", eventsRouter);
app.use("/api/pets", petsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).send();
});

export default app;
