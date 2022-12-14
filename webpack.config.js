const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV } = process.env;
const isDev = NODE_ENV !== 'production';

module.exports = {
  entry: {
    main: './src/index.tsx',
    "pdf.worker": "pdfjs-dist/build/pdf.worker.entry",
  },
  mode: isDev ? 'development' : NODE_ENV,
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sc|sa|c)ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.join(process.cwd(), "build"),
    publicPath: "",
    filename: (pathData) => {
      if (pathData.chunk.name === 'pdf.worker') {
        return '[name].bundle.js';
      }
      return '[name].[chunkhash].bundle.js';
    },
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'public/index.ejs'),
    }),
  ],
  devServer: {
    static: './build',
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
};
