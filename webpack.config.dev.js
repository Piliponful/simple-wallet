const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcDir = path.resolve(__dirname, 'src')
const distDir = path.resolve(__dirname, 'dist')

const rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    enforce: 'pre',
    use: [{
      loader: 'babel-loader'
    }, {
      loader: 'standard-loader',
      options: {
        snazzy: true,
        error: true
      }
    }]
  }
]

module.exports = {
  entry: `${srcDir}/index.js`,
  output: {
    path: distDir,
    filename: 'bundle.js',
    publicPath: '/'
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8080'
      }
    }
  },
  module: {
    rules
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
  ]
}
