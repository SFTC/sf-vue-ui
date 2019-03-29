const path = require('path');

module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'examples/main.js',
      // 模版来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
    },
  },
  chainWebpack: config => {
    config.module
    .rule('js')
    .include
    .add(path.resolve(__dirname, 'packages'))
    .end()
    .use('babel')
    .loader('babel-loader')
    .tap(options => {
      return options;
    })
  },
};