const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV } = process.env;
const isDev = NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.tsx',
  mode: isDev ? 'development' : NODE_ENV,
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'public/index.ejs'),
    }),
  ],
  devServer: {
    static: './build',
    port: 3000,
    historyApiFallback: true
  },
};
