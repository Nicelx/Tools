const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production', 
  entry: './src/index.js', // Входная точка
  output: {
    path: path.resolve(__dirname, ''), // Выходная директория
    filename: 'app.js', // Имя выходного файла
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), 
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.min.css',  // we can change directory here
    }),
  ],
  mode: 'production',
};