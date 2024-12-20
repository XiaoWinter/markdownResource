## JS 知识

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
      localStorage.setItem = function (key, newValue) {
        var setItemEvent = new Event("setItemEvent");
        setItemEvent.newValue = newValue;
        //分发事件
        window.dispatchEvent(setItemEvent);
        orignalSetItem.apply(this, arguments);
      };
      //监听事件
      window.addEventListener("setItemEvent", function (e) {
        alert(e.newValue);
      });
      localStorage.setItem("nm", "1234");
    </script>
  </body>
</html>
```

#### 获取当天凌晨

```js
new Date().setHours(0, 0, 0, 0);
```

[**`Uint8Array`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) 数组类型表示一个 8 位无符号整型数组，创建时内容被初始化为 0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。

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

方式二（修改 String 原型）

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
};

// 事例
scrollToTop();
```

`window.requestAnimationFrame()` 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

`requestAnimationFrame`：优势：由系统决定回调函数的执行时机。60Hz 的刷新频率，那么每次刷新的间隔中会执行一次回调函数，不会引起丢帧，不会卡顿。

###### scrollTo

https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollTo

```js
window.scrollTo(x - coord, y - coord);

window.scrollTo(options);
```

```js
window.scrollTo(0, 1000);

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
element.scrollIntoView({ block: "end" });
element.scrollIntoView({
  behavior: "instant",
  block: "end",
  inline: "nearest"
});
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
  const images = [...el.getElementsByTagName("img")].map((img) =>
    img.getAttribute("src")
  );
  return includeDuplicates ? images : [...new Set(images)];
};

// 事例：includeDuplicates 为 true 表示需要排除重复元素
getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
getImages(document, false); // ['image1.jpg', 'image2.png', '...']
```

### 如何确定设备是移动设备还是台式机/笔记本电脑？

```js
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? "Mobile"
    : "Desktop";

// 事例
detectDeviceType(); // "Mobile" or "Desktop"
```

### 如何创建一个包含当前 URL 参数的对象？

```js
const getURLParameters = (url) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ),
    {}
  );

// 事例
getURLParameters("http://url.com/page?n=Adam&s=Smith"); // {n: 'Adam', s: 'Smith'}
getURLParameters("google.com"); // {}
```

### 如何将一组表单元素转化为对象？

```js
const formToObject = (form) =>
  Array.from(new FormData(form)).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value
    }),
    {}
  );

// 事例
formToObject(document.querySelector("#form"));
// { email: 'test@email.com', name: 'Test Name' }
```

### 如何获取给定毫秒的可读格式

```js
const formatDuration = (ms) => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  };
  return Object.entries(time)
    .filter((val) => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? "s" : ""}`)
    .join(", ");
};

// 事例
formatDuration(1001); // '1 second, 1 millisecond'
formatDuration(34325055574);
// '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'
```

### 为什么 URL 需要编码

URL 就是网址，只要上网，就一定会用到。

一般来说，URL 只能使用英文字母、阿拉伯数字和某些标点符号，不能使用其他文字和符号。比如，世界上有英文字母的网址"http://www.abc.com"，但是没有希腊字母的网址"http://www.aβγ.com"（读作阿尔法-贝塔-伽玛.com）。这是因为网络标准[RFC 1738](http://www.ietf.org/rfc/rfc1738.txt)做了硬性规定：

```
"...Only alphanumerics [0-9a-zA-Z], the special characters "$-_.+!*'()," [not including the quotes - ed], and reserved characters used for their reserved purposes may be used unencoded within a URL."

"只有字母和数字[0-9a-zA-Z]、一些特殊符号"$-_.+!*'(),"[不包括双引号]、以及某些保留字，才可以不经过编码直接用于URL。"
```

https://www.ruanyifeng.com/blog/2010/02/url_encoding.html

### [Number 类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)

根据 ECMAScript 标准，JavaScript 中只有一种数字类型：基于 IEEE 754 标准的双精度 64 位二进制格式的值 **[-2^53^, 2^53^]** 。**它并没有为整数给出一种特定的类型**。除了能够表示浮点数外，还有一些带符号的值：`+Infinity`，`-Infinity` 和 `NaN` (非数值，Not-a-Number)。

#### 浮点数

![095](https://typora-huang-cong.oss-cn-shanghai.aliyuncs.com/095.png)

#### [IEEE 754 是什么](https://mp.weixin.qq.com/s/mf1mH-aGWgcC6v2R8ijE8A)

#### [wiki](https://zh.wikipedia.org/wiki/IEEE_754#64%E4%BD%8D%E9%9B%99%E7%B2%BE%E5%BA%A6)

#### [js 的连续整数区间](https://blog.csdn.net/qizhiqq/article/details/78914523)

#### [为什么 js 的连续整数区间在[-2^53^, 2^53^]](https://blog.csdn.net/seizef/article/details/5571783)

![094](https://typora-huang-cong.oss-cn-shanghai.aliyuncs.com/094.png)

js 可以取到的连续的整数范围，并不是可以表示的最大整数范围，连续的整数范围是取决于尾数的精度

**[-2^53^, 2^53^]**

18！= 6,402,373,705,728,000

2^53^ = 9,007,199,254,740,992‬

19！ = 121,645,100,408,832,000

[英文资料](https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html)

js 的连续整数没有达到 19 的阶乘，因此在超出 2^54^时不能安心使用 Number 类型来进行排列组合计算,可能会出现数字落不到浮点数的表示上，会损失精度，但是经过测试，19，20，21...的阶乘可以被算出来,乘除法好像也没有问题，加减法可以明显看到损失精度

### [BigInt 类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

**BigInt** 是一种内置对象，它提供了一种方法来表示大于 2^53^ - 1 的整数。这原本是 Javascript 中可以用 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 表示的最大数字。**BigInt** 可以表示**任意大的整数**。

###### 使用方式

可以用在一个整数字面量后面加 `n` 的方式定义一个 `BigInt` ，如：`10n`，或者调用函数`BigInt()`。

```js
const theBiggestInt = 9007199254740991n;

const alsoHuge = BigInt(9007199254740991);
// ↪ 9007199254740991n
```

###### 注意：

- 不能用于 [`Math`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math) 对象中的方法；
- **不能和任何 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 实例混合运算，两者必须转换成同一种类型**。
- `BigInt` 变量在转换成 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 变量时可能会丢失精度
- 使用 `typeof` 测试时， `BigInt` 对象返回 "bigint" ：
- **BigInt 可以使用的操作符有** `+`、`*`、`-`、`**`、`%` 。
- `/` **操作符对于整数的运算也没问题**。可是因为这些变量是 `BigInt` 而不是 `BigDecimal` ，**该操作符结果会向零取整**，也就是说不会返回小数部分。
- 除 `>>>` （无符号右移）之外的 [位操作](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) 也可以支持。
- `BigInt` 不支持单目 (`+`) 运算符

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
  let result = 1n;
  for (let i = 0; i < n; i++) {
    result *= BigInt(i + 1);
  }
  return result;
}
```

### 排列 A^m^ ~n~

```js
//排列的算法 n 底数 m 指数
function A(n, m) {
  let result = 1n;
  for (let i = 0; i < m; i++) {
    result *= BigInt(n - i);
  }
  return result;
}
```

### 组合 C^m^ ~n~

```js
//组合的算法 n 底数 m 指数
function C(n, m) {
  return A(n, m) / fact(m);
}
```

### 提升服务器的响应能力

作者：神三元链接：https://juejin.im/post/5e76bd516fb9a07cce750746来源：掘金著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

#### 什么是 HTTP 队头阻塞？

HTTP 传输是基于`请求-应答`的模式进行的，报文必须是一发一收，但值得注意的是，里面的任务被放在一个任务队列中串行执行，一旦队首的请求处理太慢，就会阻塞后面请求的处理。这就是著名的`HTTP队头阻塞`问题。

#### 并发连接

对于一个域名允许分配多个长连接，那么相当于增加了任务队列，不至于一个队伍的任务阻塞其它所有任务。在 RFC2616 规定过客户端最多并发 2 个连接，不过事实上在现在的浏览器标准中，这个上限要多很多，Chrome 中是 6 个。

但其实，即使是提高了并发连接，还是不能满足人们对性能的需求。

#### 域名分片

一个域名不是可以并发 6 个长连接吗？那我就多分几个域名。

比如 content1.sanyuan.com 、content2.sanyuan.com。

这样一个`sanyuan.com`域名下可以分出非常多的二级域名，而它们都指向同样的一台服务器，能够并发的长连接数更多了，事实上也更好地解决了队头阻塞的问题。

![099](https://typora-huang-cong.oss-cn-shanghai.aliyuncs.com/099.png)

### 为什么产生代理缓存？

作者：神三元链接：https://juejin.im/post/5e76bd516fb9a07cce750746来源：掘金著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

对于源服务器来说，它也是有缓存的，比如**Redis, Memcache**，但对于 HTTP 缓存来说，如果每次客户端缓存失效都要到源服务器获取，那给源服务器的压力是很大的。

由此引入了**缓存代理**的机制。让`代理服务器`接管一部分的服务端 HTTP 缓存，客户端缓存过期后**就近**到代理缓存中获取，代理缓存过期了才请求源服务器，这样流量巨大的时候能明显降低源服务器的压力。

那缓存代理究竟是如何做到的呢？

总的来说，缓存代理的控制分为两部分，一部分是**源服务器**端的控制，一部分是**客户端**的控制。

### 跨域

为了防止黑客通过脚本触碰到系统资源，浏览器将每一个渲染进程装进了沙箱，并且为了防止 CPU 芯片一直存在的**Spectre** 和 **Meltdown**漏洞，采取了`站点隔离`的手段，给每一个不同的站点(一级域名不同)分配了沙箱，互不干扰。

在沙箱当中的渲染进程是没有办法发送网络请求的，那怎么办？只能通过网络进程来发送。那这样就涉及到进程间通信(IPC，Inter Process Communication)了。接下来我们看看 chromium 当中进程间通信是如何完成的，在 chromium 源码中调用顺序如下:

![image-20241128233420489](https://typora-huang-cong.oss-cn-shanghai.aliyuncs.com/image-20241128233420489.png)

在服务端处理完数据后，将响应返回，主进程检查到跨域，且没有 cors(后面会详细说)响应头，将响应体全部丢掉，并不会发送给渲染进程。这就达到了拦截数据的目的。

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

- 首先是在服务器和客户端之间建立哈希表，将用到的字段存放在这张表中，那么在传输的时候对于之前出现过的值，只需要把**索引**(比如 0，1，2，...)传给对方即可，对方拿到索引查表就行了。这种**传索引**的方式，可以说让请求头字段得到极大程度的精简和复用。

* 其次是对于整数和字符串进行**哈夫曼编码**，哈夫曼编码的原理就是先将所有出现的字符建立一张索引表，然后让出现次数多的字符对应的索引尽可能短，传输的时候也是传输这样的**索引序列**，可以达到非常高的压缩率。

#### 多路复用

##### HTTP 队头阻塞

我们之前讨论了 HTTP 队头阻塞的问题，其根本原因在于 HTTP 基于`请求-响应`的模型，在同一个 TCP 长连接中，前面的请求没有得到响应，后面的请求就会被阻塞。

后面我们又讨论到用**并发连接**和**域名分片**的方式来解决这个问题，但这并没有真正从 HTTP 本身的层面解决问题，只是增加了 TCP 连接，分摊风险而已。而且这么做也有弊端，多条 TCP 连接会竞争**有限的带宽**，让真正优先级高的请求不能优先处理。

##### 二进制分帧

首先，HTTP/2 认为明文传输对机器而言太麻烦了，不方便计算机的解析，因为对于文本而言会有多义性的字符，比如回车换行到底是内容还是分隔符，在内部需要用到状态机去识别，效率比较低。于是 HTTP/2 干脆把报文全部换成二进制格式，全部传输`01`串，方便了机器的解析。

原来`Headers + Body`的报文格式如今被拆分成了一个个二进制的帧，用**Headers 帧**存放头部字段，**Data 帧**存放请求体数据。分帧之后，服务器看到的不再是一个个完整的 HTTP 请求报文，而是一堆乱序的二进制帧。这些二进制帧不存在先后关系，因此也就不会排队等待，也就没有了 HTTP 的队头阻塞问题。

通信双方都可以给对方发送二进制帧，这种二进制帧的**双向传输的序列**，也叫做`流`(Stream)。HTTP/2 用`流`来在一个 TCP 连接上来进行多个数据帧的通信，这就是**多路复用**的概念。

可能你会有一个疑问，既然是乱序首发，那最后如何来处理这些乱序的数据帧呢？

首先要声明的是，所谓的乱序，指的是不同 ID 的 Stream 是乱序的，但同一个 Stream ID 的帧一定是按顺序传输的。二进制帧到达后对方会将 Stream ID 相同的二进制帧组装成完整的**请求报文**和**响应报文**。当然，在二进制帧当中还有其他的一些字段，实现了**优先级**和**流量控制**等功能，我们放到下一节再来介绍。

##### 服务器推送

另外值得一说的是 HTTP/2 的服务器推送(Server Push)。在 HTTP/2 当中，服务器已经不再是完全被动地接收请求，响应请求，它也能新建 stream 来给客户端发送消息，当 TCP 连接建立之后，比如浏览器请求一个 HTML 文件，服务器就可以在返回 HTML 的基础上，将 HTML 中引用到的其他资源文件一起返回给客户端，减少客户端的等待。

![image-20241128233504913](https://typora-huang-cong.oss-cn-shanghai.aliyuncs.com/image-20241128233504913.png)

### 帧结构

![image-20241128233520356](https://typora-huang-cong.oss-cn-shanghai.aliyuncs.com/image-20241128233520356.png)

### blob 和 stream 的区别

[二进制数据结构的区别](https://www.cnblogs.com/youhong/p/10875190.html)

- 相同点： Blob 和 ArrayBuffer 都是二进制的容器；
- ArrayBuffer：ArrayBuffer 更底层，就是一段纯粹的内存上的二进制数据，我们可以对其任何一个字节进行单独的修改，也可以根据我们的需要以我们指定的形式读取指定范围的数据
- Blob：Blob 就是将一段二进制数据做了一个封装，我们拿到的就是一个整体，可以看到它的整体属性大小、类型；可以对其分割，但不能了解到它的细节
- 联系：Blob 可以接受一个 ArrayBuffer 作为参数生成一个 Blob 对象，此行为就相当于对 ArrayBuffer 数据做一个封装，之后就是以整体的形式展现了
- 应用上的区别：由于 ArrayBuffer 和 Blob 的特性，Blo 作为一个整体文件，适合用于传输；而只有需要关注细节（比如要修改某一段数据时），才需要用到 ArrayBuffer

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
function substitute(data, template) {
  //vue中插值表达式的写法，/\{\{(.*)\}\}/
  return data && typeof data == "object"
    ? template.replace(/\{([^\{]*)\}/g, function (match, key) {
        var key = key.split("."),
          value = data;
        var len = key.length;
        for (var i = 0; i < len; i++) {
          value = value[key[i]];
          if (!value) break;
        }

        return void 0 !== value ? "" + value : "";
      })
    : template.toString();
}
```

### 时间对象解析

```js
function parseDate(date) {
  let year = date.getFullYear();
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  let timestamp = date.getTime();

  return {
    year,
    month,
    day,
    hour,
    minutes,
    seconds,
    timestamp
  };
}
```

### 数组乱序

引用[云中桥](https://juejin.im/post/5d004ad95188257c6b518056)

```js
//乱序算法
function shuffle(arr) {
  let m = arr.length;
  while (m > 1) {
    let index = Math.floor(Math.random() * m--);
    [arr[m], arr[index]] = [arr[index], arr[m]];
  }
  return arr;
}
```

### 获取 Query 参数

##### 方法一

```js
//获取query参数
function loadPageVar(sVar) {
  return decodeURI(
    window.location.search.replace(
      new RegExp(
        "^(?:.*[&\\?]" +
          encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") +
          "(?:\\=([^&]*))?)?.*$",
        "i"
      ),
      "$1"
    )
  );
}
```

##### 方法二

```js
var url = "https://www.dogedoge.com/results?q=%E8%A2%AB%E5%AD%90";
var paramsString = url.split("?")[1];
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

### js 获取浏览器版本

```js
function getBroswer() {
  var Sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/edge\/([\d.]+)/))
    ? (Sys.edge = s[1])
    : (s = ua.match(/rv:([\d.]+)\) like gecko/))
    ? (Sys.ie = s[1])
    : (s = ua.match(/msie ([\d.]+)/))
    ? (Sys.ie = s[1])
    : (s = ua.match(/firefox\/([\d.]+)/))
    ? (Sys.firefox = s[1])
    : (s = ua.match(/chrome\/([\d.]+)/))
    ? (Sys.chrome = s[1])
    : (s = ua.match(/opera.([\d.]+)/))
    ? (Sys.opera = s[1])
    : (s = ua.match(/version\/([\d.]+).*safari/))
    ? (Sys.safari = s[1])
    : 0;

  if (Sys.edge) return { broswer: "Edge", version: Sys.edge };
  if (Sys.ie) return { broswer: "IE", version: Sys.ie };
  if (Sys.firefox) return { broswer: "Firefox", version: Sys.firefox };
  if (Sys.chrome) return { broswer: "Chrome", version: Sys.chrome };
  if (Sys.opera) return { broswer: "Opera", version: Sys.opera };
  if (Sys.safari) return { broswer: "Safari", version: Sys.safari };

  return { broswer: "", version: "0" };
}
var abc = getBroswer();
alert("broswer:" + abc.broswer + " version:" + abc.version);
```

### node 获取 IP

```js
//iptable['WLAN:1']

module.exports = function () {
  var os = require("os"),
    iptable = {},
    ifaces = os.networkInterfaces();
  // console.log(ifaces)
  for (var dev in ifaces) {
    ifaces[dev].forEach(function (details, alias) {
      if (details.family == "IPv4") {
        iptable[dev + (alias ? ":" + alias : "")] = details.address;
      }
    });
  }
  return iptable["WLAN:1"];
};
```

### 安装 sass

```js
npm i  node-sass -D  --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

### 数据写到文件

```js
//获取大数据
let a = JSON.stringify(renderData);
fs.writeFileSync(__dirname + "/1.txt", a, function (err) {});
```

### script 标签的使用

![103](https://typora-huang-cong.oss-cn-shanghai.aliyuncs.com/103.jpg)

### 画一个饼图

```js
    var canvas=document.getElementById('canvas');
    var ctx=canvas.getContext('2d');
    //1.创建数据包(信息)
    var dataArr = [
        {name:'北京', color:'yellow', value:0.3},
        {name:'上海', color:'red', value:0.2},
        {name:'广州', color:'green', value:0.1},
        {name:'深圳', color:'purple', value:0.15},
        {name:'天津', color:'blue', value:0.25}
    ];
     //2.定义圆心
    var x0 = canvas.width * 0.5, y0 = canvas.height * 0.5;//显示在画布中间
     //2.1定义半径
    var radius = 150;
     //2.2定义起始角度
    var beginAngle = -90 *Math.PI/180;(定义初始角度为-90deg)
     //3.遍历,绘制扇形
    for (var i = 0; i < dataArr.length; i++) {
        //3.1扇形角度
        var tempAngle = dataArr[i].value * 360 *Math.PI/180;
        //3.2结束角度
        var endAngle = beginAngle + tempAngle;

        //3.3开启路径
        ctx.beginPath();
        //3.4起点
        ctx.moveTo(x0, y0);
        //3.5绘制弧度
        ctx.arc(x0, y0, radius, beginAngle, endAngle);
        //3.6设置颜色
        ctx.fillStyle = dataArr[i].color;
        //3.7填充
        ctx.fill();
        //4.绘制文字
        //4.1常量
        var textAngle = beginAngle + tempAngle * 0.5; //角度
        var text = dataArr[i].name + dataArr[i].value * 100 + '%';
        console.log(text);
        //4.2文字坐标
        var textX = x0 + (radius + 30) * Math.cos(textAngle);
        var textY = y0 + (radius + 30) * Math.sin(textAngle);
        //4.3文字字号和字体
        ctx.font = "20px '微软雅黑'";
        //4.4判断文字是否在左边
        if((textAngle > 90 *Math.PI/180) && (textAngle < 270 *Math.PI/180) ) {
            ctx.textAlign = 'end';//文字的右侧在基线的左端
        }
        //4.5 绘制文字
        ctx.fillText(text, textX, textY);
        //5.更新起始角度, 将当前扇形的结束角度作为下一个扇形的起始角度
        beginAngle = endAngle;
    }
```

### 对象合并

```js
var getProto = Object.getPrototypeOf; //获取对象原型的方法

var class2type = {};

var toString = class2type.toString; //对象的toString方法

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString; //hasOwnProperty的toString方法

var ObjectFunctionString = fnToString.call(Object); //原始的Object的字符串表示

// 在node端运行的方法，不考虑浏览器的情况
function isFunction(obj) {
  return typeof obj === "function";
}

//防止原型被修改
function isPlainObject(obj) {
  var proto, Ctor;

  // Detect obvious negatives  明显错误
  // Use toString instead of jQuery.type to catch host objects
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }

  proto = getProto(obj); //得到对象的原型

  // Objects with no prototype (e.g., `Object.create( null )`) are plain
  if (!proto) {
    //原型为null说名obj为{}
    return true;
  }

  // Objects with prototype are plain iff they were constructed by a global Object function
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor; //function.call(thisArg, arg1, arg2, ...)//指定this和参数，obj有原型
  return (
    typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString
  ); //原型要和Object的一致
}

//防止对象里存在循环引用
function isCycle(obj, parent) {
  //表示调用的父级数组
  var parentArr = parent || [obj];
  for (var i in obj) {
    if (typeof obj[i] === "object") {
      //判断是否有循环引用
      for (var j = 0; j < parentArr.length; j++) {
        if (parentArr[j] === obj[i]) {
          // obj[i]="[cycle]"
          return true;
        }
      }
      return isCycle(obj[i], [...parentArr, obj[i]]);
    }
  }
  return false;
}

function extend() {
  var options,
    name,
    src,
    copy,
    copyIsArray,
    clone,
    target = arguments[0] || {}, //方法的第一个参数，deep或者目标对象
    i = 1,
    length = arguments.length, //传入参数的长度
    deep = false;

  // Handle a deep copy situation
  if (typeof target === "boolean") {
    //第一个参数为boolean型就是deep参数
    deep = target;

    // Skip the boolean and the target
    target = arguments[i] || {}; //获得目标对象
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== "object" && !isFunction(target)) {
    target = {};
  }

  // Extend jQuery itself if only one argument is passed
  //这里进行改造，只传如一个参数，或者是deep,target的形式，就把target设置为{}
  if (i === length) {
    target = {};
    i--;
  }

  for (; i < length; i++) {
    //开始读取需要合并的参数

    // Only deal with non-null/undefined values
    if ((options = arguments[i]) != null) {
      //非undefined和null的参数继续处理
      // Extend the base object
      for (name in options) {
        //获取到所有的key
        copy = options[name]; //暂存一下首层属性值

        // Prevent Object.prototype pollution 防止Object原型污染
        // Prevent never-ending loop 防止死循环
        if (name === "__proto__" || target === copy || isCycle(options)) {
          //取到原型属性（可能浏览器的问题） 首层的循环引用，
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if (
          deep &&
          copy &&
          (isPlainObject(copy) || //原型没有被修改
            (copyIsArray = Array.isArray(copy)))
        ) {
          //或者是数祖
          src = target[name]; //开始往目标上放

          // Ensure proper type for the source value
          if (copyIsArray && !Array.isArray(src)) {
            clone = [];
          } else if (!copyIsArray && !isPlainObject(src)) {
            clone = {};
          } else {
            clone = src;
          }
          copyIsArray = false;

          // Never move original objects, clone them
          target[name] = extend(deep, clone, copy);

          // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[name] = copy; //浅拷贝
        }
      }
    }
  }

  // Return the modified object
  return target;
}

module.exports = extend;
```

### 原生替代 Jquery 插入ＤＯＭ的方法

> Element.insertAdjacentHTML(position, text)
> Element.insertAdjacentText(position, text)

- position: 这个参数指定了元素的插入位置，取值为以下 4 种：
  - 'beforebegin': 元素自身的前面，效果类似于 `childNode.before(ele)`。
  - 'afterbegin': 插入元素内部的第一个 **子节点** 之前，效果类似于 `ParentNode.prepend(ele)`。
  - 'beforeend': 插入元素内部的最后一个 **子节点** 之后，效果类似于 `ParentNode.append(ele)`。
  - 'afterend': 元素自身的后面，效果类似于 `childNode.after(ele)`。
- text: 要插入的文本或者 html 字符串。

```html
// origin html
<div id="outer">
  <div></div>
</div>

const outer = document.getElementById('outer');
outer.insertAdjacentText('beforebegin', 'beforebegin 被插入这里');
outer.insertAdjacentText('afterbegin', 'afterbegin 被插入这里');
outer.insertAdjacentText('beforeend', 'beforeend 被插入这里');
outer.insertAdjacentText('afterend', 'afterend 被插入这里');

<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->
```

两个方法的区别在于 `insertAdjacentHTML` 方法会将字符串解析为 html，而 `insertAdjacentText` 不会做解析，因此在不需要解析的情况下（如添加纯文本）使用 `insertAdjacentText` 性能会更好。

### 在 iOS 下使用 iframe 的种种问题

[https://xiaoiver.github.io/coding/2018/05/20/%E5%9C%A8-iOS-%E4%B8%8B%E4%BD%BF%E7%94%A8-iframe-%E7%9A%84%E7%A7%8D%E7%A7%8D%E9%97%AE%E9%A2%98.html](https://xiaoiver.github.io/coding/2018/05/20/在-iOS-下使用-iframe-的种种问题.html)

### 解决 IOS 的 overflow：scroll 失去惯性

```css
-webkit-overflow-scrolling: touch;
```

### 1px IOS 滑动过解决方案

```js
// IOS 1像素 防止滚动解决方案
export function scrollSet(el, scroll = true) {
  if (scroll) {
    el.scrollTop = 1;
  }

  el.addEventListener("scroll", function () {
    let top = el.scrollTop;
    let totalScroll = el.scrollHeight;
    let currentScroll = top + el.offsetHeight;
    if (top === 0) {
      el.scrollTop = 1;
    } else if (currentScroll === totalScroll) {
      el.scrollTop = top - 1;
    }
  });
}

export function setH() {
  let el = document.querySelector("#app");
  let content_el = document.querySelector(".container");

  const containerH = el.offsetHeight;
  console.log("setH", content_el.offsetHeight);
  if (containerH >= content_el.offsetHeight) {
    content_el.style.height = containerH + 100 + "px";
  }

  el.scrollTop = 1;
}
```

### node 日志设计

```js
const log4js = require("log4js");

const layout = {
  type: 'pattern',
  pattern: '[ %p %c ] [ %d{yyyy-MM-dd hh:mm:ss} ] [ file: %f ] [line %l:%o] %n -- %m',
};

log4js.configure({
  appenders: {
    out: { type: 'stdout',layout: layout},
    dayFile: { type: 'dateFile', filename: path.join(__dirname,'log/day.log' ),keepFileExt:true }
  },
  categories: {
    default: { appenders: [ 'out', 'dayFile' ], level: 'debug',enableCallStack: true }
  }
});

log = log4js.getLogger(["out","dayFile"]);

log.info("应用开始执行")
//==================================================//
[ INFO out,dayFile ] [ 2020-06-17 14:17:50 ] [ file: D:\ssrbeta\ssr_demo1\server.js ] [line 30:5]
 -- 应用开始执行
```

### [document.referrer](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/referrer)

**`Document.referrer`** 通过 链接或历史操作 到当前页面 的页面的 [URI](http://www.w3.org/Addressing/#background)。 如果用户直接打开了这个页面（不是通过页面跳转，而是通过地址栏或者书签等打开的），则该属性为空字符串。

```
var referrer = document.referrer;
```

### 日志框架

```js
class myLog {
  static levelMap = {
    close: Number.MIN_SAFE_INTEGER,
    track: 1,
    debug: 10,
    info: 20,
    warn: 30,
    error: 40,
    open: Number.MAX_SAFE_INTEGER
  };

  static levelColor = {
    track: {
      color: "white",
      bgColor: "#cc99ff"
    },
    debug: {
      color: "white",
      bgColor: "#a6a6a6"
    },
    info: {
      color: "white",
      bgColor: "#1aa3ff"
    },
    warn: {
      color: "white",
      bgColor: "#ffa366"
    },
    error: {
      color: "white",
      bgColor: "#ff6666"
    }
  };

  /**
   * 是一个 filter 也是一个 lib
   * {
   *  defalut:{level:xxx,close},
   *  web:{level:xxx},
   *  ccc:{level:xxx}
   * }
   *
   */
  static categories = {};

  /**
   * 每次必定有默认值
   * name categoryName
   * level  filter
   */
  constructor({ name, level } = { name: "default", level: "close" }) {
    //实例属性
    this.categoryName = name;
    //注册为静态属性，给过滤器用
    myLog.categories[name] = {};
    myLog.categories[name].level = level || "close";
    myLog.categories[name].close = false;
  }
  /**
   * 过滤器的自定义函数，决定返回的日志数据
   * @param {*} msgLevel 消息的级别
   * @param {*} filterLevel 过滤的级别
   */
  condition = (msgLevel, filterLevel) => true;

  /**
   * String: when condition equal msgLevel return true
   * Function: depend the function's return
   * other: reset condition , alway return true
   * @param {String Function null} condition
   */
  setCondition(condition) {
    if (typeof condition === "function") {
      this.condition = condition;
    } else if (typeof condition === "string") {
      this.condition = (msgLevel, filterLevel) => msgLevel === condition;
    } else {
      //重置
      this.condition = (msgLevel, filterLevel) => true;
    }
  }

  /**
   * 设置一众或单个category的level，以及开关close 默认设置全部
   * @param {*} param0
   */
  static setFilterCategory({ name, level, close } = {}) {
    if (!name) return;

    if (!Array.isArray(name)) {
      name = [name];
    }
    name.forEach((categoryName) => {
      if (myLog.categories[categoryName]) {
        level && (myLog.categories[categoryName].level = level);
        close !== undefined && (myLog.categories[categoryName].close = close);
      }
    });
  }
  /**
   * 关闭所有
   */
  static closeFilters() {
    myLog.categories.forEach((categoryName) => {
      myLog.categories[categoryName].close = true;
    });
  }

  filtering(categoryName, msgLevel) {
    //1.检查category 是否在 filter里
    let filterCategory = myLog.categories[categoryName];
    if (!filterCategory) {
      return false;
    } else if (
      myLog.levelMap[msgLevel] < myLog.levelMap[filterCategory.level]
    ) {
      return false;
    } else if (filterCategory.close) {
      return false;
    } else if (this.condition(msgLevel, filterCategory.level)) {
      return true;
    }
  }
  /**
   * 打开自身，可设置level
   * @param {*} level
   */
  openSelf(level) {
    myLog.categories[this.categoryName].close = false;

    level && (myLog.categories[this.categoryName].level = level);
  }
  closeSelf() {
    myLog.categories[this.categoryName].close = true;
  }
  /**
   * 设置其他logger实例，
   * @param {*} level
   */
  setOthers(operate = "on") {
    for (const [categoryName, category] of Object.entries(myLog.categories)) {
      if (this.categoryName !== categoryName) {
        if (operate === "on") {
          category.close = false;
        } else if (operate === "off") {
          category.close = true;
        }
      }

      myLog.categories[categoryName] = category;
    }
  }
  // 输出样式
  _logout(level = "", msgs) {
    const time = this.dateFormate(new Date());
    const categoryName = this.categoryName;

    console.log(
      `%c${level.toUpperCase()} `,
      `color: ${myLog.levelColor[level].color}; font-style: italic; background-color:${myLog.levelColor[level].bgColor};padding: 2px`,
      `[${categoryName}] [ ${time} ]`,
      ...msgs
    );
  }
  /**
   * replace
   * @param {*} date
   * @param {*} pattern
   */
  dateFormate(date, pattern = "YYYY-MM-DD hh:mm:ss.ts") {
    const {
      year,
      month,
      day,
      hour,
      minutes,
      seconds,
      milliseconds,
      timestamp
    } = this.timeMate(date);

    if (pattern) {
      return pattern
        .replace("YYYY", year)
        .replace("MM", month)
        .replace("DD", day)
        .replace("hh", hour)
        .replace("mm", minutes)
        .replace("ss", seconds)
        .replace("ts", milliseconds);
    } else {
      return timestamp;
    }
  }
  /**
   * 时间元信息
   * @param {*} date
   */
  timeMate(date) {
    let year = date.getFullYear();
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let seconds =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    let milliseconds = date.getMilliseconds();
    let timestamp = date.getTime();

    return {
      year,
      month,
      day,
      hour,
      minutes,
      seconds,
      milliseconds,
      timestamp
    };
  }

  //实例方法，记录输入
  track(...msgs) {
    if (this.filtering(this.categoryName, "track")) {
      this._logout("track", msgs);
    }
  }
  debug(...msgs) {
    if (this.filtering(this.categoryName, "debug")) {
      this._logout("debug", msgs);
    }
  }
  info(...msgs) {
    if (this.filtering(this.categoryName, "info")) {
      this._logout("info", msgs);
    }
  }
  warn(...msgs) {
    if (this.filtering(this.categoryName, "warn")) {
      this._logout("warn", msgs);
    }
  }
  error(...msgs) {
    if (this.filtering(this.categoryName, "error")) {
      this._logout("error", msgs);
    }
  }
}
```

#### 时间格式化的网上方法

```js
//格式化日期
Date.prototype.Format = function (fmt) {
  var o = {
    "y+": this.getFullYear(),
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S+": this.getMilliseconds() //毫秒
  };
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      if (k == "y+") {
        fmt = fmt.replace(
          RegExp.$1,
          ("" + o[k]).substring(4 - RegExp.$1.length)
        );
      } else if (k == "S+") {
        var lens = RegExp.$1.length;
        lens = lens == 1 ? 3 : lens;
        fmt = fmt.replace(
          RegExp.$1,
          ("00" + o[k]).substring(("" + o[k]).length - 1, lens)
        );
      } else {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substring(("" + o[k]).length)
        );
      }
    }
  }
  return fmt;
};

var date = new Date();
console.log(date.Format("yyyy年MM月dd日 hh:mm:ss.S")); //输出: 2016年04月01日 10:41:08.133
console.log(date.Format("yyyy-MM-dd hh:mm:ss")); //输出: 2016-04-01 10:41:08
console.log(date.Format("yy-MM-dd hh:mm:ss")); //输出: 16-04-01 10:41:08
console.log(date.Format("yy-M-d hh:mm:ss")); //输出: 16-4-1 10:41:08
```

### then 的返回值

```
当一个 Promise 完成（fulfilled）或者失败（rejected）时，返回函数将被异步调用（由当前的线程循环来调度完成）。具体的返回值依据以下规则返回。如果 then 中的回调函数：

* 返回了一个值，那么 then 返回的 Promise 将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值。

* 没有返回任何值，那么 then 返回的 Promise 将会成为接受状态，并且该接受状态的回调函数的参数值为 undefined。

* 抛出一个错误，那么 then 返回的 Promise 将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值。

* 返回一个已经是接受状态的 Promise，那么 then 返回的 Promise 也会成为接受状态，并且将那个 Promise 的接受状态的回调函数的参数值作为该被返回的Promise的接受状态回调函数的参数值。

* 返回一个已经是拒绝状态的 Promise，那么 then 返回的 Promise 也会成为拒绝状态，并且将那个 Promise 的拒绝状态的回调函数的参数值作为该被返回的Promise的拒绝状态回调函数的参数值。

* 返回一个未定状态（pending）的 Promise，那么 then 返回 Promise 的状态也是未定的，并且它的终态与那个 Promise 的终态相同；同时，它变为终态时调用的回调函数参数与那个 Promise 变为终态时的回调函数的参数是相同的。
```

### [document.cookie](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)

获取并设置与当前文档相关联的 [cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)。若您需要一个通用的库，请查看[简单的 cookie 框架](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie/Simple_document.cookie_framework)。

```
allCookies = document.cookie;
```

在上面的代码中，allCookies 被赋值为一个字符串，该字符串包含所有的 Cookie，每条 cookie 以"分号和空格(; )"分隔(即, `*key*=*value* `键值对)。

```
document.cookie = newCookie;
```

```
newCookie是一个键值对形式的字符串。需要注意的是，用这个方法一次只能对一个cookie进行设置或更新。
```

- 以下可选的 cookie 属性值可以跟在键值对后，用来具体化对 cookie 的设定/更新，使用分号以作分隔：

  - `;path=*path*` (例如 '/', '/mydir') 如果没有定义，默认为当前文档位置的路径。

  - `;domain=*domain*` (例如 'example.com'， 'subdomain.example.com') 如果没有定义，默认为当前文档位置的路径的域名部分。与早期规范相反的是，在域名前面加 . 符将会被忽视，因为浏览器也许会拒绝设置这样的 cookie。如果指定了一个域，那么子域也包含在内。

  - `;max-age=*max-age-in-seconds*` (例如一年为 60*60*24\*365)

  - ```
    ;expires=date-in-GMTString-format
    ```

    如果没有定义，cookie 会在对话结束时过期

    - 这个值的格式参见[Date.toUTCString()](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toUTCString)

  - `;secure` (cookie 只通过 https 协议传输)

- cookie 的值字符串可以用[encodeURIComponent()](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent)来保证它不包含任何逗号、分号或空格(cookie 值中禁止使用这些值).

```js
document.cookie = "name=oeschger";
document.cookie = "favorite_food=tripe";
alert(document.cookie);
// 显示: name=oeschger;favorite_food=tripe
```

```js
document.cookie = "test1=Hello";
document.cookie = "test2=World";

var myCookie = document.cookie.replace(
  /(?:(?:^|.*;\s*)test2\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);

alert(myCookie);
// 显示: World
```

### 正则的?:问题

```jinja2
(?:  pattern)是非捕获型括号  匹配pattern，但不捕获匹配结果。
(pattern )是捕获型括号。  匹配pattern，匹配pattern并捕获结果,自动获取组号
(?<name> pattern )  匹配pattern，  匹配pattern并捕获结果，设置name为组名
```

### node 环境判断

```js
typeof exports === "object" && typeof module !== "undefined";
```

### Boilerplate code

In computer programming, **boilerplate code** or just **boilerplate** are sections of code that have to be included in many places with little or no alteration. When using languages that are considered _verbose_, the programmer must write a lot of code to accomplish only minor functionality. Such code is called _boilerplate_.

在计算机编程中，样板代码或只是样板代码是在许多地方必须包含的代码片段，这些代码很少或根本没有改变。当使用被认为冗长的语言时，程序员必须编写大量的代码来完成较小的功能。这样的代码称为样板代码

例如

In [object-oriented programs](https://en.wikipedia.org/wiki/Object-oriented_programming), classes are often provided with methods for [getting and setting](https://en.wikipedia.org/wiki/Mutator_method) instance variables. The definitions of these methods can frequently be regarded as boilerplate. Although the code will vary from one class to another, it is sufficiently stereotypical in structure that it would be better generated automatically than written by hand. For example, in the following [Java](<https://en.wikipedia.org/wiki/Java_(programming_language)>) class representing a pet, almost all the code is boilerplate except for the [declarations](<https://en.wikipedia.org/wiki/Declaration_(computer_science)>) of _Pet_, _name_ and _owner_:

在面向对象程序中，类通常提供获取和设置实例变量的方法。这些方法的定义通常可以视为样板文件。尽管代码会因类的不同而有所不同，但它在结构上是非常典型的，因此自动生成比手工编写更好。例如，在下一个表示宠物的 Java 类中，除了宠物、名称和所有者的声明外，几乎所有代码都是样板代码

```java
public class Pet {
    private String name;
    private Person owner;

    public Pet(String name, Person owner) {
        this.name = name;
        this.owner = owner;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Person getOwner() {
        return owner;
    }

    public void setOwner(Person owner) {
        this.owner = owner;
    }
}
```

Most of the boilerplate in this example exists to provide encapsulation. If the variables name and owner were declared as public, the accessor and mutator methods would not be needed. To reduce the amount of boilerplate, many frameworks have been developed, e.g. Lombok for Java.[4] The same code as above is auto-generated by Lombok using Java annotations, which is a form of metaprogramming

本例中的大多数样板文件都是为了提供封装而存在的。如果变量 name 和 owner 被声明为 public，则不需要 [accessor and mutator methods](accessor and mutator methods)。为了减少样板文件的数量，开发了许多框架，例如用于 Java 的 Lombok。与上面相同的代码是由 Lombok 使用 Java 注释自动生成的，这是一种元编程形式

```java
@AllArgsConstructor
@Getter
@Setter
public class Pet {
    private String name;
    private Person owner;
}
```

##### accessor and mutator methods

Accessor methods are used to read data values of an object. Mutator methods are used to modify the data of an object. Manager methods are used to initialize and destroy objects of a class, e.g. constructors and destructors.

Accessor 方法用于读取对象的数据值。Mutator 方法用于修改对象的数据。管理器方法用于初始化和销毁类中的对象，例如构造函数和析构函数。

##### References：https://en.wikipedia.org/wiki/Boilerplate_code

### 判断移动端

```js
let u = navigator.userAgent;
let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //判断是否是 android终端
let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是否是 iOS终端
```

### 不使用;的风险

关于分号的讨论 from 知乎 [JavaScript 语句后应该加分号么？](https://www.zhihu.com/question/20298345)

j 结论：看情况;倾向，不加分号，靠工具自动添加，

出现问题的条件： 行首字符是否是`[ ( + - / `五个符号之一

> 编译器（代码分析器）完全可以知道哪里应该有 EOS。既然所有的分号其实可以由机器自行加上，那么我们自己还要手写所有分号的意义到底在哪里？！ ———— hax

##### 相邻的括号将导致错误

> TypeError: (intermediate value)(...) is not a function

```js
(function () {
  console.log(1);
})()(function () {
  console.log(2);
})();
```

修改为

```js
!(function () {
  console.log(1);
})();

!(function () {
  console.log(2);
})();
```

> TypeError: el.getBoundingClientRect(...) is not a function

```js
//在不确定优先级时使用了括号，结果与前面的语句联动了
function sticky(el, callback) {
  window.onscroll = () => {
    var rect =
      el.getBoundingClientRect()(typeof callback == "function") &&
      callback(rect);
    //等同于 var rect =  el.getBoundingClientRect()(typeof callback == 'function') && callback(rect)
  };
}
```

### 合并数组

**a = [1,2,3]**; **b=[4,5,6]**

- contact:

```javascript
var c = a.contact(b);
```

- for:

```javascript
for (var i in b) {
  a.push(b[i]);
}
```

- apply

```javascript
a.push.apply(a, b);
```

- 扩展运算符

```javascript
var newA = [...a, ...b];
```

<<<<<<< HEAD

### 合并对象

```js
const a = { name: "张三" };
const b = { age: 18 };

//改变原对象
Object.assign(a, b);

//不改变原对象
const person = Object.assign({}, a, b);

//ES6,后面会覆盖前面的属性
const a = { name: "张三", age: 18 };
const b = { name: "李四", sex: "female" };

const person = { ...a, ...b }; //{name: "李四", age: 18, sex: "female"}
```

### [vue nextTick 运行时机](https://www.zhihu.com/search?type=content&q=nextTick%E7%9A%84%E6%97%B6%E6%9C%BA)

[异步更新队列](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)

[MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)监视 DOM 树的变化

```scheme
**keyword**
可能你还没有注意到，Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。
```

### 帧动画[requestanimationframe](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)

```js
window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
```

感动是决定作品好坏的标准

```js
"" + 1 + 0; //10
"" - 1 + 0; //-1
true + false; //1
6 / "3"; //2
"2" * "3"; //6
4 + 5 + "px"; //9px
"$" + 4 + 5; //$45
"4" - 2; //2
"4px" - 2; //NaN
7 / 0; //+infinety
"  -9  " + 5; //  -9  5
"  -9  " - 5; // -14
null + 1; //1
undefined + 1; //NaN
" \t \n" - 2; //-2
```

### [可选链](https://zh.javascript.info/optional-chaining)

如果可选链 `?.` 前面的部分是 `undefined` 或者 `null`，它会停止运算并返回该部分。

```
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

可选链 `?.` 不是一个运算符，而是一个特殊的语法结构。

```
let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

userAdmin.admin?.(); // I am admin

userGuest.admin?.(); // 啥都没有（没有这样的方法）
```

```
let user1 = {
  firstName: "John"
};

let user2 = null; // 假设，我们不能授权此用户

let key = "firstName";

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined
```

### [空值合并运算符](https://zh.javascript.info/nullish-coalescing-operator)

空值合并运算符并不是什么全新的东西。它只是一种获得两者中的第一个“已定义的”值的不错的语法。

```
result = a ?? b
result = (a !== null && a !== undefined) ? a : b;
```

```
|| 返回第一个 真 值。
?? 返回第一个 已定义的 值。
换句话说，|| 无法区分 false、0、空字符串 "" 和 null/undefined。它们都一样 —— 假值（falsy values）。如果其中任何一个是 || 的第一个参数，那么我们将得到第二个参数作为结果。
```

日期的正则

```

/^(?:(?!0000)[0-9]{4}\/(?:(?:0[1-9]|1[0-2])\/(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])\/(?:29|30)|(?:0[13578]|1[02])\/31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)\/02\/29)\s+([01][0-9]|2[0-3]):[0-5][0-9]$/,


```
