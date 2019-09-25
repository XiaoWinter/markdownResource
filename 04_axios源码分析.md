## 0. 学习文档
[源码解析](https://juejin.im/post/5b0ba2d56fb9a00a1357a334)

[中文文档](http://www.axios-js.com/zh-cn/docs/#%E5%8D%8F%E8%AE%AE)

## 1. 源码目录结构

    ├── /dist/                     # 项目输出目录
    ├── /lib/                      # 项目源码目录
    │ ├── /adapters/               # 定义请求的适配器 xhr、http
    │ │ ├── http.js                # 实现http适配器(包装http包)
    │ │ └── xhr.js                 # 实现xhr适配器(包装xhr对象)
    │ ├── /cancel/                 # 定义取消功能
    │ ├── /core/                   # 一些核心功能
    │ │ ├── Axios.js               # axios的核心主类
    │ │ ├── dispatchRequest.js     # 用来调用http请求适配器方法发送请求的函数
    │ │ ├── InterceptorManager.js  # 拦截器的管理器
    │ │ └── settle.js              # 根据http响应状态，改变Promise的状态
    │ ├── /helpers/                # 一些辅助方法
    │ ├── axios.js                 # 对外暴露接口
    │ ├── defaults.js              # axios的默认配置 
    │ └── utils.js                 # 公用工具
    ├── package.json               # 项目信息
    ├── index.d.ts                 # 配置TypeScript的声明文件
    └── index.js                   # 入口文件

## 2. 源码分析
### 1). axios与Axios的关系

```javascript
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);
```

![](http://47.103.65.182/markdown/027.png)

### 2). axios为什么能有多种发请求的方法?
    axios函数对应的是Axios.prototype.request方法通过bind(Axiox的实例)产生的函数
    axios有Axios原型上的所有发特定类型请求的方法: get()/post()/put()/delete()
    axios有Axios的实例上的所有属性: defaults/interceptors
    后面又添加了create()/CancelToken()/all()

```javascript
// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
```



### 3). axios.create()返回的对象与axios的区别?

    相同: 
        都是一个能发任意请求的函数: request(config)
        都有发特定请求的各种方法: get()/post()/put()/delete()
        都有默认配置和拦截器的属性: defaults/interceptors
    不同:
        默认匹配的值很可能不一样
        instance没有axios后面添加的一引起方法: create()/CancelToken()/all()

```javascript
function createInstance(defaultConfig) {
   // 创建Axios的实例
  var context = new Axios(defaultConfig);
  // Axios.prototype.request.bind(context)
  var instance = bind(Axios.prototype.request, context); // axios

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context); // axios有了request()/get()/post()/put()/delete()

  // Copy context to instance
  utils.extend(instance, context); // axios有了defaults和interceptors属性

  return instance;
   } // axios()

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};
```



### 4). axios运行的整体流程

![](http://47.103.65.182/markdown/028.jpg)

### 5). Axios.prototype.request()都做了什么?



处理配置config，通过Promise的then方法生成一个链，请求拦截器放在dispatchRequst前面，响应拦截器放在dispatchRequst后面。

axios发送请求的整体流程：

```
整体流程: request(config)  ===> dispatchRequest(config) ===> xhrAdapter(con
fig)
-    request(config): 将请求拦截器 / dispatchRequest() / 响应拦截器 通过promise
链串连起来, 返回promise
-    dispatchRequest(config): 转换请求数据 ===> 调用xhrAdapter()发请求 ===> 请求
返回后转换响应数据. 返回promise
-    xhrAdapter(config): 创建XHR对象, 根据config进行相应设置, 发送特定请求, 并接
收响应数据, 返回promise

```



```javascript
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};//axios('example/url'[, config])是第二个
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  // 合并配置
  config = mergeConfig(this.defaults, config);
  // 添加method配置, 默认为get
  config.method = config.method ? config.method.toLowerCase() : 'get';

  /*
  创建用于保存请求/响应拦截函数的数组
  数组的中间放发送请求的函数
  数组的左边放请求拦截器函数(成功/失败)
  数组的右边放响应拦截器函数
  */
  var chain = [dispatchRequest, undefined];//发送请求的
  var promise = Promise.resolve(config);//传递配置

  // 后添加的请求拦截器保存在数组的前面
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  // 后添加的响应拦截器保存在数组的后面
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });
  

  // 通过promise的then()串连起所有的请求拦截器/请求方法/响应拦截器
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  // 返回用来指定我们的onResolved和onRejected的promise
  return promise;
};
```



### 6). dispatchrequest()都做了什么?

###### 整合了一下发送请求需要的数据，然后调用adapter方法

```javascript
module.exports = function dispatchRequest(config) {

   //发送请求的初始化工作
            //合并config中的baseURL和url
            //对config中的data进行必要的转换处理
            //设置相应的Content-Type请求头
            // 整合config中所有的header


  var adapter = config.adapter || defaults.adapter;
//关键点,下面块展示它是什么
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // promise返回响应
    return response;
  }, function onAdapterRejection(reason) {
   //promise返回错误
    return Promise.reject(reason);
  });
};
```

```javascript
//default.js文件中的项
// 得到当前环境对应的请求适配器
function getDefaultAdapter() {
  var adapter;
  // node环境下，使用http模块
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
   
    adapter = require('./adapters/http');
      //在浏览器环境下，使用XHR
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  }
  return adapter;
}

var defaults = {
  // 得到当前环境对应的请求适配器//方法具体看在上面
  adapter: getDefaultAdapter(),
    ...
}
    //暴露出默认配置
module.exports = defaults;
```

```javascript
//适配器（xhrAdapter()）做了什么
module.exports = function xhrAdapter(config) {
  // 返回一个promise
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    
...

    // 创建XHR对象
    var request = new XMLHttpRequest();


    // 初始化请求open
    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // 绑定请求状态改变的监听
    request.onreadystatechange = function handleLoad() {
      // request不存在或请求状态不是4, 直接结束
      if (!request || request.readyState !== 4) {
        return;
      }

...//中间的细节操作
    // 发送请求, 指定请求体数据, 可能是null
    request.send(requestData);
  });
};

```



### 7). xhrAdapter()做了什么?
    发送了ajax请求 

### 8). axios的请求/响应拦截器是什么?
    请求拦截器: 在真正发请求前, 可以对请求进行检查或配置进行特定处理的函数, 包括成功/失败的函数, 传递的必须是config
    响应拦截器: 在请求返回后, 可以对响应数据进行特定处理的函数, 包括成功/失败的函数, 传递的默认是response



![](http://47.103.65.182/markdown/029.jpg)

添加拦截器（请求拦截器，响应拦截器）

```javascript
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```



```javascript
 /*
  创建用于保存请求/响应拦截函数的数组
  数组的中间放发送请求的函数
  数组的左边放请求拦截器函数(成功/失败)
  数组的右边放响应拦截器函数
  */
  var chain = [dispatchRequest, undefined];//发送请求的
  var promise = Promise.resolve(config);//传递配置

  // 后添加的请求拦截器保存在数组的前面
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  // 后添加的响应拦截器保存在数组的后面
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });
  

  // 通过promise的then()串连起所有的请求拦截器/请求方法/响应拦截器
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }
```



### 9). axios的请求/响应数据转换器是什么?

    请求转换器: 对请求头和请求体数据进行特定处理的函数
        setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
        return JSON.stringify(data)
    响应转换器: 将响应体json字符串解析为js对象或数组的函数
        response.data = JSON.parse(response.data)

### 10). response的整体结构
    {
        data,
        status,
        statusText,
        headers,
        config,
        request
    }

### 11). error的整体结构
    {
        message,
        code,
        request,
        response
    }

### 12). config是如何起作用的?
    通过拦截器后传递给xhrAdapter(config), 内部利用config, 对XHR对象发请求进行相应的设置

### 13). 如何取消已经发送的请求?



* cancelToken: source.token 取消多个请求

```javascript
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
     // 处理错误
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');

```



* cancel方法    一个个取消

```javascript
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// cancel the request
cancel();
```

