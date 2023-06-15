require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./utils/limiter');
const router = require('./routes/router');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./utils/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
mongoose.connect('mongodb://127.0.0.1:27017/bitmoviesdb', {
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT}`);
});
