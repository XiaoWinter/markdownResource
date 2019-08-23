## Bable



### 安装依赖

`npm install --save-dev @babel/core @babel/cli`



#### 安装插件

`npm install --save-dev @babel/plugin-transform-arrow-functions`

#### 编译

`npx babel script.js --plugins @babel/plugin-transform-arrow-functions`

#### 或者

##### .babelrc

```json
{
      "plugins": ["@babel/plugin-transform-arrow-functions"]
 }
```

##### 编译

`npx babel script.js`



#### 套餐（插件包）

`npm install --save-dev @babel/preset-env`

##### 编写 .babelrc

```json
{
       "presets": ["@babel/preset-env"]
}
```

##### 输出文件

`npx babel arrow.js -o arrow.min.js`

### babel-polyfill

`npm install --save @babel/polyfill`

`import '@babel/polyfill'`



### babel-runtime

##### 安装插件

`npm install --save-dev @babel/plugin-transform-runtime`

##### 安装babel-runtime

`npm install @babel/runtime --save`

##### 配置

```json
 {
          "plugins": [
            "@babel/plugin-transform-object-assign",
            "@babel/plugin-transform-runtime"
          ]
  }
```



### borwserslistrc

##### 配置文件

```
last 1 version
> 1%
maintained node versions
not dead
```

