const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function stylesLoaderProducer(mode) {
  let firstLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '/'
    }
  };
  if (mode === 'development')
    firstLoader = 'style-loader';
  
  return {
    test: /\.(css|less)$/,
    use: [
      firstLoader,
      {
        loader: 'typings-for-css-modules-loader',
        options: {
          modules: true,
          camelCase: true,
          localIdentName: '[local]--[hash:base64:5]',
          namedExport: true
        }
      },
      'postcss-loader',
      {
        loader: 'less-loader',
        options: { javascriptEnabled: true },
      }
    ]
  }
};

const dev = {
  style: stylesLoaderProducer('development')
};
const prod = {
  style: stylesLoaderProducer('production')
};

module.exports = { dev, prod };