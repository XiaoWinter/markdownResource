##### 谈谈函数式编程

##### 谈谈高阶组件

​	高阶组件是一个函数，接收一个组件，返回一个组件

​	高阶组件是一个特别的高阶函数，他接受一个组件（函数），返回一个新的组件（函数）



##### 如何使用高阶组件

##### 如何传递form

##### 如何操作表单数据

##### 如何前台表单验证

##### 配置代理

target server

proxy:“http://localhost:5000”

##### 如何控制组件的样式

style={{xxxx:xxx}}

##### 如何注册路由

一级路由注册到主页

二级路由注册到一级路由的组件中

三级路由注册到二级路由的组件中     

##### 如何配置页面的默认显示内容

使用<Redirect>组件

`<Redirect to="/xxx" >`

##### switch的作用

匹配到第一个匹配到的路由（模糊匹配）

##### 组件是如何被渲染的

##### 谈谈a.b的查找过程

EC / ECS

执行上下文

* 全局环境

*  函数环境

执行上下文栈

函数上下文的声明周期

* 创建阶段：生成变量对象，确认作用域链，确认this的指向
* 执行阶段：变量读写/调用函数/其他代码
* 回收释放：执行结束后出栈，等待垃圾回收器回收释放

变量对象（variable Object）：JS内部用来存储变量的对象

全局变量

局部变量

活动对象（Activation Object):执行函数时产生的变量对象

##### 声明

先提升函数，后提升变量

同名函数后覆盖前

同名变量前忽略后

同名函数变量，变量被忽略

##### 闭包

函数对象产生后，他的[[scope]]保存了外部函数的执行上下文的vo



按钮的外框outline

##### react组件会将标签体内容传递给内部标签，属性名为children

标签体是文本，children是文本

标签体是标签，children是标签

标签体是多个标签，children是数组

##### 配置对象/普通对象

有固定属性/属性名任意



```
//跳转
this.props.history.replace('/login')//不会加到历史纪录
this.props.history.push('/login')//会加到历史记录
```



```
this.intervalId = setInterval(fn,delay)

看不见的属性挂到this上

componentWillUnmount(){	

​	clearInterval(this.intervalId)

}
```



##### 卡片组件

通用卡片容器

```jsx
<Card title="Card title" bordered={false} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
```



##### 表单的显示

```jsx
const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

<Table dataSource={dataSource} columns={columns} />;
//对于要进行额外处理的数据,进行render()
render	
生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return 里面可以设置表格行/列合并	Function(text, record, index) {}

//边框
bordered	是否展示外边框和列边框	boolean
//行的key
rowKey	表格行 key 的取值，可以是字符串或一个函数	string|Function(record):string	
//分页
pagination={{ pageSize: 50 
           	onChange:this.xxxx(一个函数)
           }}
```





数据数组

表头数组

数据数组中的属性与表头数组的dataIndex具有映射关系

bordered显示边框和列边框

配置属性写到标签的属性中



```jsx
//将一个标签作为数据
render:()=><a>delete</a>
//获取表单行数据
render:(category)=><Link onClick={(e)=>{
        this.handle(category,e)
    }}>delete</Link>
```

width:指定列宽

pagination:分页

defaultPageSzie:

pageSize:

showQuickJumper:快速跳转(Goto)

current:当前页

loading:加载

##### 模态框

显示多个

使用一个数值类型作为标志位,将其设为状态

visible = {showState === 0}都不显示

visible = {showState === 1}显示1模态框

visible = {showState === 2}显示2模态框

##### Form组件

const {getFieldDecorator} = this.props.form

rules:[

​	{required:true,message:'必须输入分类名称'

}]

```jsx
 <Form.Item>
    {getFieldDecorator('username', {
        rules: [{ required: true, message: 'Please input your username!' }],
    })(
        <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
            />,
    )}
</Form.Item>
//总验证
this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
//自定义验证
checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }
    callback('Price must greater than zero!');
  };
 <Form.Item label="Price">
    {getFieldDecorator('price', {
        initialValue: { number: 0, currency: 'rmb' },
        rules: [{ validator: this.checkPrice }],
    })(<PriceInput />)}
</Form.Item>
```



向父组件传递参数

componendWillMount(){

传递

}

ajax({'/login'},{xxx,yyy})

商品



商品列表(productHome)

商品编辑(productAddUpdate)

商品详情(productDetail)

aaa/xxx/:id(路径参数)

```jsx
//exact 精确匹配
//  /:id 路径参数
// Switch从上到下模糊匹配
<Switch>
    <Route path="/xxx" exact >
    <Route path="/xxx/yyy" >
    <Route path="/xxx/:id" >
</Switch>
```

Select组件

```

```

组件初始化流程

1.发送请求,获取数据(componendDidMount)

2.设置状态保存数据

3.渲染数据





##### 搜索

searchType

onChange 查文档

this.search标志位判断是什么请求(搜索分页,一般分页)



商品上下架

```
ID status
render(product){
return <btn onClick={()=>{xxx}}></btn>
}
```

Link里面能放什么

什么都能放(HTML标签)



##### Fragment碎片少了一层解构



##### 商品添加

根据页面效果选择合适的组件

自带组件

上传组件

富文本编辑器

```
<Card title={xxx}>
<Form onSubmit={handleSb}>
	<Item>

</Form>
</Card>
```



##### 商品图片组件

| action | 上传的地址                                                   | string\|(file) => `Promise` | 无     |
| ------ | ------------------------------------------------------------ | --------------------------- | ------ |
| accept | 接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) | string                      | 无     |
| name   | 发到后台的文件参数名                                         | string                      | 'file' |
|        |                                                              |                             |        |
|        |                                                              |                             |        |
|        |                                                              |                             |        |
|        |                                                              |                             |        |
|        |                                                              |                             |        |
|        |                                                              |                             |        |
|        |                                                              |                             |        |

ref获取组件标签，即是获取组件对象

##### 富文本编辑器

##### Tree

| 参数        | 说明                                                         | 类型                                                   | 默认值 | 版本 |
| :---------- | :----------------------------------------------------------- | :----------------------------------------------------- | :----- | :--- |
| checkedKeys | （受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点 key，则子节点自动选中；相应当子节点 key 都传入，父节点也自动选中。当设置`checkable`和`checkStrictly`，它是一个有`checked`和`halfChecked`属性的对象，并且父子节点的选中与否不再关联 | string[] \| {checked: string[], halfChecked: string[]} | []     |      |
|             |                                                              |                                                        |        |      |
|             |                                                              |                                                        |        |      |
|             |                                                              |                                                        |        |      |
|             |                                                              |                                                        |        |      |

组件隐藏不会销毁，会复用，因此每次点开需要更新组件的数据

//每次接收新的prop都会调用执行

componendWillReceiveProps(nextProps){

}

##### 用户模块

获取所有用户的列表

数据处理生成一个对象

{_id1:roleName1,_id2:roleName2}}



标题消失问题

leftnav根据path生成了标题

path.indexOf(item.key)===0



redux-devTools-Extension



##### redux的使用



`npm install --save redux`

```
npm install --save react-redux
npm install --save-dev redux-devtools
```



redux中包含：createStore(),applyMiddleware(),combineReducers()

store对象getState,dispathch,subscribe()



```jsx
import { createStore } from 'redux'

/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(counter)

// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(() => console.log(store.getState()))

// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1
```



```jsx
<Provider>//向所有容器提供store
connect(
state=>({}),
{action}
)
    获取属性
    this.props.xxx
    更改数据
    this.props.action()
    
    
异步操作，action可以是一个函数（异步action），引入redux-thunk
    
    
```



##### redux使用流程

```
1.下载相关的库
3.创建redux文件夹
3.store.js
4.reducer.js
5.action-type.js
	同步action的常量
6.action.js
	定义与异步对应的action
7.在需要与redux通信的组件中
	引入connect函数
	引入action create函数
	通过connect包装UI组件生成容器组件，并暴露
	export default connect(
		state=>({}),{}
	)(UI组件)
```



纯函数

1. 相同的输入，一定会得到相同的输出
2. 不会有 “触发事件”，更改输入参数，依赖外部参数，打印 log 等等副作用





path.indexOf(item.key)===0

```
connect包装

export default connect(	

	state =>({}),{}

)(Admin)

reducer(state,action)

```



onSubmit可以按enter提交



图表



##### 404的处理

`<Redirect from="/" to="/home" exact />`

`<Route componend={notFound}>`

##### nginx

broswerRouter 

HashRouter 请求不会携带# 后面的部分

nginx配置文件

location xxx{	

​	root:xxxxxxx

​	index:xxx



}

location xxx{	

​	proxy_pass:xxxxxxx

}



//

##### this.setState((state,props)=>stateChange)

//函数取得改变后的状态值

this.setState((state,props)=>stateChange,callback)

callback没有被传参数



##### setState()同步和异步

###### 执行的位置

钩子中，react的回调中

定时器回调，原生事件监听，promise

###### 异步或同步

react相关回调，异步

其他异步回调，同步

###### 多次调用

setState(fn)会合并，更新多次状态，只调用一次render()

setState({})会合并，更新一次状态，只调用一次render()





##### PureComponend

A组件的setState方法只要调用，就会触发render()

子组件被传入的数据的引用没有改，不会调用render()

比较变化，做的是浅比较，

不要改变对象的属性，而是要新建一个对象来改变状态

PureComponend原理

重写shouldComponendUpdate方法，浅比较所有属性，一旦shouldComponendUpdate()返回false不再执行用于更新render()



##### 如果从一个对象中取得一个属性，报错的话，要注意是不是第一次渲染的问题



##### Context

Context提供了一种在组件间共享值的方式而不用，逐层传递

context是一个对象

他如何获取，其职如何设置

//创建一个context

XXXContext = React.createContext(数据)这个方法的参数可以是任意类型吗，返回值是一个context



//获取context//属性名是啥时候确定的，是state定义的时候吗//没有属性名吧

<XXXContext.provider value={this.state.count}>

<B></B>

</XXXContext.provider>



<XXXContext.Consumer>

{count =>{ zzz} }

</XXXContext.Consumer>

//静态获取//属性名固定//取得的值（传输的值把）

static ContextType = XXXContext

let value = this.context 对应的value

静态方法不能访问this

##### class组件生命周期

add

getDerivedStateFromProps()

getSnapshotBeforeUpdate()

del

componentWillMount()

componentWillUpdate()

componentWillReceive

##### 一直看到固定位置

snapshot 获取下方不变的产犊

更新

scroll-下方高度



##### Hook

```jsx
import React, { useState } from 'react';
function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```



##### 常用的Hook

##### useState(初始值)

React.useState(xxx)

[value,setValue] = useState(xxx)

setValue(a),a可以是函数，会接收一个老值作为参数，也可以是值



##### useEffect副作用

useEffect(()=>{

​	return ()=>{相当于willUnMount}

},[])后面的数组，[state],state改变时才会调用回调函数。

相当于DidMount和DidUpdate



##### useRef（相当于this容器哦）

//创建Ref容器

const myRef = useRef(initvalue)



最顶层使用Hook

不要再循环里，判断里使用Hook,

读的顺序，顺序个数