const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin,
  webpack = require('webpack'),
  CopyWebpackPlugin = require('copy-webpack-plugin');

const publicPath = '/';

module.exports = {
  mode: 'development',

  entry: './src/index.tsx',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss']
  },

  devtool: 'inline-source-map',

  devServer: {
    historyApiFallback: {
      index: publicPath
    },
    publicPath: publicPath,
    host: '',
    disableHostCheck: true,
    proxy: [
      {
        context: ['/v1/api', '/config.js', '/icon.png'],
        secure: false,
        changeOrigin: true
      }
    ]
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
        use: ['style-loader', 'css-loader', 'sass-loader', 'css-modules-typescript-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.HotModuleReplacementPlugin()
  ]
};
