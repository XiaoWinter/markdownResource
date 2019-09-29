## redux

[参考资料：完全理解redux](https://github.com/brickspert/blog/issues/22)



### 动机

**state 在什么时候，由于什么原因，如何变化已然不受控制。**

**我们总是将两个难以理清的概念混淆在一起：变化和异步**。

**Redux 试图让 state 的变化变得可预测**。



#### 对象的扩展运算符（`...`）

##### 对象

```javascript
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }
```



##### 数组

```javascript
let foo = { ...['a', 'b', 'c'] };
foo
// {0: "a", 1: "b", 2: "c"}
```



##### 基本类型

```javascript
// 等同于 {...Object(true)}
{...true} // {}

// 等同于 {...Object(undefined)}
{...undefined} // {}

// 等同于 {...Object(null)}
{...null} // {}
// 等同于 {...Object(1)}
{...1} // {}
```

#####  :white_flower: 特别注意：字符串

```javascript
{...'hello'}
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}
```



##### :boxing_glove: 特别特别重要

使用扩展运算符合并两个对象

```javascript
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
```



如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。

(后面的属性会覆盖前面，扩展运算符结构的对象)

```javascript
let aWithOverrides = { ...a, x: 1, y: 2 };
// 等同于
let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
// 等同于
let x = 1, y = 2, aWithOverrides = { ...a, x, y };
// 等同于
let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });
```

应用场景

这用来修改现有对象部分的属性就很方便了。

```javascript
let newVersion = {
  ...previousVersion,
  name: 'New Name' // Override the name property
};
```



