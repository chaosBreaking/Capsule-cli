module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard',
    "plugin:react/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    "indent": ["error", 4],
    "semi": ["error", "always"],
    "comma-dangle": 0,
    "react/prop-types": 0
  }
}
