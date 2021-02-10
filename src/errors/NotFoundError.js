/**
 * Not found error.
 */

class NotFoundError extends Error {
  constructor(message = 'not found') {
    super(message);
    this.message = message;
  }
}

module.exports = NotFoundError;
