const router = require('express')
  .Router();
const { createUser, login } = require('../controllers/users');
const { signUpBodyValidator, signInBodyValidator } = require('../utils/requestValidators');
const auth = require('../middlewares/auth');
const movieRoutes = require('./movie');
const usersRouter = require('./users');
const NotFoundError = require('../errors/NotFoundError');

router.post('/api/signup', signUpBodyValidator, createUser);
router.post('/api/signin', signInBodyValidator, login);

router.use('/api/users', auth, usersRouter);
router.use('/api/movies', auth, movieRoutes);

router.use('/*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
