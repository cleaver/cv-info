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
    console.log('AUTH_USERNAME', process.env.AUTH_USERNAME);
    expect(authHandler('valid')).rejects.toMatch('error');
  });

  test('invalid token', () => {
    jwt.verify.mockImplementation((scalar) => {
      throw new Error();
    });
    expect(authHandler('invalid')).rejects.toMatch('error');
  });
});
