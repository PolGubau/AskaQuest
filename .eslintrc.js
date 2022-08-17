module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'JSX.IntrinsicElements': 'off',
    'dot-notation': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'space-before-function-paren': 'off'

  }
}
