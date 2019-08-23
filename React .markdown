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

react组件的生命周期

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
key0

```
 
   面试题:
      1). react/vue中的key的作用/内部原理
      2). 为什么列表的key尽量不要用index
   1. 虚拟DOM的key的作用?
      1). 简单的说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用
      2). 详细的说: 当列表数组中的数据发生变化生成新的虚拟DOM后, React进行新旧虚拟DOM的diff比较
          a. key没有变
              item数据没变, 直接使用原来的真实DOM
              item数据变了, 对原来的真实DOM进行数据更新
          b. key变了
              销毁原来的真实DOM, 根据item数据创建新的真实DOM显示(即使item数据没有变)
   2. key为index的问题
      1). 添加/删除/排序 => 产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低
      2). 如果item界面还有输入框 => 产生错误的真实DOM更新 ==> 界面有问题
      注意: 如果不存在添加/删除/排序操作, 用index没有问题
   3. 解决:
      使用item数据的标识数据作为key, 比如id属性值
   
```

