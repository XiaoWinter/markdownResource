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

