https://img.shields.io/badge/%E5%89%8D%E7%AB%AF-react-day1

[徽章添加](https://shields.io/category/coverage/)

## 1.git管理项目

    1). 创建本地仓库
    2). 创建远程仓库
    3). 将本地仓库代码推到远程仓库
    4). 如果本地代码有修改，推送到远程仓库
    5). 如果远程有修改拉去到本地
    6). 克隆远程到本地

### 1.虚拟DOM对象

> 虚拟DOM对象是一个轻量级对象，他是一个Object的一个实例

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
```javascript
ReactDOM.render(ele, document.getElementById('test'))
```

### 2.JSX

* 全称:  JavaScript XML
* react定义的一种类似于XML的JS扩展语法: XML+JS
* 本质是React.createElement(‘标签名’, props, ...children) 方法的语法糖
* 作用: 用来创建react虚拟DOM(元素)对象

### 3.组件

`组件（Component）是对数据和方法的简单封装。`

`React的组件需要首字母大写`

`函数组件效率更高，但是有局限性`

#### 3.1函数组件

```javascript
  function Mycomponent1() {
    return <h1>函数组件</h1>
  }
```

#### 3.2类组件

```javascript
 class Mycomponent2 extends React.Component{
    render (){
      return <h1>类组件</h1>
    }
  }
```

#### 3.3类组件的三大属性

##### 3.3.1.状态state
```
1.state是组件对象最重要的属性, 值是对象(可以包含多个数据)
2.组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件)
3.state是内部数据
4.直接更新状态数据this.state，不会改变组件状态
```

```javascript
//this的指向为组件实例
// 1)初始化状态:
  constructor (props) {
    super(props)
    this.state = {
      stateProp1 : value1,
      stateProp2 : value2
    }
  }
//或者,以类的实例属性的写法
state = {
    stateProp1 : value1,
    stateProp2 : value2
}

  // 2)读取某个状态值
  this.state.statePropertyName
// 3)更新状态---->组件界面更新
  this.setState({
    stateProp1 : value1,
    stateProp2 : value2
  })
```


###### 3.3.1.1 this的指向

* 函数直接调用在严格模式下，this指向undefind

* 组件内置的方法（React.Component中继承的方法，如render）中的this为组件对象
* 在组件类中自定义的方法中this为undefined，如何改变this指向
    * 强制绑定this: 通过函数对象的bind()
    * 箭头函数(ES6模块化编码时才能使用)
* 不要直接更新状态数据this.state

##### 3.3.2.属性props

```
1.props是外部数据，用以存储标签属性
```
[propTypes进行类型检查](https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html#___gatsby)

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

     render(){
       return  <ul>
        <li>姓名：{this.props.name}</li>
        <li>性别：{this.props.sex}</li>
        <li>年龄：{this.props.age}</li>
      </ul>
     
     }
   }
   
    //数据
   const arg = {
     name : 'xxx',
     sex: '1',
     age: '12'
   }
   
   //将属性传入组件的props，通过标签
   //标准写法，props,此时可以不限制类型
   ReactDOM.render(<Person name={arg.name} sex = {arg.sex} age = {arg.age} />, document.getElementById('test'));
  //有props默认值,默认值的哪一项可以不写
  //  ReactDOM.render(<Person  sex = {arg.sex} age = {arg.age} />, document.getElementById('test'));
//方便写法
  //  ReactDOM.render(<Person  {...arg}/>, document.getElementById('test'));
```



##### 3.3.3.(reference)引用refs

```
目的：得到组件中的某个标签对象
```
```javascript
//1.老版本语法
//组件内的标签都可以定义ref属性来标识自己，组件会把这个标签放到refs属性中
<input type="text" ref='content'/>
//在组件中可以通过this.refs.content来得到对应的真实DOM元素
    通过组件对象的refs属性获取ref标记的元素，this.refs.content
    
    
//2.新版本语法,一个容器只能保存一个对象
// (1)  React.createRef() 创建用于保存dom元素的ref对象

constructor(props) {
  super(props)
  this.myRef = React.createRef()
}
//(2)通过 ref 标签属性将DOM元素对象保存到ref对象的current属性上
<input type="text" ref={this.myRef}/>
//(3)获取指定了ref的dom元素对象
const input = this.myRef.current
```

###### react建议的方法

```javascript
1.创建一个ref容器，绑到组件实例上
this.myRef = React.createRef();
2.将创建的ref绑定到标签上
<input type="text" ref={this.myRef}/>
3.通过创建的ref获取到标签
const input = this.myRef.current
```

##### 3.3.4 组件嵌套

```
组件可以套组件，渲染时只需要渲染根组件即可
```

##### 3.3.5组件化编程的基本流程

```
1.拆分组件
2.实现静态组件（固定资源，没有交互）
3.实现动态组件（动态数据的初始化，交互）
```
###### 设计数据

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

​	订阅广播

​	

​	父组件定义一个改变数据的方法，将方法传给子组件（原理：闭包）

```html
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
        //此箭头函数的this恰好指向组件对象，否则需要使用bind来指定this
		//作为变量传递给子组件，子组件调用这个函数就形成了闭包
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



```

#### 4.JSX标签添加事件以及定义style

`标签中的onClick 'C' 是大写的，其引用一个函数`
​```html
<h1 style={{fontSize:'20px',color:'red'}} onClick={this.handle}>{ isLikeMe ? '你喜欢我':'我喜欢你'}</h1>
```



#### 3.4受控组件和非受控组件

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



#### 3.5 组件的生命周期

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



###  React组件间通信的方式

####  方式一： 通过prop传递

​	

* 共同的数据放在父组件上，特有的数据放在自己组件内部
* 通过props可以传递一般属性和函数属性，只能一层一层传递
* 一般属性——>父组件传递数据给子组件——>子组件读取数据
* 函数属性——>子组件传递数据给父组件——>子组件调用函数

####  方式二：通过消息订阅(subscribe)-发布(publish)机制

* 观察者模式

观察者将自己的引用注册给被观察者，观察者发生相应的变化会通知观察者

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



#### 5.1 ES6常用新语法

* 定义常量/变量
* 解构赋值
* 对象的简洁表达式
* 箭头函数
* 扩展运算符
* 类
* ES6模块化:export /export default
* promise
* async/await



### 6.路由 react-router4

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

```javascript
//前提 ，已经安装了脚手架工具
npm install -g create-react-app
//安装react路由插件
npm install react-router-dom

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

