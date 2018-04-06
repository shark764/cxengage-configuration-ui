const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build')
  },
  optimization: {
    // removeAvailableModules: true, // always enabled by default
    // removeEmptyChunks: true, // always enabled by default
    // mergeDuplicateChunks: true, // always enabled by default
    // sideEffects: true, //always enabled by default
    // providedExports: true,  // always enabled by default
    // splitChunks: false,  // always enabled by default
    // runtimeChunk: true,  // always enabled by default

    // flagIncludedChunks: true,  //true for prod mode
    // occurrenceOrder: true,  // true in prod mode
    // usedExports: true, // true for prod mode
    // concatenateModules: true, // true for prod mode
    // noEmitOnErrors: true, // true in prod mode

    // namedModules: false,  //  true in dev mode
    // namedChunks: false, // true in dev mode

    nodeEnv:"custom", //production or development

    // minimizer?, you can choose what minimizer you want and customize behaviour
    // minimize: true, // true in prod mode
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};