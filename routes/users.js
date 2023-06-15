const usersRouter = require('express').Router();
const { updateUserBodyValidator } = require('../utils/requestValidators');

const {
  updateUser, getMe,
} = require('../controllers/users');

usersRouter.get('/me', getMe);

usersRouter.patch('/me', updateUserBodyValidator, updateUser);

module.exports = usersRouter;
