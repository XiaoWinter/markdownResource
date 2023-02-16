## TMS微信小程序开发



### 补充上下文

#### webView

webView: Android，IOS的SDK（software development kit）中提供了一个webView控件用来渲染网页，这些控件，用于移动端 APP 嵌入(Embed) Web 技术，加载 Web 内容；**基于 Webkit 引擎**；Andoid、IOS 平台 Browser，**基于 Webkit 引擎**

<img src="https://handtms-static.obs.cn-east-3.myhuaweicloud.com/component/0/8ac4c181640b43d494b59d33737010e1%402.png" style="zoom: 67%;" />



#### H5 移动应用

我们常说的`H5`其实也通常可以被视为一种`Web App`，相比于我们在桌面端浏览器中打开的网页，主要是增加了一些响应式的设计与交互优化，从而使得这些网页更适合在移动端的浏览器中显示运行。既然是网页应用，那依然是基于`JavaScript`，`CSS`和`HTML`进行实现的，由于是基于各类前端技术栈进行实现，最大的好处就是快速、简单、方便，且有各种技术资料可以参考。

同样，`H5`的缺点与优点也是并存的，比如由于技术已经很成熟了，对于前端经验欠缺的新人来说，面对各式各样的框架，模块、任务管理工具，`UI 库`可能会出现无从下手的问题；此外相比于原生应用，对于系统权限的获取（比如数据缓存能力，网络通信状态等）都显得比较鸡肋，当低性能的设备加载包含复杂逻辑的页面时，会出现明显的卡顿与延迟问题

#### 原生应用

原生应用也被叫做`Native App`，相比于`H5`应用通过前端三大件进行实现不同，原生应用主要会采用`iOS`与`Android`的专有语言`Object-C（或 Swift）`，`Java（或 Kotlin）`进行实现，大多我们所常见的国民应用，比如微信，支付宝等都属于这种原生应用。

既然被叫做「原生应用」，就像操作系统的亲儿子一样，天然在性能与体验上具备优秀的潜质，也有组件库丰富，接口支持完善等各种优势特点。但原生应用最大的缺陷就是不能跨平台研发，以目前的主流市场为例，必须要支持`iOS`与`Android`两个主流平台。



#### 混合应用

混合应用一般被称为`Hybrid App`。简单来说，混合应用就是将原生功能封装成对应的`JS`接口，在前端使用`H5`来开发对应的`App（即 H5 作为内容+原生应用作为壳）`，看上去虽然是一个移动原生应用整体，但实际的页面还是网页，一套代码可以生成`iOS`与`Android`两种安装包，开发成本较低。

我们常见的淘宝，京东等应用由于更新与优化节奏都十分快速，为了更好的响应「贴近用户」的目标，应用中有的功能通过原生`Native`实现，有的功能则通过`H5`页面进行实现，这种应用就属于我们所说的混合应用。

<img src="https://handtms-static.obs.cn-east-3.myhuaweicloud.com/component/0/6f72abb3c0d04af688793dd4724cb9b3%403.png" style="zoom: 67%;" />



#### 小程序

严格意义上来说，小程序并不属于以上 3 种应用的任何一种。小程序主要通过`JavaScript`与`CSS`这种常见的前端技术进行开发，但又没有完全使用`HTML`进行实现，在不同的操作系统中，

`JavaScript`代码分别运行在`iOS`的`JavaScriptCore`与`Android`的`V8`中，各家小程序平台或多或少都有一部分自研的核心，因此渲染视图层的组件也有所不同。



### 小程序的由来

微信小程序原本只是带有webview的app,后来微信通过jsBridge增加了一些提供给内部使用的功能，微信这时可以看作一个混合APP。

而微信小程序的前身就是在webview中渲染的网页，并且可以使用微信没有暴露的jsBridge。这种针对微信的网页开发逐渐成为微信中网页的事实标准。

2015年微信对 jsBridge 进行了进一步的封装，发布了一整套网页开发工具包，称之为 JS-SDK，开放了拍摄、录音、语音识别等几十个API。此时微信网页的开发仍处于混合应用页面开发范畴。

直到2017年，微信推出了微信小程序。微信生成微信小程序可以解决传统h5页面在webview中渲染的弊端，并且提供众多微信API，如访问微信用户某些信息，以及微信原生组件，如地图，视频等。此时小程序开发标准才真正确定下来。





<img src="https://handtms-static.obs.cn-east-3.myhuaweicloud.com/component/0/0fb14da8ed4b46b2a748947ea1964b3e%401.png" style="zoom:80%;" />



网页能力的扩展方面，微信小程序和混合应用的理念是相似的。他们都会有一个js接口做为中间桥梁向网页提供原生能力。但是小程序更像是一个框架，它有自己的语法，自己的开发脚手架，具体后面再说。





### 小程序与普通网页开发的区别



一是**运行环境的不同**

混合应用的网页，运行环境在app的webview,在单个线程中渲染页面执行交互。微信小程序的运行环境可分为 2 部分，即**逻辑层**与**视图层**。其中逻辑层用来加载小程序中负责处理业务逻辑的 JS 脚本，而视图层则用来渲染 WXML 模板与 WXSS 样式，显示最终的页面。在小程序中，逻辑层与视图层则分别由 2 个独立线程进行管理：

- 逻辑层采用 JS Core 引擎运行 JS 脚本，用来处理业务逻辑；`JSCore`的环境同`NodeJS`环境也是不尽相同，一些 NPM 的包在小程序中也是无法运行的。
- 渲染层界面使用 WebView 进行渲染（一个小程序中如果存在多个页面，则会存在多个 WebView 线程）。

因此一个小程序应用中只有一个 JS Core 线程，以及多个 WebView 线程。



第二点不同是**小程序不能操作DOM**

如上文所述，小程序的逻辑层和渲染层是分开的，逻辑层运行在 JSCore 中，并没有一个完整浏览器对象，因而缺少相关的`DOM API`和`BOM API`。这一区别导致了前端开发非常熟悉的一些库，例如`jQuery`、`Zepto`等，在小程序中是无法运行的。

第三点**开发环境不同**

网页开发者需要面对的环境是各式各样的浏览器，PC 端需要面对`IE`、`Chrome`等，在移动端需要面对`Safari`、`Chrome`以及`iOS`、`Android`系统中的各式`WebView`。

网页开发者在开发网页的时候，只需要使用到浏览器，并且搭配上一些辅助工具或者编辑器即可。小程序的开发则有所不同，需要经过申请小程序帐号、安装小程序开发者工具、配置项目等等过程方可完成。



<img src="https://res.wx.qq.com/wxdoc/dist/assets/img/4-1.ad156d1c.png" style="zoom:67%;" />

### 小程序概览



#### 小程序开发到使用历程

微信小程序可以运行在微信中，在启动小程序时，所需要的运行环境与能力需要由微信客户端应用向小程序提供。



<img src="https://handtms-static.obs.cn-east-3.myhuaweicloud.com/component/0/7c783c3a75f9471fbea8d79873765233%401.png" style="zoom:50%;" />



#### 一个最简化的小程序项目的样子，可以分为两部分

* 小程序全局文件
  * app.*
* 页面文件
  * page/index/*. *

```

├─ app.js // 小程序启动执行文件
├─ app.json // 小程序的配置文件
├─ app.wxss // 全局的样式配置
├─ pages // 页面
│    └─ login // 登录页
│         ├─ login.js // 逻辑层执行
│         ├─ login.json // 每个页面的一些属性，例如刚刚说的顶部颜色、是否允许下拉刷新等等
│         ├─ login.wxml // WeiXin Markup Language
│         └─ login.wxss // WeiXin Style Sheets
├─ package.json
├─ sitemap.json
├─ project.config.json
└─ project.private.config.json
```



#### 运行流程和页面

##### app.json

在微信客户端中打开小程序时，会将小程序的代码包先下载到本地，然后通过解析 app.json 里的 pages 字段，就可以知道该小程序的所有页面路径：

```json
{
  "pages":[
    "pages/login/login",
    "pages/logs/logs"
  ]
}

```

pages 数组中的第一个值，就是小程序打开时看到的第一个页面。而每个页面的路径，在程序代码包里都可以找到对应的文件路径。

例如 pages/index/index，在该路径下，存在着这个页面对应的 WXML、WXSS 与 JS 文件。小程序启动后，就会根据这个路径找到对应页面中的代码文件，再交给逻辑层和视图层执行，于是我们就可以在 微信客户端 上看到这个小程序的页面了。

##### app.js

当小程序启动之后，就会触发 app.js 中定义的 **onLaunch** 方法

```json
App({
  onLaunch: function () {
    // 小程序启动之后执行
  }
})

```

下面我们来具体看下小程序的页面结构和具体的构成，以 pages/login/login 为例，在该文件目录下存在 login.js，login.wxml 和 login.wxss。

#####  login.js

```js
// pages/test/test.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},

})
```

在 login.js 文件里 `Page({...})` 会构造出 login 页面实例，`data` 表示的是该页面需要用到的渲染数据。当生成页面时，小程序引擎会把 `data` 数据和 `login.wxml` 结合，再渲染出来显示给用户。

`onLoad()` 方法则是页面的生命周期方法，页面创建时会回调该方法，开发者可在里面定义自己的逻辑。

##### API

为了让开发者更方便的使用小程序所提供的能力，微信将微信提供的能力封装在了wx对象中，开发者可以使用这些 API 对小程序界面进行修改，获取设备当前位置，播放视频、音频等。

API 分为同步与异步两种，同步 API 会直接返回结果，而异步 API 会通过回调返回结果。开发者需要根据 API 的回调方式处理逻辑，传入正确的参数处理业务。

如 `setStorageSync` 为同步 API，`setStorage` 为异步 API：

```javascript
wx.setStorage({
  key: 'key',
  data: 'value'
})

try {
  wx.setStorageSync('key', 'value')
} catch (e) { }

```





##### login.wxml

wxml 指的是WeiXin Markup Language,小程序标准与web标准一样使用标记语言构建页面结构，他使用了wxml这种类似html的标记语言

```xml
<text>登陆信息</text> // 相当于 <span></span> // 行内元素
<view>用户名</view> // 相当于 <div></div> // 块级元素
<input/> // 相当于<input/>
<view>密码</view>
<input/>
// https://developers.weixin.qq.com/s/cZWIojm47pjN
<map></map> // 小程序封装的地图组件
```

组件是小程序提供给开发者来创建页面 UI，自定义 WXML 的。开发者可以以灵活的方式自由组合各种组件，去构建属于自己的页面 UI。



