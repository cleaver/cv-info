const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_KEY = process.env.JWT_KEY;

module.exports = async (username, password) => {
  // check user
  if (username !== process.env.AUTH_USERNAME) {
    return false;
  }
  // check password
  return bcrypt.compare(password, process.env.AUTH_PASSWORD).then((result) => {
    if (result) {
      const token = jwt.sign({ username: username }, JWT_KEY, {
        expiresIn: '1h',
      });
      return token;
    }
    return false;
  });
};
