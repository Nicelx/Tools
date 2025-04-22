const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PostCSSMergeRules = require('postcss-merge-rules');
const PostCSSMergeLonghands = require('postcss-merge-longhand');
const PostCSSPresetEnv = require('postcss-preset-env');
const PostCSSSortMediaQueries = require('postcss-sort-media-queries');

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
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  PostCSSMergeRules(), 
                  PostCSSMergeLonghands(), 
                  PostCSSSortMediaQueries(), 
                  PostCSSPresetEnv({ 
                    stage: 3,
                    features: {
                      'nesting-rules': true
                    }
                  })
                ]
              }
            }
          }
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              mergeMedia: true,
              discardComments: { removeAll: true },
              mergeRules: true, 
              discardDuplicates: true,
              cssDeclarationSorter: true 
            }
          ]
        }
      }),
      new TerserPlugin()
    ],
    minimize: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.min.css',  // we can change directory here
    }),
  ],
  mode: 'production',
};