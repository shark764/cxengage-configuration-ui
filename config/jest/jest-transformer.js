const config = {
  babelrc: false,
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false
      }
    ],
    "@babel/react"
  ],
  plugins: [
    ["@babel/plugin-transform-modules-commonjs"],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ]
};
module.exports = require("babel-jest").createTransformer(config);