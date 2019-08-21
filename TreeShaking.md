<h1 align='center'>TreeShaking</h1>

#### JS的TreeShaking



新建项目

`npm init -y`

安装webpack

`npm i -D webapck@3.10.0`



* 文件结构



![1566177643211](.\treeshaking\1566177643211.png)





* 编写一个暴露多接口的js文件，dosth.js

```js
export function test1(){
    console.log('test1');
}
export function test2(){
    console.log('test2');
}
export function test3(){
    console.log('test3');
}
export function test4(){
    console.log('test4');
}
export function test5(){
    console.log('test5');
}
```

* 编写入口js，引入dosth.js，使用其中的接口

```js
import {test1} from './src/dosth';
test1(); 
```

* 编写配置文件

```js
module.exports = {
    
    entry : {
        app : `${__dirname}/index.js`
    }
    ,
    output : {
        filename : '[name].[hash:8].js',
        path : `${__dirname}/dist`
    }
}
```



##### 此时不使用treeshaking，进行打包——dosth.js整个文件都被打包到了输出文件

![1566177944317](.\treeshaking\1566177944317.png)



#### 使用treeshaking优化代码



##### 添加到配置文件

```js
const webpack = require('webpack');
 plugins:[
        new webpack.optimize.UglifyJsPlugin()
    ]
```



##### 完整配置文件

```js
const webpack = require('webpack')
module.exports = {
    
    entry : {
        app : `${__dirname}/index.js`
    }
    ,
    devtool: 'inline-source-map'
    ,
    output : {
        filename : '[name].[hash:8].js',
        path : `${__dirname}/dist`
    }
    ,
    plugins:[
        new webpack.optimize.UglifyJsPlugin()
    ]

}
```



##### webpack进行打包

打包后的js，压缩

```js
!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1);Object(r.a)()},function(e,t,n){"use strict";function r(){console.log("test1")}t.a=r}]);
```



##### 查看文件结构，虽然大部分看不懂，但是可以看出打包文件只打包了dosth.js的test1接口



![1566178355669](C:\Users\黄聪\Desktop\treeshaking\1566178355669.png)



#### 使用第三方库时进行treeshaking



##### 未摇树之前大小为137k

![1566217689252](.\treeshaking\1566217689252.png)



![1566217551783](C:\Users\黄聪\Desktop\treeshaking\1566217551783.png)

依赖可用版本

```js
  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "babel-loader": "^8.0.6",
    "babel-plugin-lodash": "^3.3.4",
    "webpack": "^3.10.0"
  },
  "dependencies": {
    "lodash-es": "^4.17.15"
  }
```





##### 安装一个第三方库

`npm install lodash --save`

安装babel和专门摇此第三方库的插件,`

`npm install babel-plugin-lodash --save-dev`

安装babel-loader(加载器),babel/core（核心库）,babel/preset-env（套餐），

`npm install babel-loader @babel/core @babel/preset-env --save-dev`



##### babel需要的配置

#### .babelrc

```js
{
  "presets": ["@babel/preset-env"],
  "plugins": ["lodash"]
}
```



#### .browserslistrc

```
last 1 version
> 1%
maintained node versions
not dead
```



##### webpack增加配置

```js
module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                    {
                        loader:'babel-loader'
                    }
                ]
            }
        ]
    }
```



##### 全部webpack

```js
const webpack = require('webpack')
module.exports = {
    
    entry : {
        app : `${__dirname}/index.js`
    }
    ,
    devtool: 'inline-source-map'
    ,
    output : {
        filename : '[name].[hash:8].js',
        path : `${__dirname}/dist`
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                    {
                        loader:'babel-loader'
                    }
                ]
            }
        ]
    }
    ,
    plugins:[
        new webpack.optimize.UglifyJsPlugin()
    ]

}
```



#####  打包,成功压缩到5K

![1566217749235](.\treeshaking\1566217749235.png)

