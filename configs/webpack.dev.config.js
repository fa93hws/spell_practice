const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const loaders = require('./loaders');

const config = require('./webpack.base.config');

module.exports = merge(config, {
  output: {
    filename: "static/js/[name].[hash:8].js",
    chunkFilename: 'static/js/[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist/'),
    publicPath: '/'
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin([
      /less\.d\.ts$/, /css\.d\.ts$/
    ]),
  ],
  module: {
    rules: [
      loaders.dev.style
    ]
  }
})