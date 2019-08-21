##### call
`fn.call(thisArg,fnArg1,fnArg2,...)`
##### apply
`fn.apply(thisArg,[fnArg1,fnArg2,...])`
##### bind
> 返回一个新函数，这个新函数在内部调用原函数，并把原函数的this指向thisArg,<>里面的参数是可选项的

`fn.bind(thisArg,<fnArg1,fnArg2,...>)`

##### 自定义call,apply,bind

```
Function.prototype.call = function(obj, ...args){
    // obj.fn()
    obj = obj || window;
    obj.tempFn = this;
    const result = obj.tempFn(...args);
    delete obj.tempFn;
    return result;
}
Function.prototype.apply = function(obj, argsArr){
    // obj.fn()
    obj = obj || window;
    obj.tempFn = this;
    const result = obj.tempFn(...argsArr);
    delete obj.tempFn;
    return result;
}

Function.prototype.bind = function(){
    // this是fn
    return (...args2) =>{
        this.call(obj,...args,...arg2);
    }
    //或者
    //这里涉及到作用域问题，不传this，依然只按照传统this指向规则
    // const that = this;
    // return function(...args2){
    //     that.call(obj,...args,...arg2);
    // }
}
```

