import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['tests/fixtures/**']
  },
  {
    files: ['src/**/*.ts', 'tests/**/*.ts'],
    languageOptions: {
      parser: tsParser
    },
    rules: {}
  },
  {
    files: ['tests/**/*.js', 'bin/**/*.js'],
    rules: {}
  }
];
