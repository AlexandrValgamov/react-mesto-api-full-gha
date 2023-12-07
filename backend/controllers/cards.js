const mongoose = require('mongoose');
const Card = require('../models/Card');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    next(error);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res
      .status(201)
      .send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return next(new BadRequestError(`Ошибка валидации. ${validationErrors.join(' ')}`));
    }
    next(error);
  }
};

const deleteCard = async (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  try {
    const checkedCard = await Card
      .findById(cardId)
      .orFail();
    if (String(checkedCard.owner) !== userId) throw new ForbiddenError('Нельзя удалять карточки других пользователей');

    const data = await checkedCard
      .deleteOne()
      .orFail();
    res.send({ message: 'Карточка удалена', data });
  } catch (error) {
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(new NotFoundError('Карточка с указанным _id не найдена'));
    }
    next(error);
  }
};

const addLike = async (req, res, next) => {
  try {
    const card = await Card
      .findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
        { new: true },
      )
      .orFail();
    res.send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(new NotFoundError('Карточка с указанным _id не найдена'));
    }
    if (error instanceof mongoose.Error.CastError) {
      return next(new BadRequestError('Переданы некорректные данные для постановки/снятия лайка'));
    }
    next(error);
  }
};

const removeLike = async (req, res, next) => {
  try {
    const card = await Card
      .findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } }, // убрать _id из массива
        { new: true },
      )
      .orFail();
    res.send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(new NotFoundError('Карточка с указанным _id не найдена'));
    }
    if (error instanceof mongoose.Error.CastError) {
      return next(new BadRequestError('Переданы некорректные данные для постановки/снятия лайка'));
    }
    next(error);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
