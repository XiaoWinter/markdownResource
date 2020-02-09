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

