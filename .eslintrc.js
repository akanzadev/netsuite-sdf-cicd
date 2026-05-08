module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended', // debe ir siempre al final
  ],
  plugins: ['prettier'],
  globals: {
    // NetSuite AMD globals
    define: 'readonly',
    require: 'readonly',
  },
  rules: {
    // ----- Prettier -----
    'prettier/prettier': 'error',

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

    // ----- Style (delegado a Prettier, no duplicar aquí) -----
    // Las reglas de formato como quotes, indent, semi, etc.
    // son manejadas por Prettier via .prettierrc
  },
  ignorePatterns: ['node_modules/', 'tests/'],
};
