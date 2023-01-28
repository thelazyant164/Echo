const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');

const app = express();
const loginRouter = require('./controllers/login');
const usersRouter = require('./controllers/users');
const userLoggedInRouter = require('./controllers/usersLoggedIn');
const audiosRouter = require('./controllers/audios');
const quickProcessingRouter = require('./controllers/quickProcessing');
const audioProcessingRouter = require('./controllers/audioProcessing');

const authenticate = require('./utils/authenticate');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.errorInfo('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/login', loginRouter);
app.use('/api/me', authenticate, userLoggedInRouter);
app.use('/api/audios', authenticate, audiosRouter);
app.use('/api/audio/quick', authenticate, quickProcessingRouter);
app.use('/api/audio', authenticate, audioProcessingRouter);
app.use('/management/users', usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
