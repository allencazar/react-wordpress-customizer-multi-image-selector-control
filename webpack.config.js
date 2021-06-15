const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   output: {
      path: path.join(__dirname, '/dist'),
      filename: 'drag-sort-multi-image-upload-control.js',
   },
   devServer: {
      port: 3010,
      watchContentBase: true,
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
            }
         },
         {
            test: /\.scss$/,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader',
               'sass-loader',
            ]
         }
      ]
   },
   plugins: [new MiniCssExtractPlugin({
      filename: 'drag-sort-multi-image-upload-control.css'
   })],
};