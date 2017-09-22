const AppInfo = require('./AppInfo');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssnext = require('postcss-cssnext');
const atImport = require('postcss-import');
const pxtorem = require('postcss-pxtorem');

var NODE_ENV = process.env.NODE_ENV;

const NODE_MODULES = path.resolve(__dirname, 'node_modules');
const isomorphicPath = path.resolve(__dirname, 'src/common/isomorphic.js');

const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
  // path.resolve(__dirname, 'src/assets/images/'),  // 2. 自己私人的 svg 存放目录
];

const config = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // 'eventsource-polyfill', // necessary for hot reloading with IE
    'babel-polyfill',
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$|\.js?$/,
        exclude: /node_modules/,
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
        loader: 'style-loader!css-loader',
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
        test: /\.(svg)$/i,
        loader: 'svg-sprite',
        include: svgDirs,  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
      },
      {
        test: /\.svg$/,
        loader: 'babel!react-svg',
        include: path.resolve(__dirname, 'src/assets/images/'),
      },
    ],
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
      'isomorphic': isomorphicPath,
      'react/lib/ReactMount': 'react-dom/lib/ReactMount',
    },
  },
  output: {
    path: '/dist/',
    filename: './bundle.js',
  },
  devServer: {
    contentBase: './',
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    port: AppInfo.port,
    host: AppInfo.host,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        DEVICE: JSON.stringify('mobile'),
        APPID: JSON.stringify(''),
      },
    }),
    new webpack.IgnorePlugin(/^(buffertools)$/),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'dash-wechat',
      filename: 'index.html',
      template: 'src/template.html',
    }),
  ],
};

module.exports = config;
