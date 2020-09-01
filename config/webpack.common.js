const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')

module.exports = {
  entry: [
    'core-js/modules/es.promise',
    'core-js/modules/es.array.iterator',
    './src/index.js',
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.css', '.scss'],
    alias: {
      '@core': path.resolve(__dirname, '../src/core'),
      '@managers': path.resolve(__dirname, '../src/managers'),
      '@services': path.resolve(__dirname, '../src/services'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@public': path.resolve(__dirname, '../public'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@seed': path.resolve(__dirname, '../src/seed'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@locales': path.resolve(__dirname, '../locales'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@context': path.resolve(__dirname, '../src/context'),
    },
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        options: {
          babelrc: true,
        },
      },
      {
        test: /\.ts(x)?$/,
        use: ['awesome-typescript-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          'postcss-loader',
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.webmanifest$/,
        use: [
          {
            loader: 'url-loader',
          },
          {
            loader: 'webmanifest-loader',
            options: {
              name: 'Meyer Staff App',
              shortName: 'Meyer',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Meyer - Staff App',
      template: path.resolve(__dirname, '../public/assets/template.ejs'),
    }),
  ],
}
