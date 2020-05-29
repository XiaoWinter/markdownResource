## JS知识

### 如何自定义一个事件

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <title>A</title>
</head>
<body>
<script>
    var orignalSetItem = localStorage.setItem;
    localStorage.setItem = function(key,newValue){
        var setItemEvent = new Event("setItemEvent");
        setItemEvent.newValue = newValue;
        //分发事件
        window.dispatchEvent(setItemEvent);
        orignalSetItem.apply(this,arguments);
    }
    //监听事件
    window.addEventListener("setItemEvent", function (e) {
        alert(e.newValue);
    });
    localStorage.setItem("nm","1234");
</script>
</body>
</html>
```

#### 获取当天凌晨

```js
new Date().setHours(0, 0, 0, 0)
```



 [**`Uint8Array`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。 

#### 格式化

`JSON.parse(data)`

#### 实现模板替换

方式一（工具方法）

```js
function substitute(data,template) {//vue中插值表达式的写法，/\{\{(.*)\}\}/
            return data && typeof(data) == 'object' ? template.replace(/\{([^{}]+)\}/g, 					function (match, key) {
                    var key = key.split('.'), value = data;
                    var len = key.length;
                    for (var i = 0; i < len; i++) {
                        value = value[key[i]];
                        if (!value) break;
                    }
                    return void 0 !== value ? '' + value : '';
                }) : template.toString();
            },   
```
方式二（修改String原型）
```js
function substitute(data) {//
            return data && typeof(data) == 'object' ? this.replace(/\{([^{}]+)\}/g, function (match, key) {
                var key = key.split('.'), value = data;
                var len = key.length;
                for (var i = 0; i < len; i++) {
                    value = value[key[i]];
                    if (!value) break;
                }
                return void 0 !== value ? '' + value : '';
            }) : this.toString();
        },
String.prototype.substitute = substitute
```

#### 如何平滑滚动到页面顶部

###### window.requestAnimationFrame

 https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame 

```js
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
}

// 事例
scrollToTop()

```

`window.requestAnimationFrame()` 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

`requestAnimationFrame`：优势：由系统决定回调函数的执行时机。60Hz的刷新频率，那么每次刷新的间隔中会执行一次回调函数，不会引起丢帧，不会卡顿。

###### scrollTo 

 https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollTo 

```js
window.scrollTo(x-coord,y-coord )

window.scrollTo(options)
```

```js
window.scrollTo( 0, 1000 );

// 设置滚动行为改为平滑的滚动
window.scrollTo({ 
    top: 1000, 
    behavior: "smooth" 
});
```



###### Element.scrollIntoView

 https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView 

```js
element.scrollIntoView(); // 等同于element.scrollIntoView(true) 
element.scrollIntoView(alignToTop); // Boolean型参数 
element.scrollIntoView(scrollIntoViewOptions); // Object型参数
```

```js
var element = document.getElementById("box");

element.scrollIntoView();
element.scrollIntoView(false);
element.scrollIntoView({block: "end"});
element.scrollIntoView({behavior: "instant", block: "end", inline: "nearest"});
```



### 如何检查指定的元素在视口中是否可见？

```
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

// 事例
elementIsVisibleInViewport(el); // 需要左右可见
elementIsVisibleInViewport(el, true); // 需要全屏(上下左右)可以见

```

### 如何获取元素中的所有图像？

```js
const getImages = (el, includeDuplicates = false) => {
  const images = [...el.getElementsByTagName('img')].map(img => img.getAttribute('src'));
  return includeDuplicates ? images : [...new Set(images)];
};

// 事例：includeDuplicates 为 true 表示需要排除重复元素
getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
getImages(document, false); // ['image1.jpg', 'image2.png', '...']


```

### 如何确定设备是移动设备还是台式机/笔记本电脑？

```js
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';

// 事例
detectDeviceType(); // "Mobile" or "Desktop"


```

### 如何创建一个包含当前URL参数的对象？

```js
const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
    {}
  );

// 事例
getURLParameters('http://url.com/page?n=Adam&s=Smith'); // {n: 'Adam', s: 'Smith'}
getURLParameters('google.com'); // {}

```

### 如何将一组表单元素转化为对象？

```js
const formToObject = form =>
  Array.from(new FormData(form)).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value
    }),
    {}
  );

// 事例
formToObject(document.querySelector('#form')); 
// { email: 'test@email.com', name: 'Test Name' }

```

### 如何获取给定毫秒的可读格式

```js
const formatDuration = ms => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  };
  return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
    .join(', ');
};

// 事例
formatDuration(1001); // '1 second, 1 millisecond'
formatDuration(34325055574); 
// '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'

```



### 为什么URL需要编码

 URL就是网址，只要上网，就一定会用到。 

 一般来说，URL只能使用英文字母、阿拉伯数字和某些标点符号，不能使用其他文字和符号。比如，世界上有英文字母的网址"http://www.abc.com"，但是没有希腊字母的网址"http://www.aβγ.com"（读作阿尔法-贝塔-伽玛.com）。这是因为网络标准[RFC 1738](http://www.ietf.org/rfc/rfc1738.txt)做了硬性规定： 

```
"...Only alphanumerics [0-9a-zA-Z], the special characters "$-_.+!*'()," [not including the quotes - ed], and reserved characters used for their reserved purposes may be used unencoded within a URL."

"只有字母和数字[0-9a-zA-Z]、一些特殊符号"$-_.+!*'(),"[不包括双引号]、以及某些保留字，才可以不经过编码直接用于URL。"
```



 https://www.ruanyifeng.com/blog/2010/02/url_encoding.html 



### [Number类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)

根据 ECMAScript 标准，JavaScript 中只有一种数字类型：基于 IEEE 754 标准的双精度 64 位二进制格式的值 **[-2^53^, 2^53^]** 。**它并没有为整数给出一种特定的类型**。除了能够表示浮点数外，还有一些带符号的值：`+Infinity`，`-Infinity` 和 `NaN` (非数值，Not-a-Number)。

#### 浮点数

<img src="http://47.103.65.182/markdown/095.png" />

#### [IEEE 754是什么](https://mp.weixin.qq.com/s/mf1mH-aGWgcC6v2R8ijE8A)

#### [wiki](https://zh.wikipedia.org/wiki/IEEE_754#64%E4%BD%8D%E9%9B%99%E7%B2%BE%E5%BA%A6)

#### [js的连续整数区间](https://blog.csdn.net/qizhiqq/article/details/78914523)

#### [为什么js的连续整数区间在[-2^53^, 2^53^]](https://blog.csdn.net/seizef/article/details/5571783)

<img src="http://47.103.65.182/markdown/094.png" />

js可以取到的连续的整数范围，并不是可以表示的最大整数范围，连续的整数范围是取决于尾数的精度  

 **[-2^53^, 2^53^]** 



18！=      6,402,373,705,728,000

2^53^   =      9,007,199,254,740,992‬

19！ = 121,645,100,408,832,000

[英文资料](https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html)

js的连续整数没有达到19的阶乘，因此在超出2^54^时不能安心使用Number类型来进行排列组合计算,可能会出现数字落不到浮点数的表示上，会损失精度，但是经过测试，19，20，21...的阶乘可以被算出来,乘除法好像也没有问题，加减法可以明显看到损失精度

### [BigInt类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

**BigInt** 是一种内置对象，它提供了一种方法来表示大于 2^53^ - 1 的整数。这原本是 Javascript中可以用 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 表示的最大数字。**BigInt** 可以表示**任意大的整数**。

###### 使用方式

可以用在一个整数字面量后面加 `n` 的方式定义一个 `BigInt` ，如：`10n`，或者调用函数`BigInt()`。

```js
const theBiggestInt = 9007199254740991n;

const alsoHuge = BigInt(9007199254740991);
// ↪ 9007199254740991n
```



###### 注意：

* 不能用于 [`Math`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math) 对象中的方法；
* **不能和任何 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 实例混合运算，两者必须转换成同一种类型**。
* `BigInt` 变量在转换成 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 变量时可能会丢失精度
* 使用 `typeof` 测试时， `BigInt` 对象返回 "bigint" ：
* **BigInt可以使用的操作符有** `+`、``*``、``-``、``**``、``%`` 。
* `/` **操作符对于整数的运算也没问题**。可是因为这些变量是 `BigInt` 而不是 `BigDecimal` ，**该操作符结果会向零取整**，也就是说不会返回小数部分。
* 除 `>>>` （无符号右移）之外的 [位操作](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) 也可以支持。
* `BigInt` 不支持单目 (`+`) 运算符





由于对 `BigInt` 的操作不是常数时间的，因而 `BigInt` [不适合用于密码学](https://www.chosenplaintext.ca/articles/beginners-guide-constant-time-cryptography.html)。因为会受到时序攻击

```
举一个最简单的计时攻击的例子，某个函数负责比较用户输入的密码和存放在系统内密码是否相同，如果该函数是从第一位开始比较，发现不同就立即返回，那么通过计算返回的速度就知道了大概是哪一位开始不同的，这样就实现了电影中经常出现的按位破解密码的场景。密码破解复杂度成千上万倍甚至百万千万倍的下降。

作者：shotgun
链接：https://www.zhihu.com/question/20156213/answer/43377769
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```



### 阶乘

```js
//阶乘
function fact(n) {
    let result = 1n
    for(let i=0; i<n; i++){
        result *= BigInt(i+1)
    }
    return result
}
```





### 排列A^m^ ~n~

```js
//排列的算法 n 底数 m 指数
function A(n,m) {
    let result = 1n
    for(let i=0;i<m;i++){
        result *= BigInt(n-i)
    }
    return result
}
```



### 组合C^m^ ~n~

```js

//组合的算法 n 底数 m 指数
function C(n,m) {
    return A(n,m)/fact(m)
}
```



### 提升服务器的响应能力

作者：神三元链接：https://juejin.im/post/5e76bd516fb9a07cce750746来源：掘金著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

#### 什么是 HTTP 队头阻塞？

HTTP 传输是基于`请求-应答`的模式进行的，报文必须是一发一收，但值得注意的是，里面的任务被放在一个任务队列中串行执行，一旦队首的请求处理太慢，就会阻塞后面请求的处理。这就是著名的`HTTP队头阻塞`问题。 

#### 并发连接

对于一个域名允许分配多个长连接，那么相当于增加了任务队列，不至于一个队伍的任务阻塞其它所有任务。在RFC2616规定过客户端最多并发 2 个连接，不过事实上在现在的浏览器标准中，这个上限要多很多，Chrome 中是 6 个。

但其实，即使是提高了并发连接，还是不能满足人们对性能的需求。

#### 域名分片

一个域名不是可以并发 6 个长连接吗？那我就多分几个域名。

比如 content1.sanyuan.com 、content2.sanyuan.com。

这样一个`sanyuan.com`域名下可以分出非常多的二级域名，而它们都指向同样的一台服务器，能够并发的长连接数更多了，事实上也更好地解决了队头阻塞的问题。


<img src="http://47.103.65.182/markdown/099.png">

### 为什么产生代理缓存？

作者：神三元链接：https://juejin.im/post/5e76bd516fb9a07cce750746来源：掘金著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



对于源服务器来说，它也是有缓存的，比如**Redis, Memcache**，但对于 HTTP 缓存来说，如果每次客户端缓存失效都要到源服务器获取，那给源服务器的压力是很大的。

由此引入了**缓存代理**的机制。让`代理服务器`接管一部分的服务端HTTP缓存，客户端缓存过期后**就近**到代理缓存中获取，代理缓存过期了才请求源服务器，这样流量巨大的时候能明显降低源服务器的压力。

那缓存代理究竟是如何做到的呢？

总的来说，缓存代理的控制分为两部分，一部分是**源服务器**端的控制，一部分是**客户端**的控制。

### 跨域

 为了防止黑客通过脚本触碰到系统资源，浏览器将每一个渲染进程装进了沙箱，并且为了防止 CPU 芯片一直存在的**Spectre** 和 **Meltdown**漏洞，采取了`站点隔离`的手段，给每一个不同的站点(一级域名不同)分配了沙箱，互不干扰。 

在沙箱当中的渲染进程是没有办法发送网络请求的，那怎么办？只能通过网络进程来发送。那这样就涉及到进程间通信(IPC，Inter Process Communication)了。接下来我们看看 chromium 当中进程间通信是如何完成的，在 chromium 源码中调用顺序如下:

<img src=" https://user-gold-cdn.xitu.io/2020/3/22/170ffd924eaecb41?imageslim ">

 在服务端处理完数据后，将响应返回，主进程检查到跨域，且没有cors(后面会详细说)响应头，将响应体全部丢掉，并不会发送给渲染进程。这就达到了拦截数据的目的。 

### 进程间通讯（Unix domain socket）

作者 https://www.cnblogs.com/sparkdev/p/8359028.html 

 **Unix domain socket 又叫 IPC(inter-process communication 进程间通信) socket，用于实现同一主机上的进程间通信。**socket 原本是为网络通讯设计的，但后来在 socket 的框架上发展出一种 IPC 机制，就是 UNIX domain socket。虽然网络 socket 也可用于同一台主机的进程间通讯(通过 loopback 地址 127.0.0.1)，但是 UNIX domain socket 用于 IPC 更有效率：不需要经过网络协议栈，不需要打包拆包、计算校验和、维护序号和应答等，只是将应用层数据从一个进程拷贝到另一个进程。这是因为，IPC 机制本质上是可靠的通讯，而网络协议是为不可靠的通讯设计的。
UNIX domain socket 是全双工的，API 接口语义丰富，相比其它 IPC 机制有明显的优越性，目前已成为使用最广泛的 IPC 机制，比如 X Window 服务器和 GUI 程序之间就是通过 UNIX domain socket 通讯的。
Unix domain socket 是 POSIX 标准中的一个组件，所以不要被名字迷惑，linux 系统也是支持它的。 

### HTTP/2 有哪些改进？

由于 HTTPS 在安全方面已经做的非常好了，HTTP 改进的关注点放在了性能方面。对于 HTTP/2 而言，它对于性能的提升主要在于两点:

- 头部压缩
- 多路复用

当然还有一些颠覆性的功能实现:

- 设置请求优先级
- 服务器推送

这些重大的提升本质上也是为了解决 HTTP 本身的问题而产生的。接下来我们来看看 HTTP/2 解决了哪些问题，以及解决方式具体是如何的。

#### 头部压缩

在 HTTP/1.1 及之前的时代，**请求体**一般会有响应的压缩编码过程，通过`Content-Encoding`头部字段来指定，但你有没有想过头部字段本身的压缩呢？当请求字段非常复杂的时候，尤其对于 GET 请求，请求报文几乎全是请求头，这个时候还是存在非常大的优化空间的。HTTP/2 针对头部字段，也采用了对应的压缩算法——HPACK，对请求头进行压缩。


作者：神三元链接：https://juejin.im/post/5e76bd516fb9a07cce750746来源：掘金著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

HPACK 算法是专门为 HTTP/2 服务的，它主要的亮点有两个：

- 首先是在服务器和客户端之间建立哈希表，将用到的字段存放在这张表中，那么在传输的时候对于之前出现过的值，只需要把**索引**(比如0，1，2，...)传给对方即可，对方拿到索引查表就行了。这种**传索引**的方式，可以说让请求头字段得到极大程度的精简和复用。

* 其次是对于整数和字符串进行**哈夫曼编码**，哈夫曼编码的原理就是先将所有出现的字符建立一张索引表，然后让出现次数多的字符对应的索引尽可能短，传输的时候也是传输这样的**索引序列**，可以达到非常高的压缩率。 

#### 多路复用

##### HTTP 队头阻塞

我们之前讨论了 HTTP 队头阻塞的问题，其根本原因在于HTTP 基于`请求-响应`的模型，在同一个 TCP 长连接中，前面的请求没有得到响应，后面的请求就会被阻塞。

后面我们又讨论到用**并发连接**和**域名分片**的方式来解决这个问题，但这并没有真正从 HTTP 本身的层面解决问题，只是增加了 TCP 连接，分摊风险而已。而且这么做也有弊端，多条 TCP 连接会竞争**有限的带宽**，让真正优先级高的请求不能优先处理。



##### 二进制分帧

首先，HTTP/2 认为明文传输对机器而言太麻烦了，不方便计算机的解析，因为对于文本而言会有多义性的字符，比如回车换行到底是内容还是分隔符，在内部需要用到状态机去识别，效率比较低。于是 HTTP/2 干脆把报文全部换成二进制格式，全部传输`01`串，方便了机器的解析。

原来`Headers + Body`的报文格式如今被拆分成了一个个二进制的帧，用**Headers帧**存放头部字段，**Data帧**存放请求体数据。分帧之后，服务器看到的不再是一个个完整的 HTTP 请求报文，而是一堆乱序的二进制帧。这些二进制帧不存在先后关系，因此也就不会排队等待，也就没有了 HTTP 的队头阻塞问题。

 通信双方都可以给对方发送二进制帧，这种二进制帧的**双向传输的序列**，也叫做`流`(Stream)。HTTP/2 用`流`来在一个 TCP 连接上来进行多个数据帧的通信，这就是**多路复用**的概念。 

可能你会有一个疑问，既然是乱序首发，那最后如何来处理这些乱序的数据帧呢？

首先要声明的是，所谓的乱序，指的是不同 ID 的 Stream 是乱序的，但同一个 Stream ID 的帧一定是按顺序传输的。二进制帧到达后对方会将 Stream ID 相同的二进制帧组装成完整的**请求报文**和**响应报文**。当然，在二进制帧当中还有其他的一些字段，实现了**优先级**和**流量控制**等功能，我们放到下一节再来介绍。



##### 服务器推送

另外值得一说的是 HTTP/2 的服务器推送(Server Push)。在 HTTP/2 当中，服务器已经不再是完全被动地接收请求，响应请求，它也能新建 stream 来给客户端发送消息，当 TCP 连接建立之后，比如浏览器请求一个 HTML 文件，服务器就可以在返回 HTML 的基础上，将 HTML 中引用到的其他资源文件一起返回给客户端，减少客户端的等待。


<img src=" https://user-gold-cdn.xitu.io/2020/3/22/170ffdc6783132a5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1 ">

### 帧结构

<img src=" https://user-gold-cdn.xitu.io/2020/3/22/170ffdc9e9c25e93?imageView2/0/w/1280/h/960/format/webp/ignore-error/1 ">

### blob和stream的区别

[二进制数据结构的区别](https://www.cnblogs.com/youhong/p/10875190.html)

- 相同点： Blob和ArrayBuffer都是二进制的容器；
- ArrayBuffer：ArrayBuffer更底层，就是一段纯粹的内存上的二进制数据，我们可以对其任何一个字节进行单独的修改，也可以根据我们的需要以我们指定的形式读取指定范围的数据
- Blob：Blob就是将一段二进制数据做了一个封装，我们拿到的就是一个整体，可以看到它的整体属性大小、类型；可以对其分割，但不能了解到它的细节
- 联系：Blob可以接受一个ArrayBuffer作为参数生成一个Blob对象，此行为就相当于对ArrayBuffer数据做一个封装，之后就是以整体的形式展现了
- 应用上的区别：由于ArrayBuffer和Blob的特性，Blo作为一个整体文件，适合用于传输；而只有需要关注细节（比如要修改某一段数据时），才需要用到ArrayBuffer

### 如何优雅地给函数对象加属性

```js
var rootPath = "xxx"
var config = {
    home:req=>rootPath+"/index.html"
    database:(args=>{
        var func = req=>rootPath+"/data"+req.query.id+".html"
        for (const [file,path] of Object.entries(args))  func[file] = path
        return func
    })({
        catelog:req=>rootPath+"/database/catelog-create.html",
    })
}
```

### 模板替换

```js
   function substitute(data, template) { //vue中插值表达式的写法，/\{\{(.*)\}\}/
            return data && typeof (data) == 'object' ? template.replace(/\{([^\{]*)\}/g, 				function (match, key) {
                var key = key.split('.'),
                    value = data;
                var len = key.length;
                for (var i = 0; i < len; i++) {
                    value = value[key[i]];
                    if (!value) break;
                }
              
                return void 0 !== value ? '' + value : '';
            }) : template.toString();
        }
```



### 时间对象解析

```js
function parseDate(date){

    let year = date.getFullYear()
    let month = (date.getMonth() + 1)<10 ? "0"+(date.getMonth() + 1):(date.getMonth() + 1)
    let day = date.getDate()<10 ? "0"+date.getDate() : date.getDate()
    let hour = date.getHours()<10 ? "0"+date.getHours() : date.getHours()
    let minutes = date.getMinutes()<10 ? "0"+date.getMinutes():date.getMinutes()
    let seconds = date.getSeconds()<10 ? "0"+date.getSeconds():date.getSeconds()
    let timestamp = date.getTime()
    
    return {
        year,
        month,
        day,
        hour,
        minutes,
        seconds,
        timestamp,
    }
}
```

### 数组乱序

引用[云中桥](https://juejin.im/post/5d004ad95188257c6b518056)

```js
//乱序算法
function shuffle(arr) {
    let m = arr.length;
    while (m > 1){
        let index = Math.floor(Math.random() * m--);
        [arr[m] , arr[index]] = [arr[index] , arr[m]]
    }
    return arr;
}
```





### 获取Query参数

##### 方法一

```js
 //获取query参数
        function loadPageVar(sVar) {
            return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(
                /[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        }
```

##### 方法二

```js
var url = "https://www.dogedoge.com/results?q=%E8%A2%AB%E5%AD%90"
var paramsString = url.split("?")[1]
var searchParams = new URLSearchParams(paramsString);
//p=>["q", "被子"]
for (let p of searchParams) {
  console.log(p);
}


//URLSearchParams可用方法
searchParams.has("topic") === true; // true
searchParams.get("topic") === "api"; // true
searchParams.getAll("topic"); // ["api"]
searchParams.get("foo") === null; // true
searchParams.append("topic", "webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
searchParams.set("topic", "More webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"
searchParams.delete("topic");
searchParams.toString(); // "q=URLUtils.searchParams"

//URLSearchParams查询方法
searchParams.get("topic") === "api"; // true
searchParams.getAll("topic"); // ["api"]
```



### js获取浏览器版本

```js
function getBroswer(){
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/edge\/([\d.]+)/)) ? Sys.edge = s[1] :
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

    if (Sys.edge) return { broswer : "Edge", version : Sys.edge };
    if (Sys.ie) return { broswer : "IE", version : Sys.ie };
    if (Sys.firefox) return { broswer : "Firefox", version : Sys.firefox };
    if (Sys.chrome) return { broswer : "Chrome", version : Sys.chrome };
    if (Sys.opera) return { broswer : "Opera", version : Sys.opera };
    if (Sys.safari) return { broswer : "Safari", version : Sys.safari };
    
    return { broswer : "", version : "0" };
}
var abc = getBroswer();
alert("broswer:"+abc.broswer+" version:"+abc.version);
```



### node获取IP

```js
//iptable['WLAN:1']

module.exports = function(){
    var os=require('os'),
    iptable={},
    ifaces=os.networkInterfaces();
    // console.log(ifaces)
    for (var dev in ifaces) {
        ifaces[dev].forEach(function(details,alias){
            if (details.family=='IPv4') {
            iptable[dev+(alias?':'+alias:'')]=details.address;
            }
        });
    }
    return iptable['WLAN:1']
}
```

### 安装sass

```js
npm i  node-sass -D  --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

### 数据写到文件

```js
//获取大数据
let a = JSON.stringify(renderData)
fs.writeFileSync(__dirname+'/1.txt',a,function(err){})
```

