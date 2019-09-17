

<h1 align='center'>Vue源码解析</h1>
#### 伪数组生成真数组

`Array.from(伪数组)`

##### call改变slice的this的指向，执行这个函数，返回一个真数组

##### `call和apply可以让任意函数成为任意对象的方法`

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

  ​	在内存中更新节点，然后一次性（批量）更新

DocumentFragment只存在于内存中的节点

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
    * 事件指令
    * 一般指令
  * 解析文本节点（编译插值语法）
  * 有子元素，则递归调用解析方法
* 将fragment容器中的内容，还给el元素

###### 编译时调用编译模板的方法

###### 真正编译调用的方法bind()

##### 解析大括号文本表达式文本节点

根据插值表达式的内容，在vm的data中取得要，插入文本节点的内容（value）textNode.textContent = value

##### 解析插值表达式语法

* 事件指定
  * 获取指令（v-on:xxx="yyy"）
  * 是什么事件 xxx
  * 回调函数在哪yyy(   在options的methods中  ——>  yyy(){})
  
* 普通指令
  * 获取指令 (v-xxx="yyy")
  * 是那种普通指令 xxx
  * 调用哪个工具方法 ComplierUtils ——>  xxx
  
  ###### 编译时调用编译模板的方法
  
  ###### 真正编译调用的方法bind()

##### 如何更新页面



![](https://camo.githubusercontent.com/3845b9554e62650727fa7cae8f1c169060b879f7/68747470733a2f2f636e2e7675656a732e6f72672f696d616765732f646174612e706e67)



##### 数据的监视

我们首先从MVVM对象创建开始走一遍流程，（MVVM相当于Vue）



这是MVVM的构造函数，它主要依次做了三件事：

1.实现data数据代理

<a href="#### 数据代理">数据代理</a>

2.对data进行数据劫持

3.创建编译对象，编译页面



```javascript
/* 
相当于Vue的构造函数
options: 配置对象
*/
function MVVM(options) {
    // 将配置对象保存到vm上
    this.$options = options;
    // 将data对象保存到vm和变量data上
    var data = this._data = this.$options.data;
    // 将vm保存到变量me上
    var me = this;
    // 遍历data中所有属性
    Object.keys(data).forEach(function(key) {
        // 对指定属性实现数据代理
        me._proxy(key);
    });
	
	//对data中所有属性进行监视劫持
    observe(data, this);

    // 创建编译对象
    this.$compile = new Compile(options.el || document.body, this)
}
```

数据代理前面已经写过了，下面讲讲数据劫持和更新编译（更新页面）

##### 数据劫持

mvvm.js

```javascript
//对data中所有属性进行监视劫持
    observe(data, this);
```

observer.js

```javascript
//使用observer.js中的方法监视数据
//1.监视对象
function observe(value, vm) {//value 是 data , vm 是 vm
    if (!value || typeof value !== 'object') {
        return;
    }
	//2.创建Observer对象
    return new Observer(value);
};

function Observer(data) {
	//保存data对象
    this.data = data;
	//3.开始监视流程
    this.walk(data);
}
Observer.prototype = {
    //4.进行遍历
    walk: function(data) {
        var me = this;
		//遍历data中每个属性
        Object.keys(data).forEach(function(key) {
			//5.给data重新定义响应式属性
            me.convert(key, data[key]);
        });
    },
    convert: function(key, val) {
        //6.调用
        this.defineReactive(this.data, key, val);
    },
	//7.执行
    defineReactive: function(data, key, val) {//data是data,key是属性名，val是属性值
		//8.创建一个对应的dep对象
        var dep = new Dep();
		//9.递归调用observe，监听对象的所有的属性
        var childObj = observe(val);

		//10.重新定义属性（结束，此时已经实现了对所有属性的劫持，通过重新定义data中的属性【使用属性描述符，即设置getset方法】）
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
				//间里dep与watcher 的关系
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {//监视数据变化更新界面
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通过dep订阅器，通知所有watcher订阅者
                dep.notify();
            }
        });
    }
};

```

##### 数据绑定

watcher和dep的关系是怎么确立的，对data影响页面更新有什么作用？

在数据劫持完成之后，会进行页面的编译

mvvm.js

```javascript
 // 1.创建编译对象
    this.$compile = new Compile(options.el || document.body, this)
```

complie.js

```javascript
//2.执行这个构造函数
function Compile(el, vm) {
    // 保存vm
    this.$vm = vm;
    // 保存el元素
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
	//3.编译
    if (this.$el) {
        //  4.取出el中所有子节点, 转移到fragment对象中//不用进去了
        this.$fragment = this.node2Fragment(this.$el);
        //  5.编译fragment所有层次子节点//我们进入去看
        this.init();
        //  将编译好的所有子添加回el元素
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
	//6.执行init
    init: function() {
        //7.进入编译
        this.compileElement(this.$fragment);
    },

    /* 
    8.编译指定el的所有子节点，分为插值节点，指令节点，我们随便进个插值节点就可以
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
            // 9.（进入插值语法的编译）如果节点是一个插值语法格式的文本节点
            } else if (me.isTextNode(node) && reg.test(text)) {
                //10. 编译插值语法的文本节点
                me.compileText(node, RegExp.$1);
            }
            // 如果这个子节点它有下一级的子节点
            if (node.childNodes && node.childNodes.length) {
                // 递归调用 ==> 实现所有层次子节点的编译
                me.compileElement(node);
            }
        });
    },

  
	//11.调用这个方法编译插值语法
    compileText: function(node, exp) {
        //12.调用compileUtil的方法
        compileUtil.text(node, this.$vm, exp);
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

   
};

/* 
一个包含n个编译模板语法的方法对象
*/
var compileUtil = {
    /* 编译v-text/{{}} */
    //13.进入这个方法，调用bind方法，一直调别的方法，都没干什么事啊，重点应该快来了
    text: function(node, vm, exp) {
        //14.调bind
        this.bind(node, vm, exp, 'text');
    },

    
    /* 
    正在编译模板语法的方法
    exp: 表达式  name
    dir: 指令名  text/html/class/model
    */
    bind: function(node, vm, exp, dir) {
        // 15.根据指令名得到对应的更新节点的函数(textUpdater)
        var updaterFn = updater[dir + 'Updater'];
        // 16.执行更新函数去更新节点(第一次, ==> 初始化显示)
        //注意这里调用了this._getVMVal(vm, exp)，会触发data劫持，这次劫持不会触发watcher和depd的相互绑定；原因不说了不重要
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // 17.（重重重点）创建用于更新节点的watcher对象
        //看看创建对象的时候做了什么吧，我们在下一个代码块看watcher.js的源代码
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

};

/* 
包含一些用于进行DOM更新的方法的工具对象
*/
var updater = {
    /* 更新节点的textContent属性 */
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    }
    
  
};
```

watcher.js

```javascript
//18.调用watcher的构造函数
function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.depIds = {};
    //19.调用get方法（数据绑定的谜底这里解开），进入看看
    this.value = this.get();
}

Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.get();
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    //28.回来了，看看干了什么
    addDep: function(dep) {
    //老师说的很好，前两句就说明了要点，但是太罗嗦了，建议不看    
        // 1. 每次调用run()的时候会触发相应属性的getter
        // getter里面会触发dep.depend()，继而触发这里的addDep
        // 2. 假如相应属性的dep.id已经在当前watcher的depIds里，说明不是一个新的属性，仅仅是改变了其值而已
        // 则不需要将当前watcher添加到该属性的dep里
        // 3. 假如相应属性是新的属性，则将当前watcher添加到新属性的dep里
        // 如通过 vm.child = {name: 'a'} 改变了 child.name 的值，child.name 就是个新属性
        // 则需要将当前watcher(child.name)加入到新的 child.name 的dep里
        // 因为此时 child.name 是个新值，之前的 setter、dep 都已经失效，如果不把 watcher 加入到新的 child.name 的dep中
        // 通过 child.name = xxx 赋值的时候，对应的 watcher 就收不到通知，等于失效了
        // 4. 每个子属性的watcher在添加到子属性的dep的同时，也会添加到父属性的dep
        // 监听子属性的同时监听父属性的变更，这样，父属性改变时，子属性的watcher也能收到通知进行update
        // 这一步是在 this.get() --> this.getVMVal() 里面完成，forEach时会从父级开始取值，间接调用了它的getter
        // 触发了addDep(), 在整个forEach过程，当前wacher都会加入到每个父级过程属性的dep
        // 例如：当前watcher的是'child.child.name', 那么child, child.child, child.child.name这三个属性的dep都会加入当前watcher
        //29.这个函数中的this是watcher；
        //如果这个watcher已经有了这个data那个属性对应的Dep的话，就不管，没有就相互建立关系
        if (!this.depIds.hasOwnProperty(dep.id)) {
			//30.建立dep到watcher的关系
            //建立什么关系呢，看看，跳到下个代码块obsever.js
            dep.addSub(this);
            //33.(结束了)建立watcher到dep的关系
			//建立啥关系呢，就是给depId对象加一个属性啊，属性名是dep的Id，属性值是Dep
            //那这和data改变页面就会更新有什么关系呢？哈哈，不要忘了我们的数据劫持还有set方法，下一小节就会将为什么data的变化会导致页面的更新
            this.depIds[dep.id] = dep;
        }
    },
    //20.调用get
    get: function() {
        //21.Dep函数对象加上target为当前这个watcher对象
        Dep.target = this;
        //22.调用getVMVal()，获取exp（表达式）的属性值
        var value = this.getVMVal();
        Dep.target = null;
        return value;
    },
	
    getVMVal: function() {
        //形如a.b.c
        var exp = this.exp.split('.');
        //获取data
        var val = this.vm._data;
        //23.从data取得数据
        //注意这里这个  val[k]  它实际上调用了val的get方法（由于数据劫持的缘故，我们进入get方法一探究竟，在下一个observer.js代码块）
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    }
};
```

observer.js

```javascript
	//重新定义属性
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
				//24.建立dep与watcher 的关系
                if (Dep.target) {//有值，是当前的watcher
                    //25.调用Dep的实例方法
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {//监视数据变化更新界面
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通过dep订阅器，通知所有watcher订阅者
                dep.notify();
            }
        });

var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    //31.把watcher放到自己的一个数组里，保存起来，（目的是一会数据变了可以通知这些watcher）
    addSub: function(sub) {
        //32.执行完了添加，我们回去，跳到上个代码块watcher.js
        this.subs.push(sub);
    },
	//26.Dep的实例方法
    depend: function() {
        //27.Dep.targer === watcher对象；即watcher调用addDep(dep)//参数是当前的dep
        //我们回到上个代码块watcher.js看看
        Dep.target.addDep(this);
		
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
		//遍历watcher，调用其update方法
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};
```



##### data的变化导致页面的更新，为什么

data的变化一定会调用数据的set方法，我们进到那个set方法看看他都做了什么

observer.js

```javascript
//重新定义属性
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
				//间里dep与watcher 的关系
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {//监视数据变化更新界面
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                //1.前面的不重要，看看这个方法做了什么
                // 通过dep订阅器，通知所有watcher订阅者
                dep.notify();
            }
        });

Dep.prototype = {

    notify: function() {
		//2.遍历watcher，调用其update方法，那update方法做了什么呢，我们进入watcher.js的源代码看看
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};
```

watcher.js

```javascript
function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.depIds = {};
    this.value = this.get();
}

Watcher.prototype = {
    //3.update调用了run啊，看看
    update: function() {
        this.run();
    }
    //4.
    run: function() {
        //5.通过调用get获取了表达式的值啊
        var value = this.get();
        //4.还取出了以前的老值
        var oldVal = this.value;
        if (value !== oldVal) {
            //6.如果新老值不一样
            //更新了一下value
            this.value = value;
            //7.调用一个回调，这个回调实在watcher刚创建的时候获得的，是由程序自己传递的，我们看看这个回调干啥了，这个回调在complie.js中传的，进入下一个代码块，complie.js看看
            this.cb.call(this.vm, value, oldVal);
        }
    },
   
    get: function() {
        Dep.target = this;
        var value = this.getVMVal();
        Dep.target = null;
        return value;
    },

    getVMVal: function() {
        var exp = this.exp.split('.');
        var val = this.vm._data;
        //在这里进行了get方法的调用
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    }
};
```

complie.js

```javascript
   bind: function(node, vm, exp, dir) {
        // 根据指令名得到对应的更新节点的函数
        var updaterFn = updater[dir + 'Updater'];
        // 执行更新函数去更新节点(第一次, ==> 初始化显示)
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // 8.我们看到了这个回调函数长什么样子
        new Watcher(vm, exp, function(value, oldValue) {
            //9.回掉函数，调用了updateFn方法，从这个bind函数的第二行可以看出，就是updater系列方法，这三个参数，node没有传所以会沿着作用域链查找，所以直接找到了bind的node参数，形成了闭包，所以就可以直接更新节点了
            updaterFn && updaterFn(node, value, oldValue);
        });
    },
        
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











⠄⠄⠄⠄⠄⠄⢴⡶⣶⣶⣶⡒⣶⣶⣖⠢⡄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄ 
⠄⠄⠄⠄⠄⠄⢠⣿⣋⣿⣿⣉⣿⣿⣯⣧⡰⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄ 
⠄⠄⠄⠄⠄⠄⣿⣿⣹⣿⣿⣏⣿⣿⡗⣿⣿⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄ 
⠄⠄⠄⠄⠄⠄⠟⡛⣉⣭⣭⣭⠌⠛⡻⢿⣿⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄ 
⠄⠄⠄⠄⠄⠄⠄⠄⣤⡌⣿⣷⣯⣭⣿⡆⣈⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄ 
⠄⠄⠄⠄⠄⠄⠄⢻⣿⣿⣿⣿⣿⣿⣿⣷⢛⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄ 
⠄⠄⠄⠄⠄⠄⠄⠄⢻⣷⣽⣿⣿⣿⢿⠃⣼⣧⣀⠄⠄⠄⠄⠄⠄⠄⠄⠄ 
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣛⣻⣿⠟⣀⡜⣻⢿⣿⣿⣶⣤⡀⠄⠄⠄⠄⠄ 
⠄⠄⠄⠄⠄⠄⠄⠄⢠⣤⣀⣨⣥⣾⢟⣧⣿⠸⣿⣿⣿⣿⣿⣤⡀⠄⠄⠄ 
⠄⠄⠄⠄⠄⠄⠄⠄⢟⣫⣯⡻⣋⣵⣟⡼⣛⠴⣫⣭⣽⣿⣷⣭⡻⣦⡀⠄ 
⠄⠄⠄⠄⠄⠄⠄⢰⣿⣿⣿⢏⣽⣿⢋⣾⡟⢺⣿⣿⣿⣿⣿⣿⣷⢹⣷⠄ 
⠄⠄⠄⠄⠄⠄⠄⣿⣿⣿⢣⣿⣿⣿⢸⣿⡇⣾⣿⠏⠉⣿⣿⣿⡇⣿⣿⡆ 
⠄⠄⠄⠄⠄⠄⠄⣿⣿⣿⢸⣿⣿⣿⠸⣿⡇⣿⣿⡆⣼⣿⣿⣿⡇⣿⣿⡇ 
⠇⢀⠄⠄⠄⠄⠄⠘⣿⣿⡘⣿⣿⣷⢀⣿⣷⣿⣿⡿⠿⢿⣿⣿⡇⣩⣿⡇ 
⣿⣿⠃⠄⠄⠄⠄⠄⠄⢻⣷⠙⠛⠋⣿⣿⣿⣿⣿⣷⣶⣿⣿⣿⡇⣿⣿⡇



##### 如何双向绑定

VM ——> V  ：data改变时（set被调用），触发watcher的update方法更新页面

V ——> VM : 绑定input事件：得到输入框最新的值，设置给vm的data的对应属性

##### 编译解析源代码

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