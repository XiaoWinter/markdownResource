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
 //创建ul使用{变量}
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

##### 3.3.1.状态
```
1.state是组件对象最重要的属性, 值是对象(可以包含多个数据)
2.组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件)
3.state是内部数据
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

* 组件内置的方法中的this为组件对象
* 在组件类中自定义的方法中this为undefined，如何改变this指向
    * 强制绑定this: 通过函数对象的bind()
    * 箭头函数(ES6模块化编码时才能使用)
* 不要直接更新状态数据this.state

##### 3.3.2.props

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



##### 3.3.3.refs

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
设计数据
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
	父组件定义一个改变数据的方法，将方法传给子组件（原理：闭包）

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
