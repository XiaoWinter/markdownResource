# webpack

## 安装 Webpack

```bash
# npm i -D 是 npm install --save-dev 的简写，是指安装模块并保存到 package.json 的 devDependencies
# 安装最新稳定版
npm i -D webpack
npm i -D webpack-cli

#安装开发环境
npm install --save-dev webpack-dev-server

#基本配置
npm i -D webpack-cli webpack html-webpack-plugin webpack-dev-server

"node-sass": "^4.14.1",
#安装sass环境
npm i  node-sass@4.14.1 -D  --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```
```bash
# 安装指定版本
npm i -D webpack@<version>

# 安装最新体验版本
npm i -D webpack@beta

```

## 使用 Loader

```
npm install --save-dev style-loader css-loader
```

```
npm install --save-dev file-loader
```



```js
const path = require('path');

module.exports = {
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        use: ['style-loader', 'css-loader?minimize'],
      }
    ]
  }
};
```

## 使用 Plugin

```
npm install --save-dev html-webpack-plugin
npm install --save-dev clean-webpack-plugin
```



```js
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 把输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          // 转换 .css 文件需要使用的 Loader
          use: ['css-loader'],
        }),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // 从 .js 文件中提取出来的 .css 文件的名称
      filename: `[name]_[contenthash:8].css`,
    }),
  ]
};
```

## 使用 DevServer

前面的几节只是让 Webpack 正常运行起来了，但在实际开发中你可能会需要：

1. 提供 HTTP 服务而不是使用本地文件预览；
2. 监听文件的变化并自动刷新网页，做到实时预览；
3. 支持 Source Map，以方便调试。

```
npm i -D webpack-dev-server
```

```json
//package.json
"scripts": {
    "start": "webpack-dev-server --open -hot",
    "watch": "webpack --watch",
    "build": "webpack"
  },
```

```js
//webpack.config.js 
devtool: 'inline-source-map',//或者启动时带上 --devtool source-map 参数
devServer: {
    contentBase: './dist'
},
```

## 实时预览



### CopyWebpackPlugin

把index.html拷贝到dist下

::musical_note:一定要把清除dist的插件放前面

## 模块热替换

```json
 devServer: {
     contentBase: './dist',
     hot:true
 },
```

```js
        //插件
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
```

```json
//package.json
"scripts": {
	"start": "webpack-dev-server --open --hot",
}

```

## 安装Babel

```shell
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill
```

 babel.config.json 或者 .babelrc

```json
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1",
        },
        "useBuiltIns": "usage",
      }
    ]
  ]
}
```

