module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  ignorePatterns: ['node_modules', 'seeders', 'migrations'],
  extends: 'standard',
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'n/no-path-concat': 'off',
    camelcase: 'off'
  }
}
