# js文件上传基础知识

参考：

​	[前端大文件上传](https://juejin.im/post/5cf765275188257c6b51775f)

​	[前端通过spark-md5.js计算本地文件md5](https://juejin.im/post/5b52a7535188251b381270a4)

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

	loaded：已经上传的内容长度
	
	total：所要上传的内容的总长度

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

#### 图片预览

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



##### 文件切片

前置知识[Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)

Blob是File的父类，有方法slice方法对自身数据进行切片

```js
//返回切片数组
function slice(file, piece = 1024 * 1024 * 5) {
  let totalSize = file.size; // 文件总大小
  let start = 0; // 每次上传的开始字节
  let end = start + piece; // 每次上传的结尾字节
  let chunks = []
  while (start < totalSize) {
    // 根据长度截取每次需要上传的数据
    // File对象继承自Blob对象，因此包含slice方法
    let blob = file.slice(start, end); 
    chunks.push(blob)

    start = end;
    end = start + piece;
  }
  return chunks
}

```

后台对切片进行重组，就完成了大文件的上传，但仅仅是这样还不行

###### 1.异步请求发送的切片，对于后台，切片的顺序是未知的。

解决现有缺陷

1.增加文件信息，后台改进接口

前端增加文件信息

```js
// 获取context，同一个文件会返回相同的值
function createContext(file) {
    //这里需要生成文章唯一ID
    
 	return file.name + file.length
}
//生成文件的hash(md5)//这个可以在网上找到轮子
function createHash(chunk){
    let chunkhash=null
    //todosth
    return chunkhash
}

let file = document.querySelector("[name=file]").files[0];
const LENGTH = 1024 * 1024 * 0.1;
let chunks = slice(file, LENGTH);

// 获取对于同一个文件，获取其的fileID
let fileID = createContext(file);

let tasks = [];
chunks.forEach((chunk, index) => {
  let fd = new FormData();
   //这里可以增加文章的hash信息以供后台进行文件完整校验
    let chunkhash = createHash(chunk)
    fd.append('chunkhash',chunkhash)
  fd.append("chunk", chunk);
  // 传递context
  fd.append("fileID", fileID);
  // 传递切片索引值
  fd.append("chunkIndex", index + 1);
	
  tasks.push(post("/mkblk.php", fd));
});
//在此处可以增加切片上传失败自动重试（重试次数3次，否则报错）
// 所有切片上传完毕后，调用mkfile接口
Promise.all(tasks).then(res => {
  let fd = new FormData();
  fd.append("fileID", fileID);
  fd.append("chunksLength", chunks.length);
  post("/mkfile.php", fd).then(res => {
    console.log(res);
  });
});

```

后台应该怎么做

* 如何处理前端发送来的数据

解析前端的表单信息，得到文件切片、切片顺序、hash、唯一文章ID，我们先将文件切片保存到硬盘，在数据库中保存前端传来的唯一文章ID、hash、切片顺序，并将保存结果返回给前端

```js
function savaBigFile(formData){
    //查询数据库，检查是否已存在此切片
    getChunkByFileIDAndIndex(formData.fileID,formData.chunkIndex)
    //根据hash检验文件完整度
    checkHash(formData)
//保存文件切片到硬盘某地，返回文件保存地址
    savaChunktoSomeWhere(formData.chunk)
    //保存文件信息以及文件切片的保存地址存储到数据库
    savaFileChunkInfo(formData)
    //返回保存状态//成功？失败？原因
    return {
        fileID:formData.fileID,
        chunkIndex:formData.chunkIndex,
        code:'',
        reason:'',
        msg:'',
    }
    
}
```

###### 2.后台不知道切片是否发送完。

前端发送完切片后可以再发一个拼接文件的请求

```js
// 所有切片上传完毕后，调用mkfile接口
Promise.all(tasks).then(res => {
  let fd = new FormData();
  fd.append("fileID", fileID);
  fd.append("chunksLength", chunks.length);
  post("/mkfile.php", fd).then(res => {
    console.log(res);
  });
});
```

后端接受到这个请求去数据库中查找有关此ID的文件,检查切片的数量是否正确，然后进行文件拼接，拼接完成后删除本地硬盘的切片

```js
function makeFile(formData){
    //检查文件是否已经上传
    isFileExist(formData.fileID)
    //检查文件切片数量,通过就进行合并，不通过就返回缺少的切片Index
    isFileChunkReady(formData.chunksLength)
    //合并文件，删除切片
    pinjie(formData.fileID)
    //返回状态信息，成功？失败？
    return {
        code:''，
        msg:''，
        ...
    }
}
```



###### 3.对于请求出错没有补救措施。

后端有关上传的方法中都会返回上传文件切片的状态信息，前端可根据响应来进行上传重试，除此以外后台还会提供接口来提供文件缺失的分片。

后端接口

```js
function getFileInfo(fileHash){
    //检查文件是否已经上传,如果上传了并且没有上传完就返回上传了文件切片的fileID,如果没有上传，就不在响应里返回fileID
	let fileID =  isFileRepeat(fileHash)
    //返回缺少的文件分片
    getMissingChunk()
    //对于已经上传过的文件，数据库里会保存文件的ID，我们因该将此ID返回，并要求上传时携带此ID，因此前端需要在每次上传大文件之前进行上传情况的判断
    return {
        fileID：'',
        code:'',
        msg:'',
        ...
    }
}
```

前端

```js
//对整个文件取hash(md5)
const fileHash = createHash(file)

//上传之前检测上传情况
getFileInfo('/getFileInfo',fileHash).then(res=>{
    //得到已将上传，上传一部分，未上传过的信息，根据这几种情况做出处理
    
    //已经上传==》直接返回
    
    //未上传==》正常上传程序
    
    //上传一部分==》缺失切片上传（等同与断点续传）
})
```

### js转换图片url为base64

例子

```js
//一个具有URL的对象数组
var imgsObj = [
  {
    "name": "招足球主播哈",
    "avatar": "https://cdn.leisu.com/user/avatar/89b06a99916877db"
  },
  {
    "name": "快劳夹单",
    "avatar": "https://cdn.leisu.com/user/avatar/32a06b932b0025ea"
  },
  {
    "name": "库位假",
    "avatar": "https://cdn.leisu.com/user/avatar/f3d8275b33e7b90d"
  }
]
var userInfo = []
//每个路径都用创建一个image对象，并在onload方法中resolve
var imgsPromise =  imgsObj.map(item=>(new Promise((resolve,reject)=>{
        try {
            const {name,avatar} = item
            var img = new Image();
            img.src = avatar
            //污染画布什么的异常，用这个解决
            img.setAttribute("crossOrigin",'Anonymous')
            
        } catch (error) {
            reject(error)
        }
    	
        img.onload = function(){
            try {
                //canvas 生成base64
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height =  img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                let imgBase64 = canvas.toDataURL();
                // console.log('add',count)
                userInfo.push({name,avatar:imgBase64})
                resolve()
                
            } catch (error) {
                reject(error)
            }
        }
    }))
)
    
//所有图片的promise状态确定完毕直至
Promise.all(imgsPromise).then(()=>{
    console.log(userInfo)
    createAndDownloadFile('a.txt',JSON.stringify(userInfo))
},()=>{
    console.log("出现异常，不能生成文件")
})

//使用a标签生成文件
function createAndDownloadFile(fileName, content) {
    var aTag = document.createElement('a');
    //产生了一个文件
    var blob = new Blob([content]);
    aTag.download = fileName;
    aTag.href = URL.createObjectURL(blob);
    aTag.click();
    URL.revokeObjectURL(blob);
}
```

