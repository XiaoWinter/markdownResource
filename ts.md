

<h1 align="center">TypeScript</h1>

[入门教程](https://ts.xcatliu.com/)

##### 安装ts

`yarn global add typescript`

##### 把test.ts，编译到compile/test.js，相对路当当文件夹的路径

`tsc --outFile compile/test.js test.ts `

##### 监视输入文件

`tsc -w test.ts`



##### TypeScript for JavaScript Programmers

TypeScript stands in an unusual relationship to JavaScript. 

TypeScript offers all of JavaScript’s features, and an additional layer on top of these: **TypeScript’s type system**.

For example, JavaScript provides language primitives like `string`, `number`, and `object`, but it doesn’t check that you’ve consistently assigned these. TypeScript does.

This means that your existing working JavaScript code is also TypeScript code. The main benefit of TypeScript is that it can highlight unexpected behavior in your code, lowering the chance of bugs.

###### Types by Inference（类型推断）

TypeScript knows the JavaScript language and will generate types for you in many cases. For example in creating a variable and assigning it to a particular value, TypeScript will use the value as its type.



```
let helloWorld = "Hello World"; 

//  ^ = let helloWorld: string
```



### [Document](https://devdocs.io/typescript/)



##### Type annotations(类型注解)

Type annotations in TypeScript are lightweight ways  **to record** the intended（预期的;adj） contract（契约，约定;n） of the function or variable

类型注解强调轻量级

```javascript
function greeter(person: string) {
  return "Hello, " + person;
}

var user = [0, 1, 2];
//you will see an error
document.body.innerHTML = greeter(user);
```

###### ts在干什么？

TypeScript can offer static analysis **based on both** the structure of your code, and the type annotations you provide.