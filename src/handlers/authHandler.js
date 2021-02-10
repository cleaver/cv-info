const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const JWT_KEY = process.env.JWT_KEY;

module.exports = (token) => {
  return new Promise((resolve, reject) => {
    try {
      // verify token
      const { username } = jwt.verify(token, JWT_KEY);
      if (username === process.env.AUTH_USERNAME) {
        resolve(username);
      }
      reject(new AuthError('not authorized'));
    } catch (error) {
      reject(new AuthError('not authorized'));
    }
  });
};
