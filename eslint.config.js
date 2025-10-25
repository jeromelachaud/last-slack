const promise = require('eslint-plugin-promise')
const js = require('@eslint/js')
const globals = require('globals')

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2017,
      sourceType: 'commonjs',
      globals: Object.assign({}, globals.es2015, globals.node),
    },
    plugins: {
      promise,
    },
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'no-console': 'off',
      'promise/catch-or-return': 'error',
    },
  },
]
