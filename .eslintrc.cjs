/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
  // extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', 'airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['vue', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
