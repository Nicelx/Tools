const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production', // Режим сборки (development/production)
  entry: './src/index.js', // Входная точка
  output: {
    path: path.resolve(__dirname, ''), // Выходная директория
    filename: 'app.js', // Имя выходного файла
  },
};