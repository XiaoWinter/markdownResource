## TMS微信小程序开发

topic: 微信小程序是由对微信的webView的优化。

### context

#### webView

webView: Android，IOS的SDK（software development kit）中提供了一个webView控件用来渲染网页，这些控件，用于移动端 APP 嵌入(Embed) Web 技术，加载 Web 内容；**基于 Webkit 引擎**；Andoid、IOS 平台 Browser，**基于 Webkit 引擎**；例如chrome的v8引擎。

<img src="https://handtms-static.obs.cn-east-3.myhuaweicloud.com/component/0/8ac4c181640b43d494b59d33737010e1%402.png" style="zoom: 67%;" />



#### 混合APP

混合APP（hybrid app）：对于混合APP来说，使用webview渲染的页面作为应用的一部分。APP可以向webview的全局对象添加一个可以与原生App交互的对象，这个对象被称为jsBridge。它的作用是让网页调用其中的方法，来调用原生app的能力，比如拍照，访问相册。

<img src="https://handtms-static.obs.cn-east-3.myhuaweicloud.com/component/0/6f72abb3c0d04af688793dd4724cb9b3%403.png" style="zoom: 67%;" />



小程序的变化

微信小程序原本只是带有webview的app,后来微信通过jsBridge增加了一些提供给内部使用的功能，微信这时可以看作一个混合APP。











<img src="https://handtms-static.obs.cn-east-3.myhuaweicloud.com/component/0/0fb14da8ed4b46b2a748947ea1964b3e%401.png" style="zoom:80%;" />



