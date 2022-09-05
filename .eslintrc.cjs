/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-prettier',
    'eslint:recommended'
  ],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        // Override all options of `prettier` here
        // @see https://prettier.io/docs/en/options.html
        trailingComma: 'none', //'es5'
        tabWidth: 2,
        printWidth: 80,
        semi: false,
        singleQuote: true,
        semicolons: false
      }
    ]
  },
  env: {
    'vue/setup-compiler-macros': true
  }
}
