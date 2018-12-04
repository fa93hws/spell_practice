const webpack = require('webpack');
const merge = require('webpack-merge');
const loaders = require('./loaders');

const config = require('./webpack.base.config');

module.exports = merge(config, {
  output: {
    filename: "static/js/[name].js",
    chunkFilename: 'static/js/[name].js'
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: {
      index: '/spell_practice/'
    },
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