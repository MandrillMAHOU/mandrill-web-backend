const publicPath = process.env.NODE_ENV === 'production' ? '/' : '/dev';

module.exports = {
  publicPath,
  productionSourceMap: false, // 关闭生产环境的 source map
  css: { // css相关设置
    loaderOptions: {
      sass: {
        prependData: `
          @import '@/style/mixin.scss';
        `
      }
    }
  },
  devServer: { // 代理设置
    proxy: {
      '/mandrill-api': {
        target: 'http://localhost:3000/mandrill-api',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/mandrill-api': '',
        },
      },
      '/public': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/public': '',
        },
      }
    },
    open: true,
  },
};
