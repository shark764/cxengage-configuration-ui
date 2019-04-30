const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  output: {
    filename: '[name]-[chunkhash:6].bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  externals: {
    CxEngage: 'CxEngage'
  },
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")],
    alias: {
      Utils: path.resolve(__dirname, 'src', 'utils'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    // new BundleAnalyzerPlugin({
    //     analyzerMode: 'static'
    // }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env','@babel/react'],
              "plugins": [
                "@babel/plugin-proposal-class-properties",
                [
                  "create-automation-page-objects",
                  {
                    "saveFilePath": "automation/behavior/pageObjects.json"
                  }
                ]
              ]
            }
          }
        ],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
      },
    ]
  }
};
