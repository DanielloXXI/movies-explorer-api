const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле "country" должно быть заполнено'],
    },
    director: {
      type: String,
      required: [true, 'Поле "director" должно быть заполнено'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле "duration" должно быть заполнено'],
    },
    year: {
      type: String,
      required: [true, 'Поле "year" должно быть заполнено'],
    },
    description: {
      type: String,
      required: [true, 'Поле "description" должно быть заполнено'],
    },
    image: {
      type: String,
      required: [true, 'Поле "image" должно быть заполнено'],
      validate: {
        validator(image) {
          return validator.isURL(image);
        },
        message: '400 Введён некорректный image-link',
      },
    },
    trailer: {
      type: String,
      required: [true, 'Поле "trailerLink" должно быть заполнено'],
      validate: {
        validator(trailerLink) {
          return validator.isURL(trailerLink);
        },
        message: '400 Введён некорректный trailerLink',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Поле "thumbnail" должно быть заполнено'],
      validate: {
        validator(thumbnail) {
          return validator.isURL(thumbnail);
        },
        message: '400 Введён некорректный thumbnail-link',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: String,
      required: [true, 'Поле "movieId" должно быть заполнено'],
    },
    nameRU: {
      type: String,
      required: [true, 'Поле "nameRU" должно быть заполнено'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле "nameEN " должно быть заполнено'],
    },
    __v: { type: Number, select: false },
  },
);

module.exports = mongoose.model('movie', movieSchema);
