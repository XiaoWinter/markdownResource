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



### `newInstance()`

```javascript
function newInstance(Fn , ...arg){
	const obj = {}
	const result = Fn.apply(obj, args)
	result instanceof Object ? result : obj
}
```

### `instanceOf()`

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



### Pull&PullAll

```javascript
Array.prototype.pull = function(...args){
    const arr = []
    args = Array.from(new Set(args))
    for (let index = 0; index < this.length; index++) {
        const element = this[index];
        if(args.indexOf(element)!==-1){
            //
            this.splice(index,1)
            arr.push(element)
            index--
        }
    }
    return arr
}

Array.prototype.pullAll = function(array){
    return this.pull(...array)
}

var arr = [1,3,5,7,9,7];
var arr2 = [1,5,9,2,2];
//叠加两个数组，去掉重复的部分，并将重复的部分作为返回值
console.log(arr.pull(...arr2))
```

