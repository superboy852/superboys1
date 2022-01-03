module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/',
  outputDir: 'rockbang',
  lintOnSave: true,
  css: {
    sourceMap: false,
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/variables.scss";@import "@/assets/styles/mixin.scss";'
      }
    }
  },
  devServer: {
    hotOnly: true,
    port: 9090,
    proxy: {
      '/api': {
        target: 'http://121.40.151.218:9090', // 测试环境
        ws: false, // proxy websockets
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true // 如果接口跨域，需要进行这个参数配置
      }
    }
  }
}
