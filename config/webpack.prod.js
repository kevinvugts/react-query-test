const CompressionPlugin = require('compression-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [],
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name].[hash].bundle.js', // the file name would be my entry's name with a ".bundle.js" suffix
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      APP_ENVIRONMENT: 'production',
      APP_CONFIG: JSON.stringify({
        apiHost: process.env.API_HOST,
      }),
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.jsx$|\.css$|\.html$/,
      minRatio: 0.8,
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
})
