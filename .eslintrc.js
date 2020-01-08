module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    "no-console": 0,
    "no-unused-vars": 0,
    "comma-dangle": 0,
    "no-param-reassign": 0,
    "max-len": 0,
    "no-restricted-globals": 0,
    "guard-for-in": 0,
    "no-restricted-syntax": 0,
    "no-multi-assign": 0,
    "no-nested-ternary": 0,
    "prefer-destructuring": 0,
    "class-methods-use-this": 0,
    "linebreak-style": [0, "error", "windows"],
    "import/prefer-default-export": 0,
    "import/extensions": 0,
    "prefer-promise-reject-errors": 0,
    "import/no-cycle": 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  }
};
