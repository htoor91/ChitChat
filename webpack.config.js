const path = require("path");
const webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: './client/src/chitchat.jsx',
  output: {
    path: path.join(__dirname, 'client', 'src', 'public', 'js'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader?limit=5000&name=img/img-[hash:6].[ext]"
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
