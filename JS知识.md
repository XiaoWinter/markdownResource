## JS知识

##### 如何自定义一个事件

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

##### 获取当天凌晨

```js
new Date().setHours(0, 0, 0, 0)
```



 [**`Uint8Array`**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。 

##### 格式化

`JSON.parse(data)`

##### 实现模板替换

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

#### js文件上传基础知识

##### :star:[表单对象](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)FormData（POST请求）

[使用FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects)

 **`FormData`** 接口提供了一种表示表单数据的键值对的构造方式，经过它的数据可以使用 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest).send() 方法送出，本接口和此方法都相当简单直接。如果送出时的编码类型被设为 `"multipart/form-data"`，它会使用和表单一样的格式。 

:musical_note:与FormData相对， 如果你想构建一个简单的`GET`请求，并且通过键值对的形式带有查询参数，可以将它直接传递给[`URLSearchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)。 

formData的基本用法

```js
var formData = new FormData();

formData.append("username", "Groucho");
formData.append("accountnum", 123456); //数字123456会被立即转换成字符串 "123456"

// HTML 文件类型input，由用户选择
formData.append("userfile", fileInputElement.files[0]);

// JavaScript file-like 对象
var content = '<a id="a"><b id="b">hey!</b></a>'; // 新文件的正文...
var blob = new Blob([content], { type: "text/xml"});

formData.append("webmasterfile", blob);

var request = new XMLHttpRequest();
request.open("POST", "http://foo.com/submitform.php");
request.send(formData);
```



##### :star: ajax [XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

[使用XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)

 使用 `XMLHttpRequest`（XHR）对象可以与服务器交互。  `XMLHttpRequest` 可以用于获取任何类型的数据，而不仅仅是XML，它甚至支持 [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) 以外的协议（包括 file:// 和 FTP） 。

:hot_pepper:**事件处理器**

* [`load`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/load_event)

[`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)请求成功完成时触发。
也可以使用 [`onload`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onload) 属性.

* `progress`

接收数据开始周期触发。
也可以使用 [`onprogress`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onprogress) 属性。

* [`error`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/error_event)

当request遭遇错误时触发。
也可以使用 [`onerror`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onerror) 属性

* `loadend`

当请求结束时触发, 无论请求成功 ( [`load`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/load_event)) 还是失败 ([`abort`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/abort_event) 或 [`error`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/error_event))。
也可以使用 `onloadend` 属性。

* [`abort`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/abort_event)

当 request 被停止时触发，例如当程序调用 [`XMLHttpRequest.abort()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/abort) 时。
也可以使用 [`onabort`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onabort) 属性。

* `loadstart`

接收到响应数据时触发。
也可以使用 [`onloadstart`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onloadstart) 属性。

* [`timeout`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/timeout_event)

在预设时间内没有接收到响应时触发。
也可以使用 `ontimeout` 属性。



:banana:**重要属性**

响应： XMLHttpRequest.response

 响应文本：XMLHttpRequest.responseText

 状态码：XMLHttpRequest.status 

:money_with_wings:**重要方法**

```js
//得到实例
var xhr = new XMLHttpRequest();
//打开
xhr.open('GET', '/server', true);
//事件处理程序
xhr.onprogress = function () {
  console.log('LOADING', xhr.status);
};

xhr.onload = function () {
  console.log('DONE', xhr.status);
};
//发送请求
xhr.send(null);
```



上传文件方法很多，从MDN的UsingFormData和UsingXMLHttpRequest上可以找到好几种方法，这些方法我都没有细看，我使用的上传方式很普通（使用formData），关键是对上传体验的处理。

**上传方法**：（单个文件上传）

```js
 
var xhr = new XMLHttpRequest();
      var formData = new FormData();
      var fileInput = document.getElementById("myFile");
      var file = fileInput.files[0];
      formData.append('myFile', file);

      xhr.open("POST", "/uploadFile");
	  xhr.send(formData);
```



**上传文件的体验提升点**：

*  进度显示

上传进度的功能依赖于xhr的progress事件

event的属性

​	loaded：已经上传的内容长度

​	total：所要上传的内容的总长度

```js
    xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
          var percentComplete = (event.loaded / event.total) * 100;
          // 对进度进行处理
          var myProgress = document.getElementById("myProgress");
          myProgress.value = percentComplete
        }
      }
```

* 图片预览

图片预览有我觉得比较容易的有三种方式，

方式一：通过FileReader对象得到图片的base64编码，赋予一个img元素。

方式二：使用window.URL.createObjectURL(file)，通过构造文件的虚拟路径，赋给img元素。使用完之后要清理这个虚拟路径URL.revokeObjectURL(imgTempURL)（这个方法我感觉很方便）

方式三：使用cavans将图片转为base64编码，赋给一个img 元素

```js
    function preLookImg(){
        //img元素
      var myImg = document.createElement('img');
        //input type=file
      var fileInput = document.getElementById("myFile");
        //file
      var file = fileInput.files[0];
        //预览方式
      let lookWay = 'base64'
      switch(lookWay){
        case 'base64' :{
           //使用base64预览图片
          var render = new FileReader()
          render.readAsDataURL(file)
          // render.readAsText(file)
          render.onload=function(){
            console.log(render)
            myImg.src = render.result//baseURL
          }
        }
        break;
        case 'ctURL':{
              //使用虚拟地址浏览图片//一定要清理revokeObjectURL
              imgTempURL = window.URL.createObjectURL(file)
              myImg.src = imgTempURL
        }
        break;
        case 'canvas':{//页面中的图片转为base64
          var canvas = document.createElement("canvas");
          canvas.width = width ? width : img.width;
          canvas.height = height ? height : img.height;
 
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          myImg.src = canvas.toDataURL();
        }
        break;
        default:
      }
    }
```



* 更换上传文件控件

  因为input type=file太难看了，所以有更换这个控件的必要。

原理：隐藏文件上传空间，通过js调用文件上传空间选择文件。

display:none 控件依然可以使用

```js
//通过方法选择文件 ，可以通过点击图标调用此方法
function selectFile() {
     //文件上传控件
      var fileInput = document.getElementById("myFile");
     //点击选择文件
      fileInput.click()
  }
```



#### js读取文件以二进制上传

原理：XMLHttpRequest的send方法可以上传二进制

从polyfill中我们可以看出如何使用js读取文件发送二进制数据

`sendAsBinary(binaryString);`
`binaryString`
A DOMString which encodes the binary content to be sent. You can create the binary string using the **FileReader** method **readAsArrayBuffer**(). The string is converted to binary for transfer by removing the high-order byte of each character.



 [`FileReader`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader) 接口提供的 **`readAsArrayBuffer()`** 方法用于启动读取指定的 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 或 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 内容。当读取操作完成时，[`readyState`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readyState) 变成 `DONE`（已完成），并触发 `loadend` 事件，同时 [`result`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/result) 属性中将包含一个 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/API/ArrayBuffer) 对象以表示所读取文件的数据。 

用法 `instanceOfFileReader.readAsArrayBuffer(blob);`

:star: Polyfill

```js
/*\
|*|
|*|  :: XMLHttpRequest.prototype.sendAsBinary() Polyfill ::
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest#sendAsBinary()
|*|
\*/


if (!XMLHttpRequest.prototype.sendAsBinary) {
  XMLHttpRequest.prototype.sendAsBinary = function(sData) {
    var nBytes = sData.length, ui8Data = new Uint8Array(nBytes);
    for (var nIdx = 0; nIdx < nBytes; nIdx++) {
      ui8Data[nIdx] = sData.charCodeAt(nIdx) & 0xff;
    }
    /* send as ArrayBufferView...: */
    this.send(ui8Data);
    /* ...or as ArrayBuffer (legacy)...: this.send(ui8Data.buffer); */
  };
}
```

关键步骤

```js
var file = document.getElementById("myFile");//file对象var reader = new FileReader();
      //读取器
	var reader = new FileReader();
    //读取为二进制
      reader.readAsArrayBuffer(file)
      reader.onload=function(){
            //二进制
            var sDate = reader.result
            //二进制数组长度
             var nBytes = file.length;
            //二进制数组
            var ui8Data = new Uint8Array(nBytes);
            //填充
                for (var nIdx = 0; nIdx < nBytes; nIdx++) {
                  ui8Data[nIdx] = sData.charCodeAt(nIdx) & 0xff;
                }
            //发送
            xhr.send(ui8Data)
    }
```



#### 大文件上传的方式

**方式一**

购买服务：使用购买的服务，根据其封装的方法进行上传，如七牛，阿里等

**方式二**

 编码上传，我们可以比较灵活地控制上传的内容 

前提条件

- 支持拆分上传请求(即切片)
- 支持断点续传
- 支持显示上传进度和暂停上传

