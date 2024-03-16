const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://en.wikipedia.org',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
});
