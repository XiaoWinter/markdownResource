

<h1 align="center">TypeScript</h1>

[入门教程](https://ts.xcatliu.com/)

##### 安装ts

`yarn global add typescript`

##### 把test.ts，编译到compile/test.js，相对路当当文件夹的路径

`tsc --outFile compile/test.js test.ts `

##### 监视输入文件

`tsc -w test.ts`



#### 基础

##### 原始数据类型

布尔值、数值、字符串、null、undefined、symbol

```js
let isDone: boolean = false;
```

```js
//会报错
let createdByNewBoolean: boolean = new Boolean(1);
```

```js
//不会报错
let createdByNewBoolean: Boolean = new Boolean(1);
```

```js
//空值
function alertName(): void {
    alert('My name is Tom');
}
```



##### 任意值

> 任意值（Any）用来表示允许赋值为任意类型。



如果是一个普通类型，在赋值过程中改变类型是不被允许的：但如果是 `any` 类型，则允许被赋值为任意类型。

> any可以变为任意类型



在任意值上访问任何属性都是允许的：也允许调用任何方法：

> any可以进行任意操作



变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：



##### 类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查：