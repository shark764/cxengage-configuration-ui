const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
  plugins: [new HtmlWebpackPlugin({
    template: 'index.html'
  })],
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