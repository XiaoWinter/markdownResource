## [Ifream](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)

#### 定义

 **HTML内联框架元素 (``)** 表示嵌套的[browsing context](https://developer.mozilla.org/en-US/docs/Glossary/browsing_context)。它能够将另一个HTML页面嵌入到当前页面中 

#### 注意(补充解释)

每个嵌入的浏览上下文（embedded browsing context）都有自己的[会话历史记录(session history)](https://developer.mozilla.org/zh-CN/docs/Web/API/History)和[DOM树](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)。包含嵌入内容的浏览上下文称为*父级浏览上下文*。顶级浏览上下文（没有父级）通常是由 [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 对象表示的浏览器窗口。 

> BOM对象中

* top代表顶级浏览器上下文

* self代表当前浏览器上下文

* window也代表当前浏览器上下文



#### 重要属性

#####  src

 **srcdoc** 

 **`width`** 

 **`name`** 

 **`height`** 

####  扩展

##### referrer: **`Document.referrer`** 返回 跳转或打开到当前页面 的页面的 [URI](http://www.w3.org/Addressing/#background)。 

##### iframe跨域通信



##### 防止页面被iframe

`if(top.location!==self.location){top.location.href=self.location.href; }`







