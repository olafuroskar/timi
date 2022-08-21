module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['react-app', 'plugin:storybook/recommended'],
  //, 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint', 'react-hooks'],
  //, 'prettier', 'react-hooks'],
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    // 'prettier/prettier': 'error',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'no-use-before-define': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [2, {
      args: 'none'
    }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    jest: true,
    node: true
  }
};