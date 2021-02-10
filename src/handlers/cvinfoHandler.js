const fs = require('fs');
var path = require('path');

const NotFoundError = require('../errors/NotFoundError');

module.exports = (id) => {
  return new Promise((resolve, reject) => {
    const contentDir =
      process.cwd() + path.sep + process.env.CONTENT_DIR + path.sep;
    const contentExt = process.env.CONTENT_EXT;
    fs.readFile(
      `${contentDir}${id}.${contentExt}`,
      { encoding: 'utf8' },
      (err, data) => {
        if (err) {
          reject(new NotFoundError('not found'));
        }
        resolve(data);
      }
    );
  });
};
