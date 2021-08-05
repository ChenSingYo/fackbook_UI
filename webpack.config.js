// 由node.js提供的path套件，用來設定打包出口。
const path = require('path')
// 引入插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {

  // 打包目標是網頁，確保開啟live reloading。
  target: 'web',

  // 設定入口路徑  
  entry: './src/index.js',

  // 設定打包出口路徑
  output: {
    path: path.resolve(__dirname, 'dist'),

    // 確保使用者下載到最新的index.js，而不是沿用舊的快取，因此加上hash隨機數
    // index.html裡引入的js檔名會另外運用插件做套用。
    filename: 'index.[hash].js'
  },

  // 開發者狀態不會壓縮js。
  // production模式時會執行tree shaking，清除沒用到的變數或函式
  mode: 'production',

  // loader，加強webpack對被打包檔案的識別。
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          // 使用插件，用來抽取src/css檔案
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // 讓PostCSS套件能夠使用import引入
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        // 讀取gif檔案
        test: /\.(gif|png|svg)$/,
        type: 'asset/resource'
      },
      {
        // 讀取js檔案，不包括node_modules
        // 正規表達式：見到任何js檔案都去使用loader讀取。
        test: /\.m?js$/,
        exclude: /node_modules/,
        // 使用外掛babel去編譯最新的js語法
        use: {
          loader: 'babel-loader',
          options: {
            // 設定：可以使用最新的js語法，讓babel去做編譯
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  // 新增插件
  plugins: [
    // 自動產生index.html、將打包好的js, css檔案放入html中引用、建立localhost，以及live reloading。
    new HtmlWebpackPlugin({
      // 指定渲染模板的路徑
      template: './src/index.html'
    }),
    // 抽取src裡的css檔案，自動產生dist/index.css
    new MiniCssExtractPlugin({
      filename: 'index.[hash].css'
    }),
    // 打包前自動清空dist資料夾
    new CleanWebpackPlugin(),
    // 產生容量更小的gzip檔
    new CompressionPlugin(),
    // 設定全域環境的變數，將不同開發狀態分別開來。
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false)
    })
  ],

  // 避免debug時看到的是打包後的js或css檔案
  devtool: 'source-map',
  stats: {
    children: true,
  }
}