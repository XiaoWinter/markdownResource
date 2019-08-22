<h1 align='center'>实现Array的声明式方法</h1>

```javascript
//声明式方法
/**
 * map()
 * reduce()
 * filter()
 * find()
 * findIndex()
 * every()
 * some()
 */

 const arr = [1,3,5,7,2,44];

//  1.map
Array.prototype.map = function(callback){
    const result = [];
    for(let index = 0; index < this.length; index++){
        
        result.push(callback(this[index], index))
    }
    return result;
}

console.log(arr.map((item) => item+10));

// 2.reduce
Array.prototype.reduce = function(callback,init){
    let result = init||0;
    for(let index = 0; index < this.length; index++){
        
        result = callback(result,this[index],index)
    }
    return result;
}

console.log(arr.reduce((res,item,index)=> res+item));

//  3.filter
Array.prototype.filter = function(callback){
    const result = [];
    for(let index = 0; index < this.length; index++){
        
        if(callback(this[index],index)){
            result.push(this[index])
        }
        
    }
    return result;
}

console.log(arr.filter((item) => item>10));

//  4.find
Array.prototype.find = function(callback){
    
    for(let index = 0; index < this.length; index++){
        
        if(callback(this[index],index)){
            return this[index];
        }
        
    }
    return undefined;
}

console.log(arr.find((item) => item>110));


//  5.findIndex
Array.prototype.findIndex = function(callback){
    
    for(let index = 0; index < this.length; index++){
        
        if(callback(this[index],index)){
            return index;
        }
        
    }
    return -1;
}

console.log(arr.findIndex((item) => item>10));

// 6.every

Array.prototype.every = function(callback){
    
    for(let index = 0; index < this.length; index++){
        
        if(!callback(this[index],index)){
            return false;
        }
        
    }
    return true;
}

console.log(arr.every((item) => item>-1));

// 7.some

Array.prototype.some = function(callback){
    
    for(let index = 0; index < this.length; index++){
        
        if(callback(this[index],index)){
            return true;
        }
        
    }
    return false;
}

console.log(arr.some((item) => item>440));
```

