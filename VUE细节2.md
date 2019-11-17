# VUE细节2

### 清除定时器

```
const timer = setInterval(() =>{                    
    // 某些定时器操作                
}, 500);            
// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
this.$once('hook:beforeDestroy', () => {            
    clearInterval(timer);                                    
})

作者：愣锤
链接：https://juejin.im/post/5b174de8f265da6e410e0b4e
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

### 不打包map文件

在vue.config.js文件中，设置`productionSourceMap: false`,就可以不生成.map文件

```
productionSourceMap:false
```



### 查看打包后各文件的体积，帮你快速定位大文件

如果你是vue-cli初始化的项目，会默认安装`webpack-bundle-analyzer`插件，该插件可以帮助我们查看项目的体积结构对比和项目中用到的所有依赖。也可以直观看到各个模块体积在整个项目中的占比。很霸道有木有~~

```
npm run build --report // 直接运行，然后在浏览器打开http://127.0.0.1:8888/即可查看
```

路由懒加载

```
export default new Router({
  routes: [    
        { 
            path: '/', 
            name: 'Index', 
            component: resolve => require(['@/view/index/index'], resolve) 
        }
   ]
})
```

```
export default new Router({
  routes: [    
        { 
            path: '/', 
            name: 'Index', 
            component: ()=>import('@/view/index/index') 
        }
   ]
})
```

### 配置别名

```
 configureWebpack:{
      resolve: {
          extensions:['.js','.vue','.json'],
          alias:{
              'vue$':'vue/dist/vue.esm.js',
              '@':resolve('src'),
              '$cps':resolve('src/components')
          }
      },
      
  }
```



### 开启gzip压缩

##### 安装插件

```bash
npm i -D compression-webpack-plugin
```

vue.config.js编写配置

```js
const CompressionPlugin = 
      require('compression-webpack-plugin')

module.exports = {
    
  // configureWebpack: (config)=>{
      configureWebpack: ()=>{
        if(process.env.NODE_ENV === 'production'){
          return {
            plugins:[
              new CompressionPlugin({
                test:/\.js$|\.html$|\.css$/,
                threshold:10240,
                deleteOriginalAssets:false
              })
            ]
          }
        }
      }
}
```

直接

```js
 configureWebpack:{
    
      plugins:[
        new CompressionPlugin({
          test:/\.js$|\.html$|\.css$/,
          threshold:10240,
          deleteOriginalAssets:false
        })
      ]
  }
```



#### 总览

![](http://47.103.65.182/markdown/035.png)

#### .env文件定义

Note that only variables that start with `VUE_APP_` will be statically embedded into the client bundle with `webpack.DefinePlugin`

```
NODE_ENV=production  //因为是必有变量，不加VUE_APP_
VUE_APP_BASEURL = http://www.xiaoadong.com  //因为是自定义变量，加 VUE_APP_
```



#### 使用.env(切换环境)

--mode development    ——>加上参数表示这体哦啊命令的执行是在`NODE_ENV=production`这个环境



```text
vue-cli-service build --mode development
```

写在package.json

```
  "scripts": {
    "serve": "vue-cli-service serve --mode development",
    "build": "vue-cli-service build --mode production",
    "lint": "vue-cli-service lint"
  },
```



#### 打包结果

运行 yarn build

![](http://47.103.65.182/markdown/034.png)