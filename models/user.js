const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [16, 'Максимальная длина поля "name" - 16'],
    required: [true, 'Поле "name" должно быть заполнено'],
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный Email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
    minlength: [8, '400 Минимальная длина поля "password" - 8'],
  },
  __v: { type: Number, select: false },

});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные email или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные email или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
