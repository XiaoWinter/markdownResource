

<h1 align='center'>Vue源码解析</h1>
#### 伪数组生成真数组

`Array.from(伪数组)`

//call改变slice的this的指向，执行这个函数，返回一个真数组

`call和apply可以让任意函数成为任意对象的方法`

`[].slice.call(伪数组)`

`Array.prototype.slice.apply(伪数组)`

//返回一个新的函数，执行函数就会执行原来的函数，原来的函数this是bind的第一个参数

`[].slice.bind(伪数组)`

#### 如何知道节点的类型

`node.nodeType`

| 常量                               | 值   | 描述                                                         |
| :--------------------------------- | :--- | :----------------------------------------------------------- |
| `Node.ELEMENT_NODE`                | `1`  | 一个 [`元素`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 节点，例如 [`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/p) 和 [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div)。 |
| `Node.TEXT_NODE`                   | `3`  | [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 或者 [`Attr`](https://developer.mozilla.org/zh-CN/docs/Web/API/Attr) 中实际的  [`文字`](https://developer.mozilla.org/zh-CN/docs/Web/API/Text) |
| `Node.CDATA_SECTION_NODE`          | `4`  | 一个 [`CDATASection`](https://developer.mozilla.org/zh-CN/docs/Web/API/CDATASection)，例如 `<!CDATA[[ … ]]>`。 |
| `Node.PROCESSING_INSTRUCTION_NODE` | `7`  | 一个用于XML文档的 [`ProcessingInstruction`](https://developer.mozilla.org/zh-CN/docs/Web/API/ProcessingInstruction) ，例如 `<?xml-stylesheet ... ?>` 声明。 |
| `Node.COMMENT_NODE`                | `8`  | 一个 [`Comment`](https://developer.mozilla.org/zh-CN/docs/Web/API/Comment) 节点。 |
| `Node.DOCUMENT_NODE`               | `9`  | 一个 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 节点。 |
| `Node.DOCUMENT_TYPE_NODE`          | `10` | 描述文档类型的 [`DocumentType`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentType) 节点。例如 `<!DOCTYPE html>`  就是用于 HTML5 的。 |
| `Node.DOCUMENT_FRAGMENT_NODE`      | `11` | 一个 [`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment) 节点 |

#### 定义属性

##### 给对象添加属性

`Object.defineProperty(obj,propertyName,{})`



##### 属性描述符

* 数据描述符

  * configurable：是否可重新define
  * enumerable ：是否可枚举（使用for/in,keys()）
  * value :指定初始值
  * writable：是否可写

* 访问描述符（存取描述符）

  * ```javascript
    //替代value
    get(){
    	return xxx
    }
    ```

    

  * ```javascript
    //替代writable
    set(val){
    	...
    }
    ```

    

#### 获取到对象的可枚举属性

  获取自身的可枚举属性

  `Object.keys(obj)`

  

#### 判断自身是否拥有某个属性

  `obj.hasOwnProperty(prop)`

  

#### DocumentFragment文档碎片

  ###### 问题

  ​	每次dom操作都会让浏览器更新页面

  ###### 解决方法

  ​	在内存中更新节点，然后一次性更新

  ```
  DocumentFragment。它被作为一个轻量版的 Document 使用，用于存储已排好版的或尚未打理好格式的XML片段。最大的区别是因为 DocumentFragment 不是真实DOM树的一部分，它的变化不会触发 DOM 树的（重新渲染) ，且不会导致性能等问题。
  ```

  

  创建一个空的DocumentFragment

  `document.createDocumentFragment`

  

#### 数据代理

###### 为什么Vue对象中data中的数据可以直接通过vm对象取得

代理对象：vm

被代理对象:data

```javascript
MVVM.prototype = {
    _proxy: function(key) {
        var me = this; 
        object. defineProperty(me, key, {
            configurable: false,
            enumerable: true ,
            get: function proxyGetter() {
                return me._ data[key];
            },
            set: function proxySetter(newVal) {
                me._ data[key]I= newVal;
            }
          });
    };
}
	
```

#### 模板解析

* 获取el元素的子节点，放入fragment容器
* init() 遍历所有的节点，进行编译解析
  * 解析元素节点（编译指令）
  * 解析文本节点（编译插值语法）
  * 有子元素，则递归调用解析方法
* 将fragment容器中的内容，还给el元素

###### 编译时调用编译模板的方法

###### 真正编译调用的方法bind()

##### 解析大括号文本表达式文本节点

根据插值表达式的内容，在vm的data中取得要，插入文本节点的内容（value）textNode.textContent = value

##### 解析插值表达式语法

* 事件指定
  * 获取指令
  * 是什么事件
  * 回调函数在哪
* 普通指令
  * 获取指令
  * 是那种普通指令
  * 调用哪个工具方法





##### 更新数据，更新页面

```javascript
function Compile(el, vm) {
    // 保存vm
    this.$vm = vm;
    // 保存el元素
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
        // 1. 取出el中所有子节点, 转移到fragment对象中
        this.$fragment = this.node2Fragment(this.$el);
        // 2. 编译fragment所有层次子节点
        this.init();
        // 3. 将编译好的所有子添加回el元素
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(),
            child;

        // 将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    /* 
    编译指定el的所有子节点
    */
    compileElement: function(el) {
        // 得到所有最外层的子节点
        var childNodes = el.childNodes,
            me = this;
        // 遍历子节点
        [].slice.call(childNodes).forEach(function(node) {
            // 得到节点的文本内容
            var text = node.textContent;
            // 定义匹配插值语法的正则
            var reg = /\{\{(.*)\}\}/;   // {{name}}
            // 如果节点是元素节点
            if (me.isElementNode(node)) {
                // 编译元素节点中的指令属性
                me.compile(node);
            // 如果节点是一个插值语法格式的文本节点
            } else if (me.isTextNode(node) && reg.test(text)) {
                // 编译插值语法的文本节点
                me.compileText(node, RegExp.$1);
            }
            // 如果这个子节点它有下一级的子节点
            if (node.childNodes && node.childNodes.length) {
                // 递归调用 ==> 实现所有层次子节点的编译
                me.compileElement(node);
            }
        });
    },

    /* 编译元素节点中的所有指令属性 */
    compile: function(node) {
        // 得到所有属性节点
        var nodeAttrs = node.attributes,
            me = this;
        // 遍历每个属性节点
        [].slice.call(nodeAttrs).forEach(function(attr) {
            // 得到属性名: v-on:click
            var attrName = attr.name;
            // 如果是指令属性
            if (me.isDirective(attrName)) {
                // 得到属性值(表达式): test
                var exp = attr.value;
                // 得到指令名: on:click
                var dir = attrName.substring(2);
                // 如果是事件指令
                if (me.isEventDirective(dir)) {
                    // 解析事件指令
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                // 如果是普通指令
                } else {
                    // 调用对应的编译工具函数
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
                // 移除指令属性
                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {
        compileUtil.text(node, this.$vm, exp);
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

/* 
一个包含n个编译模板语法的方法对象
*/
var compileUtil = {
    /* 编译v-text/{{}} */
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    
    /* 编译v-html */
    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },
    
    /* 编译v-model */
    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');
        
        var me = this,
        val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            
            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },
    
    /* 编译v-class */
    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },
    
    /* 
    正在编译模板语法的方法
    exp: 表达式  name
    dir: 指令名  text/html/class/model
    */
    bind: function(node, vm, exp, dir) {
        // 根据指令名得到对应的更新节点的函数
        var updaterFn = updater[dir + 'Updater'];
        // 执行更新函数去更新节点(第一次, ==> 初始化显示)
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // 创建用于更新节点的watcher对象
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        // 得到根据指令名事件名: click
        var eventType = dir.split(':')[1],
        // 根据表达式去methods中得到事件回调函数
            fn = vm.$options.methods && vm.$options.methods[exp];
        if (eventType && fn) {
            // 判断指定事件名和回调函数的DOM事件监听, 回调函数的this指定为vm
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


/* 
包含一些用于进行DOM更新的方法的工具对象
*/
var updater = {
    /* 更新节点的textContent属性 */
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    
    /* 更新节点的innerHTML属性 */
    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },
    
    /* 更新节点的className属性 */
    classUpdater: function(node, value, oldValue) {
        // 得到静态类名
        var className = node.className;
        // 将静态类名拼接到动态类名, 指定为新的类名
        node.className = className ? className + ' ' + value : value
    },
    
    /* 更新节点的value属性 */
    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};
```



#### 正则的子匹配

`var reg = /\{\{(.*)\}\}/;`

正则表达式被小括号包起来的匹配是子匹配，取得子匹配$1