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

