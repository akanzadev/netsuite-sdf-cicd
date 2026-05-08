module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  globals: {
    // NetSuite AMD globals
    define: 'readonly',
    require: 'readonly',
  },
  rules: {
    // ----- Possible errors -----
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-undef': 'error',

    // ----- Best practices -----
    eqeqeq: ['error', 'always'],
    curly: ['error', 'all'],
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-return-assign': 'error',
    'no-throw-literal': 'error',
    'prefer-const': 'error',
    'no-var': 'error',

    // ----- NetSuite SuiteScript specific -----
    // Enforce JSDoc annotations required by NetSuite
    'require-jsdoc': [
      'warn',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: false,
          ClassDeclaration: false,
          ArrowFunctionExpression: false,
        },
      },
    ],
    'valid-jsdoc': 'off',

    // ----- Style -----
    semi: ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    indent: ['error', 2],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'arrow-parens': ['error', 'always'],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],
  },
  ignorePatterns: ['node_modules/', 'tests/'],
};
