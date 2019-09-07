## redux



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



##### 

##### 