const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  env: {
    browser: true,
    jest: true,
    es2020: true,
  },
  extends: ['airbnb', 'react-app', 'prettier', 'prettier/react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-unresolved': [0],
    'no-console': [0],
    'no-param-reassign': [0],
    camelcase: [0],
    'react/jsx-props-no-spreading': [0],
    'react/destructuring-assignment': [0],
    'react/prop-types': [0],
    'import/no-named-as-default': [0],
    'no-nested-ternary': [0],
    'react/no-array-index-key': [0],
    'react/require-default-props': [0],
    'react/forbid-prop-types': [0],
    'no-return-assign': [0],
    'no-shadow': [0],
    'import/no-extraneous-dependencies': [0],
    'import/extensions': [0],
    'consistent-return': [0],
  },
};
