const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.

// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    // Entry point for files.
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js'
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
        title: 'Text Editor'
      }),   
      
      
      
    ],

    module: {
      rules: [
        
      ],
    },
  };
};
