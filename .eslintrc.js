/* eslint-disable quote-props */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb-base/legacy', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    objectCurlySpacing: false,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    strict: 'error',
  },
};
