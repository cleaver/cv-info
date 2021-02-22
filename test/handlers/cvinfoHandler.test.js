const cvinfoHandler = require('../../src/handlers/cvinfoHandler');
const fs = require('fs');
var path = require('path');

jest.mock('fs');

describe('cvinfoHandler tests', () => {
  process.env.CONTENT_DIR = 'content';
  process.env.CONTENT_EXT = 'html';

  fs.readFile.mockImplementation((file, options, callback) => {
    const goodFile =
      process.cwd() +
      path.sep +
      process.env.CONTENT_DIR +
      path.sep +
      'sample.' +
      process.env.CONTENT_EXT;
    if (file === goodFile) {
      callback(null, 'some data');
    } else {
      callback(new Error(), '');
    }
  });

  test('request valid resource', () => {
    expect(cvinfoHandler('sample')).resolves.toBe('some data');
  });

  test('request invalid resource', () => {
    expect(cvinfoHandler('onion')).rejects.toThrow('not found');
  });
});
