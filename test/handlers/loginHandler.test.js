const loginHandler = require('../../src/handlers/loginHandler');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');
jest.mock('bcrypt');

describe('loginHandler tests', () => {
  process.env.AUTH_USERNAME = 'foo';
  const GOOD_PW = 'good-pw';
  const BAD_PW = 'bad-pw';
  const TOKEN_VAL = 'fake token';

  bcrypt.compare.mockImplementation((pw) => {
    return new Promise((resolve, reject) => {
      if (pw === GOOD_PW) {
        resolve(TOKEN_VAL);
      } else {
        resolve();
      }
    });
  });

  test('missing username / password', () => {
    expect.assertions(2);
    expect(loginHandler({ username: 'foo' })).rejects.toThrow(
      'both username and password are required'
    );
    expect(loginHandler({ password: 'bar' })).rejects.toThrow(
      'both username and password are required'
    );
  });

  test('bad username', () => {
    expect.assertions(1);
    expect(loginHandler({ username: 'baz', password: 'bar' })).rejects.toThrow(
      'not authorized'
    );
  });

  test('good username, bad password', () => {
    expect(loginHandler({ username: 'foo', password: BAD_PW })).rejects.toThrow(
      'not authorized'
    );
  });

  test('good username and password', () => {
    jwt.sign.mockReturnValue(TOKEN_VAL);
    expect(loginHandler({ username: 'foo', password: GOOD_PW })).resolves.toBe(
      TOKEN_VAL
    );
  });
});
