const movieSchema = require('../models/movie');
const InaccurateDataError = require('../errors/InaccurateDataError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getMovieList = (req, res, next) => {
  const ownerId = req.user._id;
  movieSchema
    .find({ owner: ownerId })
    .then((movies) => res.send(movies))
    .catch(next);
};

const deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  movieSchema.findById(movieId)
    .then((movie) => {
      if (!movie) { throw new NotFoundError('Нет карточки с таким id'); }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав для выполнения операции');
      }
      return movie.deleteOne()
        .then((movieData) => {
          res.send(movieData);
        });
    })
    .catch(next);
};

function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const owner = req.user._id;

  movieSchema
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InaccurateDataError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
}

module.exports = {
  createMovie,
  deleteMovieById,
  getMovieList,
};
