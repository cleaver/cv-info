const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const JWT_KEY = process.env.JWT_KEY;

module.exports = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    // check parameters
    if (!username || !password) {
      reject(new AuthError('both username and password are required'));
      return;
    }
    // check username
    if (username !== process.env.AUTH_USERNAME) {
      reject(new AuthError());
      return;
    }
    // check password
    bcrypt.compare(password, process.env.AUTH_PASSWORD).then((result) => {
      if (result) {
        const token = jwt.sign({ username: username }, JWT_KEY, {
          expiresIn: '1h',
        });
        resolve(token);
      } else {
        reject(new AuthError());
      }
    });
  });
};
