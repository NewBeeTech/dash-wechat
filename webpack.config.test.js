const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const pxtorem = require('postcss-pxtorem');
const cssnext = require('postcss-cssnext');
const atImport = require('postcss-import');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

var NODE_ENV = process.env.NODE_ENV;

const NODE_MODULES = path.resolve(__dirname, 'node_modules');
const reactPath = path.resolve(NODE_MODULES, 'react/dist/react.min.js');
const reactLibPath = path.resolve(NODE_MODULES, 'react/lib');
const reactRouterPath = path.resolve(NODE_MODULES, 'react-router/umd/ReactRouter.min.js');
const isomorphicPath = path.resolve(__dirname, 'src/common/isomorphic.js');

const config = {
  entry: [
    'babel-polyfill',
    './src/index.js',
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$|\.js?$/,
        exclude: /node_modules/,
        // loader: 'react-hot!babel'
        loader: 'babel',
      },
      {
        test: /\.css/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'postcss-loader?sourceMap',
        ],
        exclude: /node_modules|src\/assets\/stylesheets\/antd-mobile.css/,
      },
      {
        test: /\.css/,
        include: /src\/assets\/stylesheets\/antd-mobile.css|node_modules/,
        loader: 'style-loader!css-loader!postcss-loader',
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        loader: 'style-loader!css-loader!less-loader',
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=100000000',
      },
      {
        test: /\.svg$/,
        loader: 'babel!react-svg'
      },
    ],
    noParse: [reactPath],
  },
  postcss: function () {
    return[
      atImport({addDependencyTo: webpack, path: ["src/css"]}),
      cssnext({browsers: ['> 1%', 'last 2 versions']}),
      pxtorem({rootValue: 100, propWhiteList: []})
    ];
  },
  resolve: {
    extensions: ['', '.web.js', '.js', '.jsx', '.json'],
    alias: {
      // 'react/lib': reactLibPath,
      // react: reactPath,
      // 'react-router': reactRouterPath,
      'isomorphic': isomorphicPath,
    },
  },
  output: {
    path: './dist/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  // output: {
  //   path: './dist/',
  //   filename: 'bundle.js',
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('test'),
        DEVICE: JSON.stringify('mobile'),
        APPID: JSON.stringify(''),
        WEBAPPID: JSON.stringify(''),
      },
    }),
    new ExtractTextPlugin('stylesheets/[name].css', {
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
      compress: {
        warnings: false,
      },
      sourceMap: false,
    }),
    new HtmlWebpackPlugin({
      title: 'dash-wechat',
      filename: 'index.html',
      template: 'src/template.html',
      minify: {
        html5: true,
        removeComments: true,
        removeEmptyAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true
      }
    })
  ],
};

module.exports = config;
