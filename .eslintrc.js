module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 函数声明时禁止圆括号前有空格
    'space-before-function-paren': 'off',
    camelcase: 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
