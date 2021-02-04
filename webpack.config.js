const webpack = require('webpack');
//Comment this line out and plugin new BundleAnalyzerPlugin in plugins if you want to use Visualize size of webpack output files locally
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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
    modules: [path.resolve(__dirname, "node_modules"), "node_modules"],
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
                "@babel/plugin-syntax-dynamic-import",
                [
                  "create-automation-page-objects",
                  {
                    "saveFilePath": "automation/pageObjects/locators.json"
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
        loader: 'image-loader',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
      },
      {
        test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
      },
    ]
  }
};
