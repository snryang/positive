module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://49.234.92.172:8099', // 你要代理的域名和端口号，要加上http
        changeOrigin: true,
      }
    }
  }
}