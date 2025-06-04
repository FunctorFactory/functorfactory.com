import { FlatCompat } from '@eslint/eslintrc';
import * as config from '@functorfactory/eslint-config';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const Config = [
  {
    ignores: ['.next'],
  },
  ...config.Config,
  ...compat.extends('next'),
  {
    files: ['**/*.tsx'],
    rules: {
      'functional/functional-parameters': 'off',
      'jsdoc/require-jsdoc': 'off',
    },
  },
];

export default Config;
