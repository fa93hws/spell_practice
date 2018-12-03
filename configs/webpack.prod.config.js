const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = require('./webpack.base.config');
const loaders = require('./loaders');
const prerenderRoutes = require('../scripts/prerender-routes');

module.exports = merge(config, {
  output: {
    filename: "static/js/[name].[chunkhash:8].js",
    chunkFilename: 'static/js/[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist/'),
    publicPath: '/'
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test:  /node_modules\/(?!markdown-it|katex|mdurl|entities|linkify-it)/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: 4,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      loaders.prod.style
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: 'index.html'
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '..')
    }),
    ...config.plugins,
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[chunkhash:8].css",
      chunkFilename: "static/css/[name].[chunkhash:8].css"
    }),
    new CopyWebpackPlugin(['_config.yml', 'CNAME']),
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, '../dist'),
      routes: prerenderRoutes,
      postProcess (renderedRoute) {
        renderedRoute.route = renderedRoute.originalRoute;
        return renderedRoute;
      },
      renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
        injectProperty: '__PRERENDER_INJECTED',
        renderAfterDocumentEvent: 'render-trigger'
      })
    })
  ]
});