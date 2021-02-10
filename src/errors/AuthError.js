/**
 * Auth error.
 */

class AuthError extends Error {
  constructor(message = 'not authorized') {
    super(message);
    this.message = message;
  }
}

module.exports = AuthError;
