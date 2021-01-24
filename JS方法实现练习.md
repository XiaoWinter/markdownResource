<h1 align='center'>JS方法实现练习</h1>
### 构造函数

例如

```javascript
如果构造函数return了一个对象A，那么new Fn()返回的就是对象A
function Person(){
	...
	//return 基本类型 返回的是Person
	//return 引用数据类型 返回的是此引用数据类型（对象）
}
```



### new

```javascript
function newInstance(Fn , ...arg){
	const obj = {}
	const result = Fn.apply(obj, args)
	result instanceof Object ? result : obj
}
```

### instanceOf

```javascript
function instanceOf(obj , type){
	//A.__proto__ ===B.prototype
    if(obj.__proto__ === type.prototype){
        return true
    }else if(obj.__proto__){
        return false
    }else{
        return instanceOf(obj.__proto__ , type)
    }
}
```

```javascript
function instanceOf(obj , type){
	//A.__proto__ ===B.prototype
    while(obj.__proto__){
    	if(obj.__proto__===type.prototype){
            return true
        }      
        obj = obj.__proto__
    }
}
```

### [debounce](https://zh.javascript.info/task/debounce)

```javascript
function debounce(func,delay){
  let isrun = false
  return function(){
    clearTimeout(isrun)
    isrun = setTimeout(()=>{
      func.apply(this,arguments)
    },delay)
  }
}
```

### [throttle](https://zh.javascript.info/task/throttle)

```javascript
// 流程 开始--立刻--> f(1)--3s-->f(2)--3s-->f(3)--3s-->f(4)
function throttle(func, delay){
  let isrun,arg
  return function wrapper(){
      if(isrun){
        arg = arguments
        return 
      }
      func.apply(this, arguments)

      isrun = true

      setTimeout(()=>{
          // 很重要
          isrun = false
          if(arg){
              // 很重要
              wrapper.apply(this, arg)
              arg = null
          }
      },delay)
      
  }
}

// 测试

function test(a) {
  console.log(a)
}

function delayRun(fn, delay, ...args) {
  return new Promise((resolve) => {
    setTimeout(() => {
      fn(...args)
      resolve()
    }, delay)
  })
}

let testThrottle = throttle(test, 1000)

async function testExample() {
  testThrottle(1)
  testThrottle(2)
  await delayRun(testThrottle, 5000, 3)
  testThrottle(1)
}

testExample()
```

### [原型继承（*Prototypal inheritance*）](https://zh.javascript.info/prototype-inheritance)

#### [[Prototype\]] 原型

在 JavaScript 中，对象有一个特殊的隐藏属性 `[[Prototype]]`（如规范中所命名的），它要么为 `null`，要么就是对另一个对象的引用。该对象被称为“原型”：

<svg xmlns="http://www.w3.org/2000/svg" width="191" height="150" viewBox="0 0 191 150"><defs><style>@import url(https://fonts.googleapis.com/css?family=Open+Sans:bold,italic,bolditalic%7CPT+Mono);@font-face{font-family:'PT Mono';font-weight:700;font-style:normal;src:local('PT MonoBold'),url(/font/PTMonoBold.woff2) format('woff2'),url(/font/PTMonoBold.woff) format('woff'),url(/font/PTMonoBold.ttf) format('truetype')}</style></defs><g id="inheritance" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="object-prototype-empty.svg"><path id="Rectangle-1" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M14 23h118v28H14z"/><text id="prototype-object" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="12" y="15">prototype object</tspan></text><path id="Rectangle-1" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M14 111h118v28H14z"/><text id="object" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="13" y="103">object</tspan></text><path id="Line" fill="#EE6B47" fill-rule="nonzero" d="M73.5 60.5l7 14h-6v28h-2v-28h-6l7-14z"/><text id="[[Prototype]]" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="83" y="82">[[Prototype]]</tspan></text></g></g></svg>

当我们从 `object` 中读取一个缺失的属性时，JavaScript 会自动从原型中获取该属性。在编程中，这种行为被称为“原型继承”。

属性 `[[Prototype]]` 是内部的而且是隐藏的，但是这儿有很多设置它的方式。

其中之一就是使用特殊的名字 `__proto__`，就像这样

```javascript
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal; // 设置 rabbit.[[Prototype]] = animal
```

现在，如果我们从 `rabbit` 中读取一个它没有的属性，JavaScript 会自动从 `animal` 中获取。

````javascript
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal; // (*)

// 现在这两个属性我们都能在 rabbit 中找到：
alert( rabbit.eats ); // true (**)
alert( rabbit.jumps ); // true
````

<svg xmlns="http://www.w3.org/2000/svg" width="191" height="150" viewBox="0 0 191 150"><defs><style>@import url(https://fonts.googleapis.com/css?family=Open+Sans:bold,italic,bolditalic%7CPT+Mono);@font-face{font-family:'PT Mono';font-weight:700;font-style:normal;src:local('PT MonoBold'),url(/font/PTMonoBold.woff2) format('woff2'),url(/font/PTMonoBold.woff) format('woff'),url(/font/PTMonoBold.ttf) format('truetype')}</style></defs><g id="inheritance" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="proto-animal-rabbit.svg"><path id="Rectangle-1" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M14 23h118v28H14z"/><text id="eats:-true" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="24" y="40">eats: true</tspan></text><text id="animal" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="13" y="15">animal</tspan></text><path id="Rectangle-1" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M14 111h118v28H14z"/><text id="jumps:-true" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="24" y="128">jumps: true</tspan></text><text id="rabbit" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="13" y="103">rabbit</tspan></text><path id="Line" fill="#EE6B47" fill-rule="nonzero" d="M73.5 60.5l7 14h-6v28h-2v-28h-6l7-14z"/><text id="[[Prototype]]" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="83" y="82">[[Prototype]]</tspan></text></g></g></svg>

在这儿我们可以说 "`animal` 是 `rabbit` 的原型"，或者说 "`rabbit` 的原型是从 `animal` 继承而来的"。

因此，如果 `animal` 有许多有用的属性和方法，那么它们将自动地变为在 `rabbit` 中可用。这种属性被称为“继承”。



这里只有两个限制：

1. 引用不能形成闭环。如果我们试图在一个闭环中分配 `__proto__`，JavaScript 会抛出错误。
2. `__proto__` 的值可以是对象，也可以是 `null`。而其他的类型都会被忽略。

**注意**

参考资料：

[原型简史](https://zh.javascript.info/prototype-methods#yuan-xing-jian-shi)

[总结](https://zh.javascript.info/prototype-methods#zong-jie)

`__proto__` **是** `[[Prototype]]` **的因历史原因而留下来的 getter/setter**

`__proto__` 是一种访问 `[[Prototype]]` 的方式，而不是 `[[prototype]]` 本身。

<svg xmlns="http://www.w3.org/2000/svg" width="449" height="190" viewBox="0 0 449 190"><defs><style>@import url(https://fonts.googleapis.com/css?family=Open+Sans:bold,italic,bolditalic%7CPT+Mono);@font-face{font-family:'PT Mono';font-weight:700;font-style:normal;src:local('PT MonoBold'),url(/font/PTMonoBold.woff2) format('woff2'),url(/font/PTMonoBold.woff) format('woff'),url(/font/PTMonoBold.ttf) format('truetype')}</style></defs><g id="inheritance" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="object-prototype-2.svg"><path id="Rectangle-1" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M233 23h207v58H233z"/><text id="..." fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="243" y="38">...</tspan> <tspan x="243" y="53">get __proto__: function</tspan> <tspan x="243" y="68">set __proto__: function</tspan></text><path id="Rectangle-1-Copy" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M233 150h207v28H233z"/><text id="Object.prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="232" y="15">Object.prototype</tspan></text><path id="Rectangle-1-Copy-2" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M10 23h108v28H10z"/><text id="Object" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="9" y="15">Object</tspan></text><text id="obj" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="238" y="139">obj</tspan></text><path id="Line" fill="#EE6B47" fill-rule="nonzero" d="M321.5 94.5l7 14h-6v28h-2v-28h-6l7-14z"/><path id="Line-Copy" fill="#EE6B47" fill-rule="nonzero" d="M194 27l14 7-14 7v-6h-67v-2h67v-6z"/><text id="[[Prototype]]" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="331" y="118">[[Prototype]]</tspan></text><text id="prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="134" y="22">prototype</tspan></text></g></g></svg>

`__proto__` 被认为是过时且不推荐使用的（deprecated），这里的不推荐使用是指 JavaScript 规范中规定，**proto** 必须仅在浏览器环境下才能得到支持。

现代的方法有：

- [Object.create(proto, [descriptors\])](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/create) —— 利用给定的 `proto` 作为 `[[Prototype]]` 和可选的属性描述来创建一个空对象。
- [Object.getPrototypeOf(obj)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) —— 返回对象 `obj` 的 `[[Prototype]]`。
- [Object.setPrototypeOf(obj, proto)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) —— 将对象 `obj` 的 `[[Prototype]]` 设置为 `proto`。

应该使用这些方法来代替 `__proto__`。



此调用可以对 `obj` 进行真正准确地拷贝，包括所有的属性：可枚举和不可枚举的，数据属性和 setters/getters —— 包括所有内容，并带有正确的 `[[Prototype]]`。

```javascript
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

### [F.prototype](https://zh.javascript.info/function-prototype)

我们还记得，可以使用诸如 `new F()` 这样的构造函数来创建一个新对象。

如果 `F.prototype` 是一个对象，那么 `new` 操作符会使用它为新对象设置 `[[Prototype]]`。

**请注意：**

JavaScript 从一开始就有了原型继承。这是 JavaScript 编程语言的核心特性之一。

但是在过去，没有直接对其进行访问的方式。唯一可靠的方法是本章中会介绍的构造函数的 `"prototype"` 属性。目前仍有许多脚本仍在使用它。

**请注意，这里的 `F.prototype` 指的是 `F` 的一个名为 `"prototype"` 的常规属性。这听起来与“原型”这个术语很类似，但这里我们实际上指的是具有该名字的常规属性。**

下面是一个例子：

```javascript
let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true
```

设置 `Rabbit.prototype = animal` 的字面意思是：“当创建了一个 `new Rabbit` 时，把它的 `[[Prototype]]` 赋值为 `animal`”。

这是结果示意图：

<svg xmlns="http://www.w3.org/2000/svg" width="453" height="160" viewBox="0 0 453 160"><defs><style>@import url(https://fonts.googleapis.com/css?family=Open+Sans:bold,italic,bolditalic%7CPT+Mono);@font-face{font-family:'PT Mono';font-weight:700;font-style:normal;src:local('PT MonoBold'),url(/font/PTMonoBold.woff2) format('woff2'),url(/font/PTMonoBold.woff) format('woff'),url(/font/PTMonoBold.ttf) format('truetype')}</style></defs><g id="inheritance" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="proto-constructor-animal-rabbit.svg"><path id="Rectangle-1" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M233 23h187v28H233z"/><text id="eats:-true" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="243" y="42">eats: true</tspan></text><path id="Rectangle-1-Copy" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M233 124h187v28H233z"/><text id="name:-&quot;White-Rabbit&quot;" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="246" y="143">name: "White Rabbit"</tspan></text><text id="animal" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="232" y="15">animal</tspan></text><path id="Rectangle-1-Copy-2" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M10 23h99v28H10z"/><text id="Rabbit" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="9" y="15">Rabbit</tspan></text><text id="rabbit" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="238" y="113">rabbit</tspan></text><path id="Line" fill="#EE6B47" fill-rule="nonzero" d="M321.5 68.5l7 14h-6v28h-2v-28h-6l7-14z"/><path id="Line-Copy" fill="#EE6B47" fill-rule="nonzero" d="M208 27l14 7-14 7v-6h-81v-2h81v-6z"/><text id="[[Prototype]]" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="331" y="92">[[Prototype]]</tspan></text><text id="prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="134" y="22">prototype</tspan></text></g></g></svg>

**请注意**：  **`F.prototype` 仅用在 `new F` 时**

`F.prototype` 属性仅在 `new F` 被调用时使用，它为新对象的 `[[Prototype]]` 赋值。

如果在创建之后，`F.prototype` 属性有了变化（`F.prototype = <another object>`），那么通过 `new F` 创建的新对象也将随之拥有新的对象作为 `[[Prototype]]`，但已经存在的对象将保持旧有的值。

### 默认的 F.prototype，构造器属性

每个函数都有 `"prototype"` 属性，即使我们没有提供它。

默认的 `"prototype"` 是一个只有属性 `constructor` 的对象，属性 `constructor` 指向函数自身。

像这样：

```javascript
function Rabbit() {}

/* default prototype
Rabbit.prototype = { constructor: Rabbit };
*/

alert( Rabbit.prototype.constructor == Rabbit ); // true
```

<svg xmlns="http://www.w3.org/2000/svg" width="460" height="157" viewBox="0 0 460 157"><defs><style>@import url(https://fonts.googleapis.com/css?family=Open+Sans:bold,italic,bolditalic%7CPT+Mono);@font-face{font-family:'PT Mono';font-weight:700;font-style:normal;src:local('PT MonoBold'),url(/font/PTMonoBold.woff2) format('woff2'),url(/font/PTMonoBold.woff) format('woff'),url(/font/PTMonoBold.ttf) format('truetype')}</style></defs><g id="inheritance" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="rabbit-prototype-constructor.svg"><g id="Line-Copy-5-+-Line-Copy-4-+-Line-Copy-3" stroke="#EC6B4E" stroke-linecap="square" stroke-width="2" transform="matrix(1 0 0 -1 224 108)"><path id="Line-Copy-5" stroke-dasharray="1,2,1,8" d="M86.372 4.412v14.926c0 30.925-85.263 30.925-85.263 30.925"/><path id="Line-Copy-4" d="M1.663 49.76l8.872-9.047"/><path id="Line-Copy-3" d="M.554 50.766l7.763 6.031"/></g><path id="Rectangle-1" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M248 23v28h158V23H248z"/><text id="default-&quot;prototype&quot;" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="248.2" y="15">default "prototype"</tspan></text><path id="Rectangle-1-Copy" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M248 121h158v28H248z"/><path id="Rectangle-1-Copy-2" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M10 23h99v28H10z"/><text id="Rabbit" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="9" y="15">Rabbit</tspan></text><text id="rabbit" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="248" y="112">rabbit</tspan></text><path id="Line" fill="#EE6B47" fill-rule="nonzero" d="M323.5 65.5l7 14h-6v28h-2v-28h-6l7-14z"/><path id="Line-Copy" fill="#EE6B47" fill-rule="nonzero" d="M207 27l14 7-14 7v-6h-80v-2h80v-6z"/><path id="Line-Copy-2" fill="#EE6B47" fill-rule="nonzero" d="M142 37v6h80v2h-80v6l-14-7 14-7z"/><text id="[[Prototype]]" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="333" y="89">[[Prototype]]</tspan></text><text id="prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="134" y="22">prototype</tspan></text><text id="constructor" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="128" y="62">constructor</tspan></text></g></g></svg>

### [原生的原型](https://zh.javascript.info/native-prototypes)

`"prototype"` 属性在 JavaScript 自身的核心部分中被广泛地应用。所有的内置构造函数都用到了它。

首先，我们将看看原生原型的详细信息，然后学习如何使用它为内建对象添加新功能。

#### Object.prototype

假如我们输出一个空对象：

```
let obj = {};
alert( obj ); // "[object Object]" ?
```

生成字符串 `"[object Object]"` 的代码在哪里？那就是一个内建的 `toString` 方法，但是它在哪里呢？`obj` 是空的！

……然而简短的表达式 `obj = {}` 和 `obj = new Object()` 是一个意思，其中 `Object` 就是一个内建的对象构造函数，其自身的 `prototype` 指向一个带有 `toString` 和其他方法的一个巨大的对象。

就像这样：

<svg xmlns="http://www.w3.org/2000/svg" width="453" height="94" viewBox="0 0 453 94"><defs><style>@import url(https://fonts.googleapis.com/css?family=Open+Sans:bold,italic,bolditalic%7CPT+Mono);@font-face{font-family:'PT Mono';font-weight:700;font-style:normal;src:local('PT MonoBold'),url(/font/PTMonoBold.woff2) format('woff2'),url(/font/PTMonoBold.woff) format('woff'),url(/font/PTMonoBold.ttf) format('truetype')}</style></defs><g id="inheritance" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="object-prototype.svg"><path id="Rectangle-1" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M233 23h208v58H233z"/><text id="constructor:-Object" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="243" y="39">constructor: Object</tspan> <tspan x="243" y="54">toString: function</tspan> <tspan x="243" y="69">...</tspan></text><text id="Object.prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="232" y="15">Object.prototype</tspan></text><path id="Rectangle-1-Copy-2" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M10 23h107v28H10z"/><text id="Object" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="9" y="15">Object</tspan></text><path id="Line-Copy" fill="#EE6B47" fill-rule="nonzero" d="M194 27l14 7-14 7v-6h-67v-2h67v-6z"/><text id="prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="134" y="22">prototype</tspan></text></g></g></svg>

当 `new Object()` 被调用（或一个字面量对象 `{...}` 被创建），按照前面章节中我们学习过的规则，这个对象的 `[[Prototype]]` 属性被设置为 `Object.prototype`：

<svg xmlns="http://www.w3.org/2000/svg" width="453" height="199" viewBox="0 0 453 199"><defs><style>@import url(https://fonts.googleapis.com/css?family=Open+Sans:bold,italic,bolditalic%7CPT+Mono);@font-face{font-family:'PT Mono';font-weight:700;font-style:normal;src:local('PT MonoBold'),url(/font/PTMonoBold.woff2) format('woff2'),url(/font/PTMonoBold.woff) format('woff'),url(/font/PTMonoBold.ttf) format('truetype')}</style></defs><g id="inheritance" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="object-prototype-1.svg"><path id="Rectangle-1" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M238 23h208v58H238z"/><text id="constructor:-Object" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="248" y="40">constructor: Object</tspan> <tspan x="248" y="55">toString: function</tspan> <tspan x="248" y="70">...</tspan></text><path id="Rectangle-1-Copy" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M238 164h178v28H238z"/><text id="Object.prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="237" y="15">Object.prototype</tspan></text><path id="Rectangle-1-Copy-2" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M10 23h108v28H10z"/><text id="Object" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="9" y="15">Object</tspan></text><text id="obj-=-new-Object()" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="243" y="154">obj = new Object()</tspan></text><path id="Line" fill="#EE6B47" fill-rule="nonzero" d="M326.5 94.5l7 14h-6v28h-2v-28h-6l7-14z"/><path id="Line-Copy" fill="#EE6B47" fill-rule="nonzero" d="M212.5 27l14 7-14 7v-6H127v-2h85.5v-6z"/><text id="[[Prototype]]" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="336" y="118">[[Prototype]]</tspan></text><text id="prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="134" y="22">prototype</tspan></text></g></g></svg>

所以，之后当 `obj.toString()` 被调用时，这个方法是从 `Object.prototype` 中获取的。

我们可以这样验证它：

```javascript
let obj = {};

alert(obj.__proto__ === Object.prototype); // true

alert(obj.toString === obj.__proto__.toString); //true
alert(obj.toString === Object.prototype.toString); //true
```

请注意在 `Object.prototype` 上方的链中没有更多的 `[[Prototype]]`：

```javascript
alert(Object.prototype.__proto__); // null
```

#### 其他内建原型

其他内建对象，像 `Array`、`Date`、`Function` 及其他，都在 prototype 上挂载了方法。

例如，当我们创建一个数组 `[1, 2, 3]`，在内部会默认使用 `new Array()` 构造器。因此 `Array.prototype` 变成了这个数组的 prototype，并为这个数组提供数组的操作方法。这样内存的存储效率是很高的。

按照规范，所有的内建原型顶端都是 `Object.prototype`。这就是为什么有人说“一切都从对象继承而来”。

下面是完整的示意图（3 个内建对象）：

<svg xmlns="http://www.w3.org/2000/svg" width="692" height="411" viewBox="0 0 692 411"><defs><style>@import url(https://fonts.googleapis.com/css?family=Open+Sans:bold,italic,bolditalic%7CPT+Mono);@font-face{font-family:'PT Mono';font-weight:700;font-style:normal;src:local('PT MonoBold'),url(/font/PTMonoBold.woff2) format('woff2'),url(/font/PTMonoBold.woff) format('woff'),url(/font/PTMonoBold.ttf) format('truetype')}</style></defs><g id="inheritance" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="native-prototypes-classes.svg"><path id="Rectangle-1" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M240 93h198v58H240z"/><text id="toString:-function" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="250" y="116">toString: function</tspan> <tspan x="250" y="131">other object methods</tspan></text><text id="Object.prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="239" y="85">Object.prototype</tspan></text><path id="Line-2" fill="#EE6B47" fill-rule="nonzero" d="M299.5 27.5l7 14h-6v28h-2v-28h-6l7-14z"/><path id="Line-3" fill="#EE6B47" fill-rule="nonzero" d="M299.5 160.5l7 14h-6v28h-2v-28h-6l7-14z"/><text id="null" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="285" y="16">null</tspan></text><path id="Rectangle-1" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M14 224h198v58H14z"/><text id="slice:-function" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="24" y="247">slice: function</tspan> <tspan x="24" y="262">other array methods</tspan></text><text id="[[Prototype]]" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="66" y="174">[[Prototype]]</tspan></text><text id="[[Prototype]]-Copy-6" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="518" y="175">[[Prototype]]</tspan></text><text id="[[Prototype]]-Copy" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="310" y="187">[[Prototype]]</tspan></text><text id="[[Prototype]]-Copy-2" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="310" y="54">[[Prototype]]</tspan></text><text id="[[Prototype]]" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="310" y="317">[[Prototype]]</tspan></text><text id="[[Prototype]]-Copy-4" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="582" y="317">[[Prototype]]</tspan></text><text id="[[Prototype]]-Copy-5" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="117" y="317">[[Prototype]]</tspan></text><text id="Array.prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="13" y="216">Array.prototype</tspan></text><path id="Rectangle-1" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M243 224h198v58H243z"/><text id="call:-function-other" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="253" y="247">call: function</tspan> <tspan x="253" y="262">other function methods</tspan></text><text id="Function.prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="242" y="216">Function.prototype</tspan></text><path id="Rectangle-1" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M474 224h198v58H474z"/><text id="toFixed:-function" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="484" y="247">toFixed: function</tspan> <tspan x="484" y="262">other number methods</tspan></text><text id="Number.prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="473" y="216">Number.prototype</tspan></text><path id="Line" fill="#EE6B47" fill-rule="nonzero" d="M204.855 157.011l15.645.489-9.778 12.223-2.515-5.448-65.288 30.133-.908.419-.838-1.816.908-.419 65.288-30.133-2.514-5.448zM478.147 157.088l-2.542 5.435 64.319 30.071.905.424-.847 1.811-.906-.423-64.318-30.071-2.54 5.436L462.5 157.5l15.647-.412z"/><path id="Rectangle-5" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M48 339h117v23H48z"/><text id="[1,-2,-3]" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="71" y="354">[1, 2, 3]</tspan></text><path id="Rectangle-6" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M243 339h198v65H243z"/><text id="function-f(args)-{" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="264" y="358">function f(args) {</tspan> <tspan x="264" y="373"> ...</tspan> <tspan x="264" y="388">}</tspan></text><path id="Rectangle-7" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M541 339h69v23h-69z"/><text id="5" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="573" y="355">5</tspan></text><path id="Line-4" fill="#EE6B47" fill-rule="nonzero" d="M299.5 290.5l7 14h-6v28h-2v-28h-6l7-14z"/><path id="Line-5" fill="#EE6B47" fill-rule="nonzero" d="M576.5 290.5l7 14h-6v28h-2v-28h-6l7-14z"/><path id="Line-6" fill="#EE6B47" fill-rule="nonzero" d="M106.5 290.5l7 14h-6v28h-2v-28h-6l7-14z"/></g></g></svg>

### 更改原生原型

原生的原型是可以被修改的。例如，我们向 `String.prototype` 中添加一个方法，这个方法将对所有的字符串都是可用的：

```javascript
String.prototype.show = function() {
  alert(this);
};

"BOOM!".show(); // BOOM!
```

在开发的过程中，我们可能会想要一些新的内建方法，并且想把它们添加到原生原型中。但这通常是一个很不好的想法。

**重要：**

原型是全局的，所以很容易造成冲突。如果有两个库都添加了 `String.prototype.show` 方法，那么其中的一个方法将被另一个覆盖。（嗯，所以修改原型的库就是垃圾）

所以，通常来说，修改原生原型被认为是一个很不好的想法。

**在现代编程中，只有一种情况下允许修改原生原型。那就是 polyfilling。**

Polyfilling 是一个术语，表示某个方法在 JavaScript 规范中已存在，但是特定的 JavaScript 引擎尚不支持该方法，那么我们可以通过手动实现它，并用以填充内建原型。

#### 从原型中借用

在 [装饰器模式和转发，call/apply](https://zh.javascript.info/call-apply-decorators#method-borrowing) 一章中，我们讨论了方法借用。

那是指我们从一个对象获取一个方法，并将其复制到另一个对象。

一些原生原型的方法通常会被借用。

例如，如果我们要创建类数组对象，则可能需要向其中复制一些 `Array` 方法。

例如：

```javascript
let obj = {
  0: "Hello",
  1: "world!",
  length: 2,
};

obj.join = Array.prototype.join;

alert( obj.join(',') ); // Hello,world!

// 或者
obj.join = function(){
    return [].join.call(this) 
   // return Array.prototype.join.call(this)
}
```

上面这段代码有效，是因为内建的方法 `join` 的内部算法只关心正确的索引和 `length` 属性。它不会检查这个对象是否是真正的数组。许多内建方法就是这样。

另一种方式是通过将 `obj.__proto__` 设置为 `Array.prototype`，这样 `Array` 中的所有方法都自动地可以在 `obj` 中使用了。

但是如果 `obj` 已经从另一个对象进行了继承，那么这种方法就不可行了（译注：因为这样会覆盖掉已有的继承。此处 `obj` 其实已经从 `Object` 进行了继承，但是 `Array` 也继承自 `Object`，所以此处的方法借用不会影响 `obj` 对原有继承的继承，因为 `obj` 通过原型链依旧继承了 `Object`）。请记住，我们一次只能继承一个对象。

方法借用很灵活，它允许在需要时混合来自不同对象的方法。



### 类

<svg xmlns="http://www.w3.org/2000/svg" width="486" height="94" viewBox="0 0 486 94"><defs><style>@import url(https://fonts.googleapis.com/css?family=Open+Sans:bold,italic,bolditalic%7CPT+Mono);@font-face{font-family:'PT Mono';font-weight:700;font-style:normal;src:local('PT MonoBold'),url(/font/PTMonoBold.woff2) format('woff2'),url(/font/PTMonoBold.woff) format('woff'),url(/font/PTMonoBold.ttf) format('truetype')}</style></defs><g id="inheritance" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="class-user.svg"><path id="Rectangle-1" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M298 22h178v68H298z"/><text id="sayHi:-function" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="303" y="42">sayHi: function</tspan></text><path id="Rectangle-1-Copy-2" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M8 22h178v68H8z"/><text id="User" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="17" y="15">User</tspan></text><text id="User.prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="302" y="15">User.prototype</tspan></text><path id="Line-Copy" fill="#EE6B47" fill-rule="nonzero" d="M273 37l14 7-14 7v-6h-76v-2h76v-6z"/><text id="prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="203" y="32">prototype</tspan></text><text id="constructor:-User" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="303" y="60">constructor: User</tspan></text><path id="constructor(name){this.name=name;}" fill="#8A704D" fill-rule="nonzero" d="M23.146 35.078a5.531 5.531 0 00-.693-.189 3.61 3.61 0 00-.735-.077c-.915 0-1.596.215-2.044.644-.448.43-.672 1.11-.672 2.044 0 .41.065.777.196 1.099.13.322.317.595.56.819.243.224.534.397.875.518.34.121.716.182 1.127.182.439 0 .866-.075 1.281-.224.415-.15.763-.345 1.043-.588l.49.812c-.13.112-.294.229-.49.35a4.837 4.837 0 01-1.533.602 4.962 4.962 0 01-1.015.098c-.607 0-1.141-.086-1.603-.259a3.045 3.045 0 01-1.155-.742 3.176 3.176 0 01-.7-1.162 4.525 4.525 0 01-.238-1.505c0-.588.082-1.11.245-1.568.163-.457.399-.84.707-1.148a3.08 3.08 0 011.12-.707 4.187 4.187 0 011.47-.245c.69 0 1.253.06 1.687.182.434.121.8.257 1.099.406l-.014.042v1.946h-1.008v-1.33zm3.052 2.422c0-1.13.294-2.023.882-2.681.588-.658 1.428-.987 2.52-.987.588 0 1.094.096 1.519.287.425.191.777.45 1.057.777.28.327.488.714.623 1.162.135.448.203.929.203 1.442 0 .56-.075 1.066-.224 1.519-.15.453-.369.838-.658 1.155-.29.317-.646.562-1.071.735a3.82 3.82 0 01-1.449.259c-.579 0-1.083-.096-1.512-.287a2.967 2.967 0 01-1.064-.777 3.168 3.168 0 01-.623-1.162 4.963 4.963 0 01-.203-1.442zm1.162 0c0 .327.04.653.119.98.08.327.208.62.385.882.177.261.408.471.693.63.285.159.632.238 1.043.238.747 0 1.309-.231 1.687-.693.378-.462.567-1.141.567-2.037 0-.336-.04-.665-.119-.987a2.608 2.608 0 00-.392-.875 2.066 2.066 0 00-.7-.63c-.285-.159-.632-.238-1.043-.238-.747 0-1.307.229-1.68.686-.373.457-.56 1.139-.56 2.044zm7.742-1.05a14.05 14.05 0 00-.063-1.176 4.657 4.657 0 00-.049-.364h-.938V34h1.876l.126 1.134h.07c.093-.159.217-.315.371-.469a2.91 2.91 0 011.225-.721c.252-.075.518-.112.798-.112.43 0 .81.047 1.141.14.331.093.607.259.826.497.22.238.385.56.497.966.112.406.168.922.168 1.547V41h-1.092v-3.808c0-.775-.126-1.358-.378-1.75-.252-.392-.71-.588-1.372-.588-.243 0-.478.049-.707.147a2.44 2.44 0 00-.623.385c-.187.159-.35.343-.49.553-.14.21-.243.432-.308.665V41h-1.078v-4.55zm13.23 2.66a.796.796 0 00-.35-.693 2.872 2.872 0 00-.868-.392 16.056 16.056 0 00-1.127-.273 6.502 6.502 0 01-1.127-.336 2.525 2.525 0 01-.868-.567c-.233-.238-.35-.572-.35-1.001 0-.355.077-.658.231-.91a1.94 1.94 0 01.609-.623c.252-.163.546-.285.882-.364.336-.08.686-.119 1.05-.119.653 0 1.216.082 1.687.245.471.163.847.334 1.127.511l-.448.882a11.79 11.79 0 00-1.001-.483c-.36-.154-.81-.231-1.351-.231-.205 0-.408.021-.609.063-.2.042-.383.105-.546.189a1.088 1.088 0 00-.392.329.825.825 0 00-.147.497c0 .243.117.43.35.56.233.13.523.24.868.329.345.089.721.173 1.127.252.406.08.782.194 1.127.343.345.15.635.35.868.602.233.252.35.593.35 1.022 0 .644-.254 1.176-.763 1.596-.509.42-1.272.63-2.289.63-.308 0-.611-.028-.91-.084a5.52 5.52 0 01-.84-.224 5.054 5.054 0 01-.714-.315 3.002 3.002 0 01-.532-.357l.56-.91c.112.112.261.226.448.343a4.229 4.229 0 001.337.539 3.76 3.76 0 001.484.021c.22-.042.413-.107.581-.196a1.08 1.08 0 00.399-.35.914.914 0 00.147-.525zM51.034 34H52.7v-1.386l1.092-.308V34h3.738v.938h-3.738v3.304c0 .681.166 1.185.497 1.512.331.327.805.49 1.421.49.42 0 .786-.08 1.099-.238.313-.159.595-.331.847-.518l.364.826a3.938 3.938 0 01-1.169.63 4.182 4.182 0 01-1.393.238 3.41 3.41 0 01-1.057-.161 2.426 2.426 0 01-.875-.497 2.38 2.38 0 01-.602-.861c-.15-.35-.224-.768-.224-1.253v-3.472h-1.666V34zm8.89 7v-.938h1.89v-5.124h-1.89V34h2.618l.224.91h.07c.317-.29.672-.537 1.064-.742.392-.205.859-.308 1.4-.308.317 0 .572.06.763.182.191.121.34.299.448.532.107.233.18.516.217.847.037.331.056.707.056 1.127l-.98.014c0-.597-.058-1.036-.175-1.316-.117-.28-.329-.42-.637-.42-.29 0-.55.042-.784.126a2.565 2.565 0 00-.609.308c-.173.121-.32.243-.441.364s-.21.224-.266.308v4.13h2.688V41h-5.656zm12.558-7h1.988v4.774c0 .457.028.896.084 1.316h.938V41H73.63l-.042-1.19h-.056a2.938 2.938 0 01-.966.98c-.401.252-.887.378-1.456.378-.43 0-.796-.049-1.099-.147a1.556 1.556 0 01-.749-.511c-.196-.243-.34-.567-.434-.973-.093-.406-.14-.912-.14-1.519v-3.08h-.938V34h2.03v3.794c0 .383.016.726.049 1.029.033.303.1.56.203.77.103.21.254.369.455.476.2.107.469.161.805.161.485 0 .908-.159 1.267-.476.36-.317.632-.714.819-1.19v-3.626h-.896V34zm9.464 1.078a5.531 5.531 0 00-.693-.189 3.61 3.61 0 00-.735-.077c-.915 0-1.596.215-2.044.644-.448.43-.672 1.11-.672 2.044 0 .41.065.777.196 1.099.13.322.317.595.56.819.243.224.534.397.875.518.34.121.716.182 1.127.182.439 0 .866-.075 1.281-.224.415-.15.763-.345 1.043-.588l.49.812c-.13.112-.294.229-.49.35a4.837 4.837 0 01-1.533.602 4.962 4.962 0 01-1.015.098c-.607 0-1.141-.086-1.603-.259a3.045 3.045 0 01-1.155-.742 3.176 3.176 0 01-.7-1.162 4.525 4.525 0 01-.238-1.505c0-.588.082-1.11.245-1.568.163-.457.399-.84.707-1.148a3.08 3.08 0 011.12-.707 4.187 4.187 0 011.47-.245c.69 0 1.253.06 1.687.182.434.121.8.257 1.099.406l-.014.042v1.946h-1.008v-1.33zM84.634 34H86.3v-1.386l1.092-.308V34h3.738v.938h-3.738v3.304c0 .681.166 1.185.497 1.512.331.327.805.49 1.421.49.42 0 .786-.08 1.099-.238.313-.159.595-.331.847-.518l.364.826a3.938 3.938 0 01-1.169.63 4.182 4.182 0 01-1.393.238 3.41 3.41 0 01-1.057-.161 2.426 2.426 0 01-.875-.497 2.38 2.38 0 01-.602-.861c-.15-.35-.224-.768-.224-1.253v-3.472h-1.666V34zm8.764 3.5c0-1.13.294-2.023.882-2.681.588-.658 1.428-.987 2.52-.987.588 0 1.094.096 1.519.287.425.191.777.45 1.057.777.28.327.488.714.623 1.162.135.448.203.929.203 1.442 0 .56-.075 1.066-.224 1.519-.15.453-.369.838-.658 1.155-.29.317-.646.562-1.071.735a3.82 3.82 0 01-1.449.259c-.579 0-1.083-.096-1.512-.287a2.967 2.967 0 01-1.064-.777 3.168 3.168 0 01-.623-1.162 4.963 4.963 0 01-.203-1.442zm1.162 0c0 .327.04.653.119.98.08.327.208.62.385.882.177.261.408.471.693.63.285.159.632.238 1.043.238.747 0 1.309-.231 1.687-.693.378-.462.567-1.141.567-2.037 0-.336-.04-.665-.119-.987a2.608 2.608 0 00-.392-.875 2.066 2.066 0 00-.7-.63c-.285-.159-.632-.238-1.043-.238-.747 0-1.307.229-1.68.686-.373.457-.56 1.139-.56 2.044zm7.364 3.5v-.938h1.89v-5.124h-1.89V34h2.618l.224.91h.07c.317-.29.672-.537 1.064-.742.392-.205.859-.308 1.4-.308.317 0 .572.06.763.182.191.121.34.299.448.532.107.233.18.516.217.847.037.331.056.707.056 1.127l-.98.014c0-.597-.058-1.036-.175-1.316-.117-.28-.329-.42-.637-.42-.29 0-.55.042-.784.126a2.565 2.565 0 00-.609.308c-.173.121-.32.243-.441.364s-.21.224-.266.308v4.13h2.688V41h-5.656zm13.524 2.968a6.964 6.964 0 01-1.757-.707 5.036 5.036 0 01-1.428-1.225c-.406-.504-.728-1.12-.966-1.848s-.357-1.591-.357-2.59c0-.99.121-1.855.364-2.597s.57-1.372.98-1.89c.41-.518.889-.933 1.435-1.246a6.005 6.005 0 011.729-.665l.35.882a7.086 7.086 0 00-1.512.623 3.928 3.928 0 00-1.183 1.022c-.331.425-.588.952-.77 1.582-.182.63-.273 1.393-.273 2.289 0 .905.11 1.678.329 2.317.22.64.509 1.171.868 1.596.36.425.76.756 1.204.994.443.238.889.404 1.337.497l-.35.966zm3.654-7.518a14.051 14.051 0 00-.063-1.176 4.657 4.657 0 00-.049-.364h-.938V34h1.876l.126 1.134h.07c.093-.159.217-.315.371-.469a2.91 2.91 0 011.225-.721c.252-.075.518-.112.798-.112.43 0 .81.047 1.141.14.331.093.607.259.826.497.22.238.385.56.497.966.112.406.168.922.168 1.547V41h-1.092v-3.808c0-.775-.126-1.358-.378-1.75-.252-.392-.71-.588-1.372-.588-.243 0-.478.049-.707.147a2.44 2.44 0 00-.623.385c-.187.159-.35.343-.49.553-.14.21-.243.432-.308.665V41h-1.078v-4.55zm8.61-1.904a4.447 4.447 0 011.358-.504 7.423 7.423 0 011.484-.154c.476 0 .866.075 1.169.224.303.15.541.343.714.581.173.238.29.509.35.812.06.303.091.609.091.917 0 .355-.01.733-.028 1.134-.019.401-.033.803-.042 1.204 0 .467.028.91.084 1.33h.938V41h-1.862l-.126-1.05h-.07c-.056.084-.14.191-.252.322-.112.13-.259.259-.441.385a2.749 2.749 0 01-1.589.469c-.69 0-1.237-.177-1.638-.532-.401-.355-.602-.84-.602-1.456 0-.476.105-.873.315-1.19.21-.317.511-.56.903-.728.392-.168.866-.266 1.421-.294a9.544 9.544 0 011.869.112c.047-.43.054-.786.021-1.071-.033-.285-.107-.511-.224-.679a.938.938 0 00-.49-.357 2.482 2.482 0 00-.777-.105c-.42 0-.821.058-1.204.175-.383.117-.723.236-1.022.357l-.35-.812zm2.058 5.642c.261 0 .504-.042.728-.126a2.22 2.22 0 00.588-.322 2.133 2.133 0 00.672-.868v-.98a7.92 7.92 0 00-1.344-.126c-.41 0-.765.044-1.064.133-.299.089-.532.226-.7.413-.168.187-.252.43-.252.728 0 .308.105.576.315.805.21.229.562.343 1.057.343zm8.498.812v-4.662c0-.196-.007-.385-.021-.567a1.9 1.9 0 00-.098-.49.786.786 0 00-.224-.343.57.57 0 00-.385-.126c-.317 0-.586.13-.805.392-.22.261-.385.588-.497.98V41h-1.064v-7h.728l.21.854h.056c.093-.14.184-.273.273-.399.089-.126.191-.236.308-.329.117-.093.254-.166.413-.217.159-.051.36-.077.602-.077.14 0 .285.021.434.063.15.042.287.107.413.196.126.089.236.208.329.357.093.15.154.331.182.546.215-.364.455-.649.721-.854.266-.205.632-.308 1.099-.308.308 0 .558.051.749.154.191.103.34.25.448.441.107.191.182.42.224.686.042.266.063.562.063.889V41h-1.064v-4.76c0-.196-.01-.38-.028-.553a1.764 1.764 0 00-.105-.455.752.752 0 00-.21-.308.536.536 0 00-.357-.112c-.327 0-.602.13-.826.392-.224.261-.392.635-.504 1.12V41h-1.064zm12.138-.882c-.168.15-.366.29-.595.42a4.39 4.39 0 01-.749.336c-.27.093-.553.166-.847.217-.294.051-.59.077-.889.077-.56 0-1.055-.086-1.484-.259a2.858 2.858 0 01-1.078-.742 3.234 3.234 0 01-.658-1.155 4.767 4.767 0 01-.224-1.512c0-.588.082-1.11.245-1.568.163-.457.399-.84.707-1.148a3.08 3.08 0 011.12-.707 4.187 4.187 0 011.47-.245c.392 0 .78.051 1.162.154.383.103.721.296 1.015.581.294.285.52.677.679 1.176.159.5.215 1.146.168 1.939h-5.418c0 .84.226 1.468.679 1.883.453.415 1.057.623 1.813.623.252 0 .502-.03.749-.091.247-.06.483-.133.707-.217a3.72 3.72 0 00.595-.28c.173-.103.306-.196.399-.28l.434.798zm-2.954-5.362c-.308 0-.6.033-.875.098a1.995 1.995 0 00-.728.329c-.21.154-.383.355-.518.602s-.222.553-.259.917h4.354c-.047-.616-.245-1.094-.595-1.435-.35-.34-.81-.511-1.379-.511zm5.95 8.246a4.965 4.965 0 001.337-.497 4.15 4.15 0 001.204-.994c.36-.425.649-.957.868-1.596.22-.64.329-1.412.329-2.317 0-.896-.091-1.659-.273-2.289-.182-.63-.439-1.157-.77-1.582a3.928 3.928 0 00-1.183-1.022 7.086 7.086 0 00-1.512-.623l.35-.882c.607.13 1.183.352 1.729.665a4.984 4.984 0 011.435 1.246c.41.518.737 1.148.98 1.89s.364 1.608.364 2.597c0 .999-.119 1.862-.357 2.59-.238.728-.56 1.344-.966 1.848a5.036 5.036 0 01-1.428 1.225 6.964 6.964 0 01-1.757.707l-.35-.966zm17.878-2.45c0-.401-.068-.749-.203-1.043a2.44 2.44 0 00-.504-.735c-.2-.196-.415-.34-.644-.434a1.641 1.641 0 00-.609-.14v-.98c.177 0 .38-.04.609-.119.229-.08.443-.21.644-.392.2-.182.369-.418.504-.707.135-.29.203-.649.203-1.078v-1.428c0-.336.054-.644.161-.924a2.22 2.22 0 01.448-.728c.191-.205.42-.366.686-.483.266-.117.558-.175.875-.175h2.03v.98h-1.54c-.588 0-.996.14-1.225.42-.229.28-.343.695-.343 1.246v1.358c0 .383-.07.723-.21 1.022a2.7 2.7 0 01-1.106 1.225c-.205.117-.373.184-.504.203v.084c.121.019.285.091.49.217.205.126.406.299.602.518.196.22.366.478.511.777.145.299.217.63.217.994v1.344c0 .57.121.99.364 1.26s.649.406 1.218.406h1.526v.98h-2.03c-.653 0-1.178-.194-1.575-.581-.397-.387-.595-.959-.595-1.715v-1.372zM34.234 49H35.9v-1.386l1.092-.308V49h3.738v.938h-3.738v3.304c0 .681.166 1.185.497 1.512.331.327.805.49 1.421.49.42 0 .786-.08 1.099-.238.313-.159.595-.331.847-.518l.364.826a3.938 3.938 0 01-1.169.63 4.182 4.182 0 01-1.393.238 3.41 3.41 0 01-1.057-.161 2.426 2.426 0 01-.875-.497 2.38 2.38 0 01-.602-.861c-.15-.35-.224-.768-.224-1.253v-3.472h-1.666V49zm8.022-2.8h2.184v3.668h.07c.29-.327.625-.581 1.008-.763.383-.182.859-.273 1.428-.273.448 0 .838.047 1.169.14.331.093.602.257.812.49.21.233.366.553.469.959.103.406.154.922.154 1.547V56h-1.092v-3.822c0-.401-.023-.751-.07-1.05a1.829 1.829 0 00-.273-.749c-.135-.2-.32-.352-.553-.455-.233-.103-.532-.154-.896-.154-.252 0-.5.044-.742.133-.243.089-.464.21-.665.364-.2.154-.373.34-.518.56-.145.22-.245.46-.301.721V56h-1.078v-8.862h-1.106V46.2zM52.07 56v-.938h2.436v-5.124H52.07V49h3.556v6.062h2.38V56H52.07zm2.058-8.988c0-.252.084-.469.252-.651a.838.838 0 01.644-.273c.27 0 .497.091.679.273a.889.889 0 01.273.651.806.806 0 01-.273.616.963.963 0 01-.679.252.872.872 0 01-.644-.252.838.838 0 01-.252-.616zm11.004 7.098a.796.796 0 00-.35-.693 2.872 2.872 0 00-.868-.392 16.056 16.056 0 00-1.127-.273 6.502 6.502 0 01-1.127-.336 2.525 2.525 0 01-.868-.567c-.233-.238-.35-.572-.35-1.001 0-.355.077-.658.231-.91a1.94 1.94 0 01.609-.623c.252-.163.546-.285.882-.364.336-.08.686-.119 1.05-.119.653 0 1.216.082 1.687.245.471.163.847.334 1.127.511l-.448.882a11.79 11.79 0 00-1.001-.483c-.36-.154-.81-.231-1.351-.231-.205 0-.408.021-.609.063-.2.042-.383.105-.546.189a1.088 1.088 0 00-.392.329.825.825 0 00-.147.497c0 .243.117.43.35.56.233.13.523.24.868.329.345.089.721.173 1.127.252.406.08.782.194 1.127.343.345.15.635.35.868.602.233.252.35.593.35 1.022 0 .644-.254 1.176-.763 1.596-.509.42-1.272.63-2.289.63-.308 0-.611-.028-.91-.084a5.52 5.52 0 01-.84-.224 5.054 5.054 0 01-.714-.315 3.002 3.002 0 01-.532-.357l.56-.91c.112.112.261.226.448.343a4.229 4.229 0 001.337.539 3.76 3.76 0 001.484.021c.22-.042.413-.107.581-.196a1.08 1.08 0 00.399-.35.914.914 0 00.147-.525zm5.53 1.12c0-.299.084-.53.252-.693.168-.163.392-.245.672-.245.299 0 .532.082.7.245.168.163.252.394.252.693 0 .27-.084.495-.252.672-.168.177-.401.266-.7.266-.28 0-.504-.089-.672-.266a.938.938 0 01-.252-.672zm6.44-3.78a14.05 14.05 0 00-.063-1.176 4.657 4.657 0 00-.049-.364h-.938V49h1.876l.126 1.134h.07c.093-.159.217-.315.371-.469a2.91 2.91 0 011.225-.721c.252-.075.518-.112.798-.112.43 0 .81.047 1.141.14.331.093.607.259.826.497.22.238.385.56.497.966.112.406.168.922.168 1.547V56h-1.092v-3.808c0-.775-.126-1.358-.378-1.75-.252-.392-.71-.588-1.372-.588-.243 0-.478.049-.707.147a2.44 2.44 0 00-.623.385c-.187.159-.35.343-.49.553-.14.21-.243.432-.308.665V56h-1.078v-4.55zm8.61-1.904a4.447 4.447 0 011.358-.504 7.423 7.423 0 011.484-.154c.476 0 .866.075 1.169.224.303.15.541.343.714.581.173.238.29.509.35.812.06.303.091.609.091.917 0 .355-.01.733-.028 1.134-.019.401-.033.803-.042 1.204 0 .467.028.91.084 1.33h.938V56h-1.862l-.126-1.05h-.07c-.056.084-.14.191-.252.322-.112.13-.259.259-.441.385a2.749 2.749 0 01-1.589.469c-.69 0-1.237-.177-1.638-.532-.401-.355-.602-.84-.602-1.456 0-.476.105-.873.315-1.19.21-.317.511-.56.903-.728.392-.168.866-.266 1.421-.294a9.544 9.544 0 011.869.112c.047-.43.054-.786.021-1.071-.033-.285-.107-.511-.224-.679a.938.938 0 00-.49-.357 2.482 2.482 0 00-.777-.105c-.42 0-.821.058-1.204.175-.383.117-.723.236-1.022.357l-.35-.812zm2.058 5.642c.261 0 .504-.042.728-.126a2.22 2.22 0 00.588-.322 2.133 2.133 0 00.672-.868v-.98a7.92 7.92 0 00-1.344-.126c-.41 0-.765.044-1.064.133-.299.089-.532.226-.7.413-.168.187-.252.43-.252.728 0 .308.105.576.315.805.21.229.562.343 1.057.343zm8.498.812v-4.662c0-.196-.007-.385-.021-.567a1.9 1.9 0 00-.098-.49.786.786 0 00-.224-.343.57.57 0 00-.385-.126c-.317 0-.586.13-.805.392-.22.261-.385.588-.497.98V56h-1.064v-7h.728l.21.854h.056c.093-.14.184-.273.273-.399.089-.126.191-.236.308-.329.117-.093.254-.166.413-.217.159-.051.36-.077.602-.077.14 0 .285.021.434.063.15.042.287.107.413.196.126.089.236.208.329.357.093.15.154.331.182.546.215-.364.455-.649.721-.854.266-.205.632-.308 1.099-.308.308 0 .558.051.749.154.191.103.34.25.448.441.107.191.182.42.224.686.042.266.063.562.063.889V56h-1.064v-4.76c0-.196-.01-.38-.028-.553a1.764 1.764 0 00-.105-.455.752.752 0 00-.21-.308.536.536 0 00-.357-.112c-.327 0-.602.13-.826.392-.224.261-.392.635-.504 1.12V56h-1.064zm12.138-.882c-.168.15-.366.29-.595.42a4.39 4.39 0 01-.749.336c-.27.093-.553.166-.847.217-.294.051-.59.077-.889.077-.56 0-1.055-.086-1.484-.259a2.858 2.858 0 01-1.078-.742 3.234 3.234 0 01-.658-1.155 4.767 4.767 0 01-.224-1.512c0-.588.082-1.11.245-1.568.163-.457.399-.84.707-1.148a3.08 3.08 0 011.12-.707 4.187 4.187 0 011.47-.245c.392 0 .78.051 1.162.154.383.103.721.296 1.015.581.294.285.52.677.679 1.176.159.5.215 1.146.168 1.939h-5.418c0 .84.226 1.468.679 1.883.453.415 1.057.623 1.813.623.252 0 .502-.03.749-.091.247-.06.483-.133.707-.217a3.72 3.72 0 00.595-.28c.173-.103.306-.196.399-.28l.434.798zm-2.954-5.362c-.308 0-.6.033-.875.098a1.995 1.995 0 00-.728.329c-.21.154-.383.355-.518.602s-.222.553-.259.917h4.354c-.047-.616-.245-1.094-.595-1.435-.35-.34-.81-.511-1.379-.511zm13.3-.154h6.496v1.008h-6.496v-1.008zm0 2.296h6.496v1.008h-6.496v-1.008zm17.15-.448a14.051 14.051 0 00-.063-1.176 4.657 4.657 0 00-.049-.364h-.938V49h1.876l.126 1.134h.07c.093-.159.217-.315.371-.469a2.91 2.91 0 011.225-.721c.252-.075.518-.112.798-.112.43 0 .81.047 1.141.14.331.093.607.259.826.497.22.238.385.56.497.966.112.406.168.922.168 1.547V56h-1.092v-3.808c0-.775-.126-1.358-.378-1.75-.252-.392-.71-.588-1.372-.588-.243 0-.478.049-.707.147a2.44 2.44 0 00-.623.385c-.187.159-.35.343-.49.553-.14.21-.243.432-.308.665V56h-1.078v-4.55zm8.61-1.904a4.447 4.447 0 011.358-.504 7.423 7.423 0 011.484-.154c.476 0 .866.075 1.169.224.303.15.541.343.714.581.173.238.29.509.35.812.06.303.091.609.091.917 0 .355-.01.733-.028 1.134-.019.401-.033.803-.042 1.204 0 .467.028.91.084 1.33h.938V56h-1.862l-.126-1.05h-.07c-.056.084-.14.191-.252.322-.112.13-.259.259-.441.385a2.749 2.749 0 01-1.589.469c-.69 0-1.237-.177-1.638-.532-.401-.355-.602-.84-.602-1.456 0-.476.105-.873.315-1.19.21-.317.511-.56.903-.728.392-.168.866-.266 1.421-.294a9.544 9.544 0 011.869.112c.047-.43.054-.786.021-1.071-.033-.285-.107-.511-.224-.679a.938.938 0 00-.49-.357 2.482 2.482 0 00-.777-.105c-.42 0-.821.058-1.204.175-.383.117-.723.236-1.022.357l-.35-.812zm2.058 5.642c.261 0 .504-.042.728-.126a2.22 2.22 0 00.588-.322 2.133 2.133 0 00.672-.868v-.98a7.92 7.92 0 00-1.344-.126c-.41 0-.765.044-1.064.133-.299.089-.532.226-.7.413-.168.187-.252.43-.252.728 0 .308.105.576.315.805.21.229.562.343 1.057.343zm8.498.812v-4.662c0-.196-.007-.385-.021-.567a1.9 1.9 0 00-.098-.49.786.786 0 00-.224-.343.57.57 0 00-.385-.126c-.317 0-.586.13-.805.392-.22.261-.385.588-.497.98V56h-1.064v-7h.728l.21.854h.056c.093-.14.184-.273.273-.399.089-.126.191-.236.308-.329.117-.093.254-.166.413-.217.159-.051.36-.077.602-.077.14 0 .285.021.434.063.15.042.287.107.413.196.126.089.236.208.329.357.093.15.154.331.182.546.215-.364.455-.649.721-.854.266-.205.632-.308 1.099-.308.308 0 .558.051.749.154.191.103.34.25.448.441.107.191.182.42.224.686.042.266.063.562.063.889V56h-1.064v-4.76c0-.196-.01-.38-.028-.553a1.764 1.764 0 00-.105-.455.752.752 0 00-.21-.308.536.536 0 00-.357-.112c-.327 0-.602.13-.826.392-.224.261-.392.635-.504 1.12V56h-1.064zm12.138-.882c-.168.15-.366.29-.595.42a4.39 4.39 0 01-.749.336c-.27.093-.553.166-.847.217-.294.051-.59.077-.889.077-.56 0-1.055-.086-1.484-.259a2.858 2.858 0 01-1.078-.742 3.234 3.234 0 01-.658-1.155 4.767 4.767 0 01-.224-1.512c0-.588.082-1.11.245-1.568.163-.457.399-.84.707-1.148a3.08 3.08 0 011.12-.707 4.187 4.187 0 011.47-.245c.392 0 .78.051 1.162.154.383.103.721.296 1.015.581.294.285.52.677.679 1.176.159.5.215 1.146.168 1.939h-5.418c0 .84.226 1.468.679 1.883.453.415 1.057.623 1.813.623.252 0 .502-.03.749-.091.247-.06.483-.133.707-.217a3.72 3.72 0 00.595-.28c.173-.103.306-.196.399-.28l.434.798zm-2.954-5.362c-.308 0-.6.033-.875.098a1.995 1.995 0 00-.728.329c-.21.154-.383.355-.518.602s-.222.553-.259.917h4.354c-.047-.616-.245-1.094-.595-1.435-.35-.34-.81-.511-1.379-.511zm7.154 5.474c0-.28.091-.506.273-.679.182-.173.418-.259.707-.259.355 0 .63.124.826.371.196.247.294.595.294 1.043a2.36 2.36 0 01-.637 1.659 2.465 2.465 0 01-.588.462c-.21.117-.404.203-.581.259l-.35-.546c.336-.13.625-.317.868-.56.243-.243.364-.537.364-.882-.13.028-.233.042-.308.042-.27 0-.483-.077-.637-.231-.154-.154-.231-.38-.231-.679zm.126-5.502c0-.299.084-.53.252-.693.168-.163.392-.245.672-.245.299 0 .532.082.7.245.168.163.252.394.252.693 0 .27-.084.495-.252.672-.168.177-.401.266-.7.266-.28 0-.504-.089-.672-.266a.938.938 0 01-.252-.672zM22.32 71.924c0 .756-.198 1.328-.595 1.715-.397.387-.922.581-1.575.581h-2.03v-.98h1.526c.57 0 .975-.135 1.218-.406.243-.27.364-.69.364-1.26V70.23c0-.364.07-.695.21-.994.14-.299.308-.558.504-.777.196-.22.397-.392.602-.518.205-.126.373-.198.504-.217v-.084c-.13-.019-.299-.086-.504-.203a2.7 2.7 0 01-1.106-1.225c-.14-.299-.21-.64-.21-1.022v-1.358c0-.55-.114-.966-.343-1.246-.229-.28-.637-.42-1.225-.42h-1.54v-.98h2.03c.317 0 .609.058.875.175.266.117.495.278.686.483.191.205.34.448.448.728.107.28.161.588.161.924v1.428c0 .43.068.789.203 1.078.135.29.303.525.504.707.2.182.415.313.644.392.229.08.432.119.609.119v.98c-.177 0-.38.047-.609.14a2.011 2.011 0 00-.644.434 2.44 2.44 0 00-.504.735c-.135.294-.203.642-.203 1.043v1.372z"/></g></g></svg>

```javascript
// 转变此构造函数为类
function Clock({template}) {
  let timer

  function render() {
    let date = new Date()

    let hours = date.getHours()
    if (hours < 10) hours = "0" + hours

    let mins = date.getMinutes()
    if (mins < 10) mins = "0" + mins

    let secs = date.getSeconds()
    if (secs < 10) secs = "0" + secs

    let output = template.replace("h", hours).replace("m", mins).replace("s", secs)

    console.log(output)
  }

  this.stop = function () {
    clearInterval(timer)
  }

  this.start = function () {
    render()
    timer = setInterval(render, 1000)
  }
}
// 调用
let clock = new Clock({template: "h:m:s"})
clock.start()

// 结果
/**
	class 中的this是创建出的对象
	start方法的注意点：回调函数会导致this丢失，两种方式解决，1.回调函数传入时放入箭头函数（答案的写法），2.声明方法时使用箭头函数（结果的写法）
**/
class Clock {
  timer
  template
  constructor({template}) {
    this.template = template
  }
  render = () => {
    let date = new Date()

    let hours = date.getHours()
    if (hours < 10) hours = "0" + hours

    let mins = date.getMinutes()
    if (mins < 10) mins = "0" + mins

    let secs = date.getSeconds()
    if (secs < 10) secs = "0" + secs

    let output = this.template.replace("h", hours).replace("m", mins).replace("s", secs)

    console.log(output)
  }

  stop = () => {
    clearInterval(this.timer)
  }

  start = () => {
    this.render()
    this.timer = setInterval(this.render, 1000)
  }
}


// 答案
/**
	缺点：timer属性隐藏于方法，应该提出
**/
class Clock {
  constructor({template}) {
    this.template = template
  }

  render() {
    let date = new Date()

    let hours = date.getHours()
    if (hours < 10) hours = "0" + hours

    let mins = date.getMinutes()
    if (mins < 10) mins = "0" + mins

    let secs = date.getSeconds()
    if (secs < 10) secs = "0" + secs

    let output = this.template.replace("h", hours).replace("m", mins).replace("s", secs)

    console.log(output)
  }

  // 涉及this
  stop() {
    clearInterval(this.timer)
  }
  // 涉及this
  start() {
    this.render()
    this.timer = setInterval(() => this.render(), 1000)
  }
}
```

### 类继承

#### [深入：内部探究和 [[HomeObject]](https://zh.javascript.info/class-inheritance#shen-ru-nei-bu-tan-jiu-he-homeobject)

#### [[[homeobject ]](https://zh.javascript.info/class-inheritance#homeobject)

<svg xmlns="http://www.w3.org/2000/svg" width="560" height="316" viewBox="0 0 560 316"><defs><style>@import url(https://fonts.googleapis.com/css?family=Open+Sans:bold,italic,bolditalic%7CPT+Mono);@font-face{font-family:'PT Mono';font-weight:700;font-style:normal;src:local('PT MonoBold'),url(/font/PTMonoBold.woff2) format('woff2'),url(/font/PTMonoBold.woff) format('woff'),url(/font/PTMonoBold.ttf) format('truetype')}</style></defs><g id="inheritance" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="animal-rabbit-extends.svg"><path id="Rectangle-1" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M242 23h185v64H242z"/><text id="constructor:-Animal" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="252" y="42">constructor: Animal</tspan> <tspan x="252" y="57">run: function</tspan> <tspan x="252" y="72">stop: function</tspan></text><path id="Rectangle-1-Copy" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M242 286h185v28H242z"/><text id="Animal.prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="241" y="15">Animal.prototype</tspan></text><path id="Rectangle-1-Copy-4" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M242 166h185v48H242z"/><text id="constructor:-Rabbit" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="252" y="185">constructor: Rabbit</tspan> <tspan x="252" y="200">hide: function</tspan></text><text id="Rabbit.prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="241" y="158">Rabbit.prototype</tspan></text><path id="Rectangle-1-Copy-2" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M11 23h105v48H11z"/><text id="Animal" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="10" y="15">Animal</tspan></text><path id="Rectangle-1-Copy-3" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M11 166h105v48H11z"/><text id="Rabbit" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="10" y="158">Rabbit</tspan></text><text id="new-Rabbit" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="247" y="278">new Rabbit</tspan></text><path id="Line" fill="#EE6B47" fill-rule="nonzero" d="M330.5 96.5l7 14h-6v28h-2v-28h-6l7-14z"/><path id="Line-Copy" fill="#EE6B47" fill-rule="nonzero" d="M211 40l14 7-14 7v-6h-79v-2h79v-6z"/><path id="Line-Copy-4" fill="#EE6B47" fill-rule="nonzero" d="M489.157 87.31l.533.847-.424.266-20.68 13.021-5.129 3.228 7.263-.36.499-.024.05.999-.5.024-9.167.455-.888.044.423-.782 4.372-8.07.239-.44.879.476-.238.44-3.464 6.392 5.128-3.228 20.68-13.021.424-.267z"/><text id="[[Prototype]]" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="340" y="120">[[Prototype]]</tspan></text><path id="Line-Copy-3" fill="#EE6B47" fill-rule="nonzero" d="M330.5 230.5l7 14h-6v28h-2v-28h-6l7-14z"/><text id="[[Prototype]]-Copy" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="340" y="254">[[Prototype]]</tspan></text><text id="prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="139" y="35">prototype</tspan></text><path id="Line-Copy-2" fill="#EE6B47" fill-rule="nonzero" d="M211 182l14 7-14 7v-6h-79v-2h79v-6z"/><text id="prototype-copy" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="139" y="176">prototype</tspan></text><text id="name:-&quot;White-Rabbit&quot;" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="253" y="304">name: "White Rabbit"</tspan></text><text id="constructor" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="17" y="41">constructor</tspan></text><text id="constructor-copy" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="17" y="183">constructor</tspan></text><ellipse id="Oval" cx="391.5" cy="117.5" stroke="#EE6B47" rx="70.5" ry="20.5"/><text id="extends" fill="#EE6B47" font-family="PTMono-Regular, PT Mono" font-size="16" font-weight="normal"><tspan x="489" y="83">extends</tspan></text></g></g></svg>

```javascript
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
   
  constructor(name) {
    // 继承class的super必须在this前调用
    // Must call super constructor in derived（派生） class before accessing 'this' or returning from derived constructor
    super(name);
    this.created = Date.now();
  }
}

let rabbit = new Rabbit("White Rabbit"); // 现在好了
alert(rabbit.name); // White Rabbit


// Clock继承

class ExtendedClock extends Clock {
  precision
  constructor({template, precision}) {
    super({template})
    this.precision = precision
  }

  start = () => {
    this.render()
    this.timer = setInterval(() => this.render(), this.precision)
  }
}

let lowResolutionClock = new ExtendedClock({
  template: "h:m:s",
  precision: 10000,
})

lowResolutionClock.start()
```

### 静态属性，静态方法



<svg xmlns="http://www.w3.org/2000/svg" width="461" height="316" viewBox="0 0 461 316"><defs><style>@import url(https://fonts.googleapis.com/css?family=Open+Sans:bold,italic,bolditalic%7CPT+Mono);@font-face{font-family:'PT Mono';font-weight:700;font-style:normal;src:local('PT MonoBold'),url(/font/PTMonoBold.woff2) format('woff2'),url(/font/PTMonoBold.woff) format('woff'),url(/font/PTMonoBold.ttf) format('truetype')}</style></defs><g id="inheritance" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="animal-rabbit-static.svg"><path id="Rectangle-1" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M246 23h207v48H246z"/><text id="constructor:-Animal" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="256" y="42">constructor: Animal</tspan> <tspan x="256" y="57">run: function</tspan></text><path id="Rectangle-1-Copy" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M246 278h207v28H246z"/><text id="Animal.prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="245" y="15">Animal.prototype</tspan></text><path id="Rectangle-1-Copy-4" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M246 158h207v48H246z"/><text id="constructor:-Rabbit" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="256" y="177">constructor: Rabbit</tspan> <tspan x="256" y="192">hide: function</tspan></text><text id="Rabbit.prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="245" y="150">Rabbit.prototype</tspan></text><path id="Rectangle-1-Copy-2" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M11 23h98v48H11z"/><text id="Animal" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="10" y="15">Animal</tspan></text><path id="Rectangle-1-Copy-3" fill="#FFF9EB" stroke="#E8C48E" stroke-width="2" d="M11 158h98v48H11z"/><text id="Rabbit" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="10" y="150">Rabbit</tspan></text><text id="rabbit" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="251" y="267">rabbit</tspan></text><path id="Line" fill="#EE6B47" fill-rule="nonzero" d="M334.5 88.5l7 14h-6v28h-2v-28h-6l7-14z"/><path id="Line-Copy" fill="#EE6B47" fill-rule="nonzero" d="M211 30l14 7-14 7v-6h-79v-2h79v-6z"/><text id="[[Prototype]]" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="344" y="112">[[Prototype]]</tspan></text><path id="Line-Copy-4" fill="#EE6B47" fill-rule="nonzero" d="M56.5 88.5l7 14h-6v28h-2v-28h-6l7-14z"/><text id="[[Prototype]]-Copy-2" fill="#EC6B4E" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="66" y="112">[[Prototype]]</tspan></text><path id="Line-Copy-3" fill="#EE6B47" fill-rule="nonzero" d="M334.5 222.5l7 14h-6v28h-2v-28h-6l7-14z"/><text id="[[Prototype]]-Copy" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="344" y="246">[[Prototype]]</tspan></text><text id="prototype" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="139" y="25">prototype</tspan></text><path id="Line-Copy-2" fill="#EE6B47" fill-rule="nonzero" d="M211 172l14 7-14 7v-6h-79v-2h79v-6z"/><text id="prototype-copy" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="139" y="168">prototype</tspan></text><text id="compare" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="20" y="41">compare</tspan></text><text id="name:-&quot;White-Rabbit&quot;" fill="#8A704D" font-family="PTMono-Regular, PT Mono" font-size="14" font-weight="normal"><tspan x="257" y="296">name: "White Rabbit"</tspan></text></g></g></svg>

