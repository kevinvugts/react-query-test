const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

require('dotenv').config({ path: path.join(__dirname, `../.env.development`) })

module.exports = () => {
  return merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      path: path.resolve(__dirname, '../public/dist'),
      filename: '[name].[hash].bundle.js', // the file name would be my entry's name with a ".bundle.js" suffix
      chunkFilename: '[name].[chunkhash].js',
      publicPath: '/',
    },
    devServer: {
      compress: true,
      contentBase: path.join(__dirname, '../public/dist'),
      historyApiFallback: true,
      publicPath: '/',
      port: 3001,
      proxy: {
        '/api': {
          target: 'https://portal.trekhaakcentrum.nl',
          //target: 'https://thc.sebudesign.nl',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/api/v3',
          },
        },
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        APP_ENVIRONMENT: 'development',
        APP_CONFIG: JSON.stringify({
          apiHost: process.env.API_HOST,
        }),
      }),
    ],
  })
}
