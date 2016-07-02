const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'app/client/index.html'),
  filename: 'index.html',
  inject: 'body'
});

const extractCSS = new ExtractTextPlugin("app.css");

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
