<h1 align="center">React基础</h1>
https://img.shields.io/badge/%E5%89%8D%E7%AB%AF-react-day1

[徽章添加](https://shields.io/category/coverage/)

## 一、简介

### 1.官方文档

1) 英文官网:[ https://reactjs.org/](https://reactjs.org/)

2) 中文官网: https://doc.react-china.org/

#### react的作用

1) 用于动态构建用户界面的 **JavaScript 库**(只关注于View)

2) 由Facebook开源

#### React的特点

1) Declarative(声明式编码)

2) Component-Based(组件化编码)

3) Learn Once, Write Anywhere(React Native/支持客户端与服务器渲染)

4) 高效

#### React高效的原因

1) 虚拟(virtual)DOM, 不总是直接操作DOM  (文档/元素/属性/文本对象)

2) DOM Diff算法, 最小化页面重绘

##### 1.虚拟DOM对象

> 虚拟DOM对象是一个轻量级对象，他是一个Object的一个实例



1) React提供了一些API来创建一种 `特别` 的一般js对象

* var element = React.createElement('h1', {id:'myTitle'},'hello')

* 上面创建的就是一个简单的虚拟DOM对象

2) 虚拟DOM对象最终都会被React转换为真实的DOM

3) 我们编码时基本只需要操作react的虚拟DOM相关数据, react会转换为真实DOM变化而更新界面



* 创建虚拟DOM对象：
```javascript 
    //方式一 方法创建，不用Babel
 let ele = React.createElement('h1',{id:'xxx'},'大大');
    //方式二 JSX 需要Babel
 const jsx = <h1>Hello,World</h1>;
 //创建ul使用{变量}//以{[xxx,xxx]}会被自动添加
 const ul = (
      <ul>{
        names.map(item => <li key={item}>{item}</li>)
      }</ul>
);

```
* 渲染虚拟DOM
```js
//ele,虚拟dom对象
ReactDOM.render(ele, document.getElementById('test'))
```

#### 使用react这个js库，直接在html里生撸，不用脚手架

##### 基本引入

1) react.js: React的核心库

2) react-dom.js: 提供操作DOM的react扩展库

3) babel.min.js: 解析JSX语法代码转为纯JS语法代码的库

##### 操作dom

```html
<body>
    <div class="test">
       
    </div>
    
    <script type="text/javascript" src="../js/react.development.js"></script>
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <script type="text/javascript" src="../js/babel.min.js"></script>
    <script type="text/babel"> //必须声明babel
        // 创建虚拟DOM元素
        const vDom = <h1>Hello React</h1> // 千万不要加引号
        // 渲染虚拟DOM到页面真实DOM容器中
        ReactDOM.render(vDom, document.getElementById('test'))
      </script>
</body>
```



#### React JSX

**总结**：JSX是一种语法最终产生js对象，这个js对象就是**虚拟dom**

##### 简述

1) 全称:  JavaScript XML

2) react定义的一种类似于XML的JS扩展语法: XML+JS

3) 本质是React.createElement(‘标签名’, props, ...children) 方法的语法糖



#####  作用: 用来创建react虚拟DOM(元素)对象

a. var ele = <h1>Hello JSX!</h1>

注意: 它不是字符串, 也不是HTML/XML标签

注意: **它最终产生的就是一个JS对象**



* 标签名任意: HTML标签或其它标签

*  标签属性任意: HTML标签属性或其它

#####  基本语法规则

a. 遇到 <开头的代码, 以标签的语法解析: html同名标签转换为html同名元素, 其它标签需要特别解析

b. 遇到以 { 开头的代码，以JS语法解析: 标签中的js代码必须用{ }包含

#####  babel.js的作用

a. 浏览器不能直接解析JSX代码, 需要babel转译为纯JS的代码才能运行

b. 只要用了JSX，都要加上type="text/babel", 声明需要babel来处理

##### JSX 中使用 JavaScript 表达式

我们可以在 JSX 中使用 JavaScript 表达式。表达式写在花括号 **{}** 中。实例如下

```jsx
ReactDOM.render(
    <div>
      <h1>{1+1}</h1>
    </div>
    ,
    document.getElementById('example')
);
```

##### 三元运算

在 JSX 中不能使用 **if else** 语句，但可以使用 **conditional (三元运算)** 表达式来替代。以下实例中如果变量 **i** 等于 **1** 浏览器将输出 **true**, 如果修改 i 的值，则会输出 **false**.

```jsx
ReactDOM.render(
    <div>
      <h1>{i == 1 ? 'True!' : 'False'}</h1>
    </div>
    ,
    document.getElementById('example')
);
```



##### 添加样式

```jsx
var myStyle = {
    fontSize: 100,
    color: '#FF0000'
};
ReactDOM.render(
    <h1 style = {myStyle}>菜鸟教程</h1>,
    document.getElementById('example')
);
```

##### 注释

```react
ReactDOM.render(
    <div>
    <h1>菜鸟教程</h1>
    {/*注释...*/}
     </div>,
    document.getElementById('example')
);
```

##### 展开数组

JSX 允许在模板中插入数组，数组会自动展开所有成员：

```jsx
var arr = [
  <h1>菜鸟教程</h1>,
  <h2>学的不仅是技术，更是梦想！</h2>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);
```

##### 设置style

##### 注册事件

```react

//标签中的onClick 'C' 是大写的，handle是回调函数

<h1 style={{fontSize:'20px',color:'red'}} onClick={this.handle}>{ isLikeMe ? '你喜欢我':'我喜欢你'}</h1>
```



#### 渲染虚拟dom

目的：把虚拟dom转化为真实dom放到页面上



**语法**:  `ReactDOM.render(virtualDOM, containerDOM)` 

**作用**: 将虚拟DOM元素渲染到页面中的真实容器DOM中显示

**参数说明**

a. 参数一`virtualDOM`: 纯js或jsx创建的虚拟dom对象

b. 参数二`containerDOM`: 用来包含虚拟DOM元素的真实dom元素对象(一般是一个div)

#### 创建虚拟dom

1) 纯JS(一般不用)

`React.createElement('h1',  {id:'myTitle'},  title)`

2) JSX:

`<h1 id='myTitle'>{title}</h1>`





## 组件

##### 组件的本质

组件的本质是构造虚拟dom的js代码。它可以是一个函数（简单组件：函数组件）也可以是一个类（复杂组件：类组件），那么使用组件也就是，执行组件，并将其产生的虚拟dom渲染到页面，即

```jsx
ReactDOM.render(<MyComponent />, document.getElementById('example1'))
```

使用`<>`包裹组件名，就是执行组件，生成虚拟dom，然后`ReactDOM.render`方法将虚拟dom渲染到页面指定位置



`组件（Component）是对数据和方法的简单封装。`

`React的组件需要首字母大写`

`函数组件效率更高，但是有局限性`

#### 1函数组件

**方式1: 工厂函数组件(无状态/简单组件)**

```javascript
  function Mycomponent1() {
      //return JSX
    return <h1>函数组件</h1>
  }
```

#### 2类组件

**方式2:  ES6类组件(有状态/复杂组件)**

```javascript
import React, { Component } from 'react'
//可以引入样式文件，供组件使用
import './home.less'

export default class Mycomponent2 extends React.Component{
    render (){
      return <h1>类组件</h1>
    }
  }
```







#### 3类组件的三大属性

##### 3.1.状态state
```
1.state是组件对象最重要的属性, 值是对象(可以包含多个数据)
2.组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件)
3.state是内部数据
4.直接更新状态数据this.state，不会改变组件状态
```

##### 定义state

```javascript
//this的指向为组件实例
//方法一
//这是类的构造器
// 1)初始化状态:
  constructor (props) {
    super(props)
    this.state = {
      stateProp1 : value1,
      stateProp2 : value2
    }
  }
//方法二
//或者,以类的实例属性的写法
//类的实例属性
state = {
    stateProp1 : value1,
    stateProp2 : value2
}



```



##### 读取state

```js
  // 2)读取某个状态值
  this.state.statePropertyName
```



##### 修改state

```js
// 3)更新状态---->组件界面更新
  this.setState({
    stateProp1 : value1,
    stateProp2 : value2
  })
```





###### 3.1.1 this的指向

* 函数直接调用在严格模式下，this指向undefind

* 组件内置的方法（React.Component中继承的方法，如render）中的this为组件对象
* 在组件类中自定义的方法中this为undefined，如何改变this指向
    * 强制绑定this: 通过函数对象的bind()
    * 箭头函数(ES6模块化编码时才能使用)
* 不要直接更新状态数据this.state

##### 3.2.属性props

* prop存储的是外部数据，用以存储标签属性
  * 每个组件对象都会有props(properties的简写)属性
  * 组件标签的所有属性都保存在props中

注意：

1) 通过标签属性从组件外向组件内传递变化的数据

2) 注意: 组件内部不要修改props数据（通过父组件传来的函数修改）

[propTypes进行类型检查](https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html#___gatsby)

##### 声明props

声明可有可无，但最好写上，不然都不知道组件有哪些props属性

```js
//引入此js设置props相关属性
<script src="./js/prop-types.js"></script>

//创建类组建
class Person extends React.Component{

  //属性名，属性值，属性必要性
  static propTypes = {
      name: PropTypes.string.isRequired,
      sex:PropTypes.string,
      age:PropTypes.string,
   }
   //指定属性的默认值
   static defaultProps = {
     name : 'yyyy'
   }

```
##### 读取props的属性值

```react
//this.props.propertyName
     render(){
       return  <ul>
        <li>姓名：{this.props.name}</li>
        <li>性别：{this.props.sex}</li>
        <li>年龄：{this.props.age}</li>
      </ul>
     
     }
   }

```
##### 传递数据给props

```react
      //数据
   const arg = {
     name : 'xxx',
     sex: '1',
     age: '12'
   }
   //将属性传入组件的props，通过标签,编写 属性名=属性值 传入props数据
   //方式一：标准写法，props,此时可以不限制类型
   ReactDOM.render(<Person name={arg.name} sex = {arg.sex} age = {arg.age} />, document.getElementById('test'));
  //方式二：有props默认值,默认值的哪一项可以不写
  //  ReactDOM.render(<Person  sex = {arg.sex} age = {arg.age} />, document.getElementById('test'));
//方式三：方便写法，会解构该对象传入所有属性
  //  ReactDOM.render(<Person  {...arg}/>, document.getElementById('test'));
```



##### 3.3.(reference)引用refs

**目的**：得到组件中的某个标签对象（js对象，如果是原生的就是dom对象，如果是组件，就是组件对象）

##### refs老语法步骤

```react
//1.老版本语法
//（1）组件内的标签都可以定义ref属性来标识自己，组件会把这个标签放到refs属性中
<input type="text" ref='content'/>
//（2）在组件中可以通过this.refs.content来得到对应的真实DOM元素
    通过组件对象的refs属性获取ref标记的元素，this.refs.content
    
```
##### refs新语法步骤

```react
    
//2.新版本语法,一个容器只能保存一个对象
// (1)  React.createRef() 创建用于保存dom元素的ref对象
//方式一
constructor(props) {
  super(props)
  this.myRef = React.createRef()
}
//或者，方式二，实例属性
myRef = React.createRef()
//(2)通过 ref 标签属性将DOM元素对象保存到ref对象的current属性上
<input type="text" ref={this.myRef}/>
//(3)获取指定了ref的dom元素对象
const input = this.myRef.current
```

##### react建议的方法(新语法)

```javascript
1.创建一个ref容器，绑到组件实例上
this.myRef = React.createRef();
2.将创建的ref绑定到标签上
<input type="text" ref={this.myRef}/>
3.通过创建的ref获取到标签
const input = this.myRef.current
```

##### 3.4 组件嵌套

```
组件可以套组件，渲染时只需要渲染根组件即可
```

##### 3.5组件化编程的基本流程

```
1.拆分组件
2.实现静态组件（固定资源，没有交互）
3.实现动态组件（动态数据的初始化，交互）
```
##### 设计数据

1.类型
	(1)何种数据结构?

2.名称
	(1)如何命名?
	apples
	appleList
	appleArr
3.存储 
	考虑问题
	(1)那些组件需要使用?
	放在共同的父组件上
	(2)组件之间如何传递数据?

​    三种方法

​	父子

​	发布订阅

##### 组件间传递数据（父子）

​	父组件定义一个改变数据的方法，将方法传给子组件（原理：闭包）

```react
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="test"></div>
    
    <script src="./js/react.development.js"></script>
    <script src="./js/react-dom.development.js"></script>
    <script src="./js/babel.min.js"></script>
    <script src="./js/prop-types.js"></script>
    <script type='text/babel'>
    //定义组件
    //父组件
    class App extends React.Component{

        constructor(props){
            super(props);
        }

        state = {
            todos:['吃饭',
            'sleep',
            'play']
        }
        //此函数使用了箭头函数的写法，否则需要使用bind来指定this
		//这个函数作为通过props传递给子组件，子组件调用这个函数操作state的数据，就形成了闭包
        addtodo = (todo)=>{
            let todos = this.state.todos;
            this.setState({
                todos:[todo,...todos]
            })
        }
        

		//render的this指向组件对象
        render(){

            return (<div>
                    <h1>todoList</h1>
                    <Add addtodo = {this.addtodo}/>
                    <Show todos={this.state.todos}/>
                </div>)
        }
    }

```
```react
//子组件        
class Add extends React.Component{

constructor(props){
    super(props);
    this.myRef = React.createRef();
}
handle = ()=>{
    const input = this.myRef.current;
    let {addtodo} = this.props;
    addtodo(input.value);
}


render(){
    
    return (<div><input ref={this.myRef} type="text"/><button onClick={this.handle}>添加</button></div>)
}
}
```
```react
//子组件        
class Show extends React.Component{

constructor(props){
    super(props);
}


render(){
    const {todos} = this.props;
    // console.log(todos);
    return (<ul>{
            todos.map((todo,index)=>(<li key={index}>{todo}</li>))
    }</ul>)
}
}
    //数据


    //渲染组件
    ReactDOM.render(<App  />,document.getElementById('test'))
    
    
    </script>
</body>
</html>
```







#### 4受控组件和非受控组件

##### 前提

```
输入框原生的事件
	input:输入框内容发生改变时触发该事件;oninput
	change:失去焦点时触发该事件;onchange
React事件
	change:内容改变时触发该事件；onChange
```

##### 非受控组件

```javascript
//非受控组件：在点击表单提交按钮时才获取表单数据
//原理：通过ref获取标签值，再进行处理
<body>
    <div id="test"></div>
   
    <script type='text/babel'>

    class Form extends React.Component{
        
        //定义ref容器,这种写法是给类定义实例属性
       usernameRef = React.createRef();
       pwdRef = React.createRef();

       //form表单提交时，获取非受控组件的值，并处理
      login = (event)=>{
          
          //阻止表单的默认行为，防止其发送请求并刷新页面
        event.preventDefault();
          
        //通过ref获得输入框的数据处理数据
        alert(`用户名${this.usernameRef.current.value},密码${this.pwdRef.current.value}`);
          
        //清理输入框
        this.usernameRef.current.value='';
        this.pwdRef.current.value='';
      }

        render(){
            
            //设置ref与dom元素绑定
            return (<form onSubmit={this.login}>
            用户名<input type="text" ref={this.usernameRef}/>
            密码<input type="text" ref={this.pwdRef}/>
            <input type="submit" value="登陆"/>
            </form>)
        }
    }
  
    //渲染组件
    ReactDOM.render(<Form  />,document.getElementById('test'))
    
    </script>
</body>


```
##### 受控组件

```javascript
//受控组件：在表单输入的过程中通过state实时收集表单数据
//原理：在组件内定义状态state，通过React的change事件将输入框的变化传递给state
<body>
    <div id="test"></div>

<script type='text/babel'>
    class Form extends React.Component{
        //定义状态,用来保存数据
        state= {
            username:'',
            pwd:''
        }
       
       //非受控组件获取值
      login = (event)=>{
          //阻止表单的默认行为，防止其发送请求并刷新页面
        event.preventDefault();
        
        //从state中获取输入的值
        let {username,pwd} = this.state;
        alert(`用户名为${username}，密码为${pwd}`);

      }
      
        //onChange的原始方法，不同的输入框绑不同的回调
    //   handle2 = (event)=>{

    //     //通过event。target获取input输入框的值
    //     let pwd = event.target.value;
    //     console.log(`密码为${pwd}`);

    //     //用事件处理函数中获取的值，改动state的对应属性
    //     this.setState({
    //         pwd
    //     })
    //   }

      //抽象的onChange事件处理方法，可作为不同输入框的事件处理函数
      handle = (event,name)=>{
        //通过React注册的事件，this没有绑到input对象上
        // console.log(this);

        //通过event。target获取input输入框的值
        let data  = event.target.value
        console.log(`${name}为${data}`);

        //用事件处理函数中获取的值，改动state的对应属性
        this.setState({
            [name]:data
        })
      }

    

        render(){
            //为输入框绑定React的onChange事件
            //onChange={event=>{this.handle(event,'username')}}给事件处理函数包一层箭头函数，传递输入框的名称，知道此时改动的是哪个输入框
            
            return (<form onSubmit={this.login}>
            用户名<input type="text" onChange={(event)=>{this.handle(event,'username')}}/>
            密码<input type="text" onChange={(event)=>{this.handle(event,'pwd')}}/>
            <input type="submit" value="登陆"/>
            </form>)
        }
    }
  
    //渲染组件
    ReactDOM.render(<Form />,document.getElementById('test'))
    
    </script>
</body>
```



#### 5 组件的生命周期

react类组件的生命周期（函数组件没有状态，也没有生命周期）

1.组件从创建到销毁会经历三个时期，初始化时期、运行时期、销毁时期

2.在组件经历的每个生命时期，都会调用相应的回调函数

3.在自定义组件时，我们可以重写这些生命周期函数，让组件在调用生命周期函数时，执行我们需要的业务逻辑

4.这种由程序自动调用，并且让我们可以重写的函数叫做钩子

##### 前提

###### 组件生命周期流程图

Mount ：挂载

![1566525513332](.\reactImg\1566525513332.png)



##### 组件的三个生命周期状态

```
 * Mount：插入真实 DOM
 * Update：被重新渲染
 * Unmount：被移出真实 DOM
```



##### 组件的生命周期流程

```
初始化
a.第一次初始化渲染显示: ReactDOM.render()
      * constructor(): 创建对象初始化state
      * componentWillMount() : 将要插入回调
      * render() : 用于插入虚拟DOM回调
      * componentDidMount() : 已经插入回调

运行时
b.每次更新state: this.setState()
      * componentWillUpdate() : 将要更新回调
      * render() : 更新(重新渲染)
      * componentDidUpdate() : 已经更新回调

结束
c.移除组件: ReactDOM.unmountComponentAtNode(containerDom)
      * componentWillUnmount() : 组件将要被移除回调
      
```
```javascript
<body>
    <div id="test"></div>
   
    <script type='text/babel'>
    //定义组件，显示员工信息，
    //性别年龄有默认值
    class LifeCycle extends React.Component{

        constructor(props){
            super(props);
            console.log('constructor');
        }
   
        //挂载完成
       componentDidMount = ()=> {
           console.log('componentDidMount');
       }
       //即将挂载
       componentWillMount(){
           console.log('componentWillMount')
       }
       //即将更新
       componentWillUpdata(){
           console.log('componentWillUpdata');
       }
       //即将卸载
       componentWillUnmount(){
           console.log('componentWillUnmount')
       }
       //这个是自定义方法
       unMountComp(){
            //卸载
            ReactDOM.unmountcomponentAtNode(<LifeCycle/>,document.getElementById('test'))
       }
       handle = ()=>{
           alert('🔟佳员工')
       }
        render(){
           
                console.log('render');
            return <div>
                <p>React学不会，怎么办</p>
                <button onClick={this.handle}>慢慢学</button>
            </div>
        }
    }
    //数据


    //渲染组件
    ReactDOM.render(<LifeCycle/>,document.getElementById('test'))
    
    
    </script>
</body>
```

### 4.react脚手架

###### 谈谈你对脚手架的理解

```
脚手架: 用来帮助程序员快速创建一个基于xxx库的模板项目
	* 包含了所有需要的配置
	* 指定好了所有的依赖
	* 可以直接安装/编译/运行一个简单效果
```

###### react脚手架简介

```
react提供了一个专门创建react项目的的脚手架库: create-react-app
项目的整体技术架构为：react + webpack + es6+  + babel + eslint
```

###### 创建项目并启动

```
npm install -g create-react-app
npx create-react-app react-app
cd react-app
开发环境运行: npm start
生产环境打包并运行: npm run build--> serve build
```

###### 脚手架开发的特点

```
模块化: js是一个一个模块编写的
组件化: 界面是由多个组件组合编写实现的
工程化: 实现了自动化构建/运行/打包的项目
```

###### react脚手架结构

```
react项目
	|--node_modules---第三方依赖模块文件夹
	|-- public
		|-- index.html-----------------主页面，index.js的插入页面（需要关注）
	|-- src------------源码文件夹（需要关注）
		|-- components----------------- react组件目录
		|-- index.js------------------- 应用入口js
	|--.gitignore------git版本管制忽略的配置
	|--package.json----应用包配置文件 
	|--README.md-------应用描述说明的readme文件
```

### 5.react axios

###### 为什么需要axios

* react 不包含可发送Ajax请求的代码
* 前端请求后台数据需要发送Ajax请求
* react应用中需集成第三方库或自己封装发送请求的代码

#### 5.1常用的Ajax请求库

* jQuery：比较重，包含dom操作和发送请求的代码
* axios:轻量级，建议使用
	* 封装XmlHttpRequest对象的ajax
	* promise风格
	* 可以用在浏览器端和服务端
* fetch:原生函数，但老版本浏览器不支持

  * 不使用XmlHttpRequest对象提交请求
  * 为了兼容低版本的浏览器，可以引入兼容库fetch.js

#### 5.2 axios API

* GET请求

```javascript
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
  
  
  
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

* POST请求

```javascript
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});
```

#### 5.3 fetch API(不是重点)

* GET

```javascript
fetch(url).then(function(response) {
  return response.json()
}).then(function(data) {
  console.log(data)
}).catch(function(e) {
  console.log(e)
});
```

* POST

```javascript
fetch(url, {
  method: "POST",
  body: JSON.stringify(data),
}).then(function(data) {
  console.log(data)
}).catch(function(e) {
  console.log(e)
})
```



### React组件间通信的方式

####  方式一： 通过prop传递

​	

* 共同的数据放在父组件上，特有的数据放在自己组件内部
* 通过props可以传递一般属性和函数属性，只能一层一层传递
* 一般属性——>父组件传递数据给子组件——>子组件读取数据
* 函数属性——>子组件传递数据给父组件——>子组件调用函数

####  方式二：通过消息订阅(subscribe)-发布(publish)机制

* 观察者模式

观察者将自己的引用注册给被观察者，被观察者发生相应的变化会通知观察者

```javascript
  // 2. 发布异步的消息
  PubSub.publish = function (msgName, data) {
    // 取出当前消息对应的callbacks
      //被观察者通知对应的观察者（调用观察者的回掉函数）
    let callbacks = callbacksObj[msgName]
    // 如果有值
    if (callbacks) {
      // callbacks = Object.assign({}, callbacks)
      // 启动定时器, 异步执行所有的回调函数
      setTimeout(() => {
        Object.values(callbacks).forEach(callback => {
          callback(data)
        })
      }, 0)
    }
  }
```

使用方式

```
工具库: PubSubJS
下载: npm install pubsub-js --save
使用: 
	  import PubSub from 'pubsub-js' //引入
	  PubSub.subscribe('delete', function(data){ }); //订阅
	  PubSub.publish('delete', data) //发布消息
```



####  方式三：redux







### 5.路由 react-router4

###### 谈谈你对SPA的理解

```
SPA应用
			单页Web应用（single page web application，SPA）
			整个应用只有一个完整的页面
			点击页面中的链接不会刷新页面, 本身也不会向服务器发请求
			当点击链接时, 只会做页面的局部更新
			数据都需要通过ajax请求获取, 并在前端异步展现
```

###### 谈谈你对路由的理解

```
1. 什么是路由?
            一个路由就是一个映射关系(key:value)
            key为路由路径, value可能是function/component
            
2. 路由分类
			后台路由: node服务器端路由, value是function, 用来处理客户端提交的请求并返回一个响应数据
			前台路由: 浏览器端路由, value是component, 当请求的是路由path时, 浏览器端前没有发送http请求, 但界面会更新显示对应的组件
			
3. 后台路由
            注册路由: router.get(path, function(req, res))
            当node接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据
4. 前端路由
            注册路由: <Route path="/about" component={About}>
            当浏览器的hash变为#about时, 当前路由组件就会变为About组件
```



[官方文档](https://react-router.docschina.org/web/guides/quick-start)

###### 快速开始

安装依赖

```shell
//前提 ，已经安装了脚手架工具
yarn global add create-react-app
npm install -g create-react-app
//安装react路由插件
yarn add react-router-dom
npm install react-router-dom

```

##### Router组件，简介

每个 React Router 应用程序（App）的核心应该是一个 router 组件。对于 Web 项目，`react-router-dom` 提供了 `<BrowserRouter>` 和 `<HashRouter>` 路由。这两个路由都会为你创建一个专门的 `history` 对象。

##### Router是用来包住App的

`<BrowserRouter>`使用 HTML5 历史 API 记录（ `pushState`，`replaceState` 和 `popstate` 事件）的 [`<Route>`](https://react-router.docschina.org/core/api/Router) 使您的UI与URL保持同步。

`<HashRouter>`使用 URL 的 hash 部分（即 window.location.hash ）的 `<Router>` 使您的 UI 与 URL 保持同步。

##### 声明项目使用路由器组件

```react
import { BrowserRouter } from 'react-router-dom'

<BrowserRouter
  basename={optionalString}
  forceRefresh={optionalBool}
  getUserConfirmation={optionalFunc}
  keyLength={optionalNumber}
>
  <App/>
</BrowserRouter>
```

##### 路由匹配

Route 匹配
有两个路由匹配组件： <Route> 和 <Switch> 。

**extra**属性，完全匹配

路由匹配是通过比较 `<Route>` 的 `path` 属性和当前地址的 `pathname` 来实现的。

**当一个 `<Route>` 匹配成功时，它将渲染其内容，当它不匹配时就会渲染 `null`。没有路径的 `<Route>` 将始终被匹配。**

```react 
// 当 location = { pathname: '/about' }
<Route path='/about' component={About}/> // 渲染 <About/>
<Route path='/contact' component={Contact}/> // 渲染 null
<Route component={Always}/> // 直接渲染 <Always/>
```

`<Switch>` 不是分组 `<Route>` 所必须的，但他通常很有用。 一个 `<Switch>` 会遍历其所有的子 `<Route>` 元素，并**仅渲染与当前地址匹配的第一个元素**。这有助于多个路由的路径匹配相同的路径名，当动画在路由之间过渡，且没有路由与当前地址匹配（所以你可以渲染一个 “404” 组件）。

```react
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
  {/* 没有路径被匹配, <NoMatch> 将会渲染 */}
  <Route component={NoMatch} />
</Switch>
```

##### 路由渲染属性

**作用**：用来决定渲染的内容

你有三个属性来给 `<Route>` 渲染组件: `component` ，`render`，和 `children` 。

**component**应该在你想渲染现存组件时使用 （ `React.Component` 或一个无状态组件）。

**render**，只有在必须将范围内的变量传递给要渲染的组件时才能使用。你不应该使用具有内联函数的 `component` 属性来传递范围内的变量，因为你将要不必要的卸载/重载组件。

```jsx
const Home = () => <div>Home</div>;

const App = () => {
  const someVariable = true;

  return (
    <Switch>
      {/* 这个是对的 */}
      <Route exact path="/" component={Home} />
      <Route
        path="/about"
        render={props => <About {...props} extra={someVariable} />}
      />
      {/* 不要这么做 */}
      <Route
        path="/contact"
        component={props => <Contact {...props} extra={someVariable} />}
      />
    </Switch>
  );
};
```

##### 导航

React Router 提供了一个 `<Link>` 组件来在你的应用程序中创建链接。无论你在何处渲染一个 `<Link>` ，都会在应用程序的 HTML 中渲染锚 （`<a>`）。

`<NavLink>` 是一种特殊类型的 `<Link>` 当它的 `to` 属性与当前地址匹配时，可以将其定义为“活跃的”。

`<Redirect>` ：当你想强制导航时，你可以渲染一个 `<Redirect>`。当一个 `<Redirect>` 渲染时，它将使用它的 `to` 属性进行定向。

```react
<Link to="/">Home</Link>
// <a href='/'>Home</a>

// location = { pathname: '/react' }
<NavLink to="/react" activeClassName="hurray">
  React
</NavLink>
// <a href='/react' className='hurray'>React</a>

<Redirect to="/login" />
```



##### 使用路由组件

```javascript


import React from 'react'
import { 
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    NavLink,
    Redirect}
     from 'react-router-dom'
//你需要随便定义个Home组件和About组件
import Home from './pages/home'
import About from './pages/about'
/**
 * 
 * @param {object} props 
 */
export default function App(props) {
    return (
        <div>
            <h1>Route Demo</h1>
            <Router>
    <div>
      <ul>
        <li><NavLink to="/home">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/topics">Topics</NavLink></li>
      </ul>

      <hr/>

        <Switch>
        <Route exact path="/home" component={Home}/>
        <Route path="/about" component={About}/>
        {/* <Route path="/" component={Home}/> */}
        <Route path="/topics" component={About}/>
        <Redirect to='/about'></Redirect>
        </Switch>
 
      {/* <Route path="/topics" component={Topics}/> */}
    </div>
  </Router>
        </div>
    )
}


```



#### React-Router 路由的三大属性

##### `history` 对象通常会具有以下属性和方法：

标签直接跳转

```html
<div className='search-input' onClick={()=>{this.props.history.push('/')}}> 
```



⭐重要的属性

- push(path, [state])` - (function 类型) 在 history 堆栈添加一个新条目
- `replace(path, [state])` - (function 类型) 替换在 history 堆栈中的当前条目
- `go(n)` - (function 类型) 将 history 堆栈中的指针调整 `n`
- `goBack()` - (function 类型) 等同于 `go(-1)`
- `goForward()` - (function 类型) 等同于 `go(1)`
- `block(prompt)` - (function 类型) 阻止跳转。(详见 [history 文档](https://github.com/ReactTraining/history#blocking-transitions))。

💩不重要的属性

- `length` - (number 类型) history 堆栈的条目数

- `action` - (string 类型) 当前的操作(`PUSH`, `REPLACE`, `POP`)

- location

  \- (object 类型) 当前的位置。location 会具有以下属性：

  - `pathname` - (string 类型) URL 路径
  - `search` - (string 类型) URL 中的查询字符串
  - `hash` - (string 类型) URL 的哈希片段
  - `state` - (object 类型) 提供给例如使用 `push(path, state)` 操作将 location 放入堆栈时的特定 location 状态。只在浏览器和内存历史中可用。

  

##### location

location 对象永远不会发生变化，因此你可以在生命周期钩子中使用它来确定何时导航，这对数据抓取和动画非常有用。

```javascript
pathname,search(保存的是queryString),hash比较重要

{
  key: 'ac3df4', // not with HashHistory!
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```

##### match

一个 `match` 对象中包涵了有关如何匹配 URL 的信息。`match` 对象中包涵以下属性：

- `params` - (object) key／value 与动态路径的 URL 对应解析
- `isExact` - (boolean) `true` 如果匹配整个 URL （没有结尾字符）
- `path` - (string) 用于匹配的路径模式。被嵌套在 `<Route>` 中使用
- `url` - (string) 用于匹配部分的 URL 。被嵌套在 `<Link>` 中使用



##### 为什么使用withRouter

When you include a main page component in your app, it is often wrapped in a `<Route>` component like this:

在你的app中包含的主要主要页面组件,会经常被<Router>组件包装,想下面这样

```js
<Route path="/movies" component={MoviesIndex} />
```



By doing this, the `MoviesIndex` component has access to `this.props.history` so it can redirect the user with `this.props.history.push`.

通过这么做,<MoviesIndex>组件可以访问`this.props.history`(路由三大属性之一),因此你能用

`this.props.history.push`将用户redirect(重定向) 



Some components (commonly a header component) appear on every page, so are not wrapped in a `<Route>`:

一些组件(通常是header 组件)出现在每个页面,所以不用<Router>包装

```js
render() {
  return (<Header />);
}
```

This means the header cannot redirect the user.

这(没有被Router包装)意味着header不能将用户redirct



To get around this problem, the header component can be wrapped in a [`withRouter`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md) function, either when it is exported:

为了解决这个问题,头部组件可以用 [`withRouter`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md) 函数包装,或者在export(暴露)的时候包装

```js
export default withRouter(Header)
```

This gives the `Header` component access to `this.props.history`, which means the header can now redirect the user.

这使得Header组件可以访问到`this.props.history`,所以也代表这个Header组件可将用户重定向了





![](http://47.103.65.182/markdown/031.png)

### 最流行的开源React UI组件库  ant-design

#### 如何按需加载需要的css样式

##### 1. 下载依赖模块
		npm install --save-dev react-app-rewired customize-cra babel-plugin-import
		npm install --save-dev less less-loader

##### 2. 添加配置:  config-overrides.js
    const { override, fixBabelImports, addLessLoader } = require('customize-cra');
    
    module.exports = override(
      // 配置babel-plugin-import: 
      fixBabelImports('import', {
        libraryName: 'antd', // 针对antd进行按需打包
        libraryDirectory: 'es', // 去es文件夹对应的组件进行打包
        // style: 'css',  // 自动打包组件对应的css样式
        style: true,  // 加载less进行重新编译打包
      }),
    
      // 添加less的配置
      addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' }, // 指定主体颜色为绿色
      }),
    );
##### 3. 修改配置: package.json
		"scripts": {
			"start": "react-app-rewired start",
			"build": "react-app-rewired build",
			"test": "react-app-rewired test",
			"eject": "react-scripts eject"
		}
##### 4. 去除样式引入
```javascript
// import 'antd/dist/antd.css'; 
```

