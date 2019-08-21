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
  // 2)读取某个状态值
  this.state.statePropertyName
// 3)更新状态---->组件界面更新
  this.setState({
    stateProp1 : value1,
    stateProp2 : value2
  })
```
###### 3.3.1.1 this的指向

* 组件内置的方法中的this为组件对象
* 在组件类中自定义的方法中this为undefined
    * 强制绑定this: 通过函数对象的bind()
    * 箭头函数(ES6模块化编码时才能使用)
* 不要直接更新状态数据

##### 3.3.2.props
##### 3.3.3.refs

#### 4.JSX标签添加事件以及定义style

`标签中的onClick 'C' 是大写的，其引用一个函数`
```html
<h1 style={{fontSize:'20px',color:'red'}} onClick={this.handle}>{ isLikeMe ? '你喜欢我':'我喜欢你'}</h1>
```
