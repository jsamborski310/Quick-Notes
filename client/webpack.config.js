const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// ----Configuring workbox plugins for a service worker and manifest file.

module.exports = () => {
  return {
    mode: 'development',
    // Entry point for files.
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      // editor: './src/js/editor.js',
      // header: './src/js/header.js'
    },
    // Output for bundles.
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Webpack plugin that generates the html file and injects the bundles. 
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Quick Notes'
      }),   
      
      // Injects custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),      

      // Creates a manifest.json file.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Quick Notes',
        short_name: 'Notes',
        description: 'Capture your thoughts with a quick note!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),      
      
    ],

    // ---Adding CSS loaders and babel to webpack.

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,

          // babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },              
      ],
    },
  };
};
