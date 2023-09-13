const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js', // Adjusted path
      install: './src/js/install.js', // Adjusted path
    },
    output: {
      path: path.resolve(__dirname, 'dist'), // Adjusted path
      filename: '[name].bundle.js',
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', // Adjusted path
      }),
      new WebpackPwaManifest({
        name: 'JATE',
        short_name: 'JATE',
        description: 'Just Another Text Editor',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Adjusted path
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src-sw.js', // Adjusted path
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};
