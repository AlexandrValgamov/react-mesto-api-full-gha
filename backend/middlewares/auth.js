const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const { JWT_SECRET, NODE_ENV } = process.env;
const auth = (req, res, next) => {
  let payload;
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedError('С токеном что-то не так');
    }

    const validToken = token.replace('Bearer ', '');
    payload = jwt.verify(validToken, NODE_ENV ? JWT_SECRET : '980758d3d66cd05999d3bf561c2e242bb093fcb6006061b4ac06ced07d36a620');
  } catch (error) {
    next(new UnauthorizedError('С токеном что-то не так'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
