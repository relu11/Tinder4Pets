import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index';
import iamRouter from './routes/iam';
import communicationRouter from './routes/communication';
import eventsRouter from './routes/events';
import recommendationRouter from './routes/recommendation';

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors())

app.use('/', indexRouter);
app.use('/iam', iamRouter);
app.use('/communication', communicationRouter);
app.use('/events', eventsRouter);
app.use('/recommendation', recommendationRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send();
});

export default app;
