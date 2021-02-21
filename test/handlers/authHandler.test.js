const authHandler = require('../../src/handlers/authHandler');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('authHandler tests', () => {
  process.env.AUTH_USERNAME = 'foo';

  test('valid token, good username', () => {
    jwt.verify.mockReturnValue({ username: 'foo' });
    expect(authHandler('valid')).resolves.toBe('foo');
  });

  test('valid token, bad username', () => {
    jwt.verify.mockReturnValue({ username: 'bar' });
    expect(authHandler('valid')).rejects.toThrow('not authorized');
  });

  test('invalid token', () => {
    jwt.verify.mockImplementation((scalar) => {
      throw new Error();
    });
    expect(authHandler('invalid')).rejects.toThrow('not authorized');
  });
});
