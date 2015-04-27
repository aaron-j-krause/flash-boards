module.exports = {
  entry: __dirname + '/app/js/client.jsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'jsx-loader?insertPragma=React.DOM&harmony'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}