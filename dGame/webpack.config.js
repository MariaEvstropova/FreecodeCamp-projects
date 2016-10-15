var webpack = require('webpack');

module.exports = {
  entry: ["./src/main.ts"],
  output: {
    path: __dirname + '/public/build/',
    publicPath: "build/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".ts", ".tsx", ".js"]
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      }
    ]
  }
};
