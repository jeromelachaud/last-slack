module.exports = {
  languageOptions: {
    globals: {
      es6: true,
      node: true,
    },
  },
  plugins: ['promise'],
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2017,
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-console': 'off',
    'promise/catch-or-return': 'error',
  },
}
