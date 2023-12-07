const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;
const generateToken = (payload) => jwt.sign(payload, NODE_ENV ? JWT_SECRET : '980758d3d66cd05999d3bf561c2e242bb093fcb6006061b4ac06ced07d36a620', {
  expiresIn: '7d',
});

// вставьте сюда JWT, который вернул публичный сервер
// const YOUR_JWT = ';
// вставьте сюда секретный ключ для разработки из кода
// const SECRET_KEY_DEV = '980758d3d66cd05999d3bf561c2e242bb093fcb6006061b4ac06ced07d36a620';
// try {
//   const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
//   console.log('\x1b[31m%s\x1b[0m', `
// Надо исправить. В продакшне используется тот же
// секретный ключ, что и в режиме разработки.
// `);
// } catch (err) {
//   if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
//     console.log(
//       '\x1b[32m%s\x1b[0m',
//       'Всё в порядке. Секретные ключи отличаются'
//     );
//   } else {
//     console.log(
//       '\x1b[33m%s\x1b[0m',
//       'Что-то не так',
//       err,
//     );
//   }
// }

module.exports = generateToken;
