const movieRoutes = require('express')
  .Router();
const { createMovieBodyValidator, movieIdParamsValidator } = require('../utils/requestValidators');

const {
  getMovieList, createMovie, deleteMovieById,
} = require('../controllers/movie');

movieRoutes.get('/', getMovieList);

movieRoutes.post('/', createMovieBodyValidator, createMovie);

movieRoutes.delete('/:movieId', movieIdParamsValidator, deleteMovieById);

module.exports = movieRoutes;
