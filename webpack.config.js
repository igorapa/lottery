var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var htmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'app/client/index.html'),
  filename: 'index.html',
  inject: 'body'
});

var extractCSS = new ExtractTextPlugin("app.css");

module.exports = {
  entry: './app/client/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [path.join(__dirname + '/babelRelayPlugin')]
        }
      },
      {
        test: /\.css$/,
        loader: extractCSS.extract('style-loader', 'css-loader')
      },
      {
        test: /\.scss$/,
        loader: extractCSS.extract('style-loader', 'css-loader!sass-loader')
      }
    ]
  },
  plugins: [
    htmlWebpackPluginConfig,
    extractCSS
  ],
  devtool: 'source-map'
};
