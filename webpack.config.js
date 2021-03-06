/**
 * Created by Ruslan on 14-Apr-16.
 */
'use strict';

module.exports = {
  entry: __dirname +'/frontend/js/app.js',
  output: {
    path: __dirname + '/public/js/',
    filename: 'build.js'
  },
  
  watch: true,
  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      }
    ]
  }
};