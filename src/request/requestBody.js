const jsonBody = require('body/json');
const util = require('util');

module.exports = async (request) => {
  const jsonBodyPromise = util.promisify(jsonBody);
};
