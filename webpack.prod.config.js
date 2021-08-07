const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin,
  webpack = require('webpack'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  CompressionPlugin = require('compression-webpack-plugin');


const publicPath = '/';

module.exports = {
  mode: 'production',

  entry: './src/index.tsx',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  devServer: {
    historyApiFallback: {
      index: publicPath
    },
    publicPath: publicPath,
    host: '',
    disableHostCheck: true
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: publicPath
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CompressionPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
