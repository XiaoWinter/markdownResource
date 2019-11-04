## 后台管理系统

### 项目描述

* 此项目为一个前后台分离的后台管理的SPA, 包括前端PC应用和后端应用
* 包括用户管理 / 商品分类管理 / 商品管理 / 权限管理等功能模块
* 前端: 使用React全家桶 + Antd + Axios + ES6+ + Webpack等技术
* 后端: 使用Node + Express + Mongodb等技术
*  采用模块化、组件化、工程化的模式开发



### 技术选型

##### 前台数据展现/交互/组件化

* react
* react-router-dom
* antd
* redux



##### 后台应用

* node
* mongodb
* mongoose
* multer
* blueimp-md5



##### 前后台交互

* ajax请求
  * axios
  * jsonp
  * promise/async/await
* 接口测试工具
  * postman

模块化

* ES6
* CommonJS



项目构建工具/工程化

* webpack
* create-react-app
* eslint

其他

* 富文本编辑器
  * react-draft-wysiwyg
  * draft-js
  * draftjs-to-html
* 图表库
  * echarts
  * echarts-for-react



### API/接口

一个前后端分离项目的API接口包括四个部分

* 请求URL
* 请求方式
* 参数类型
* 返回值



##### 重要概念

* API(接口)
* 接口文档
  * API接口的文档

* 测试接口
  * 前端对照接口文档，测试接口功能
* 对接口
  * 前后端对某个功能的API对接
* 调接口
  * 使用接口
* 联调
  * 前后台写好的代码一起使用
* 前后台分离
  * 面向API文档开发

* mock（模拟）数据



### 搭建环境

1. 安装create-react-app

   `yarn global add create-react-app`

   `npm install -g create-react-app` 全局下载工具

   

2. 创建项目 

   `cerate-react-app myapp`

   `npx create-react-app myApp`

3. 测试

   开发环境测试

   `npm start` 或者 `yarn start`

   访问一下页面

   

   生产环境测试

   打包`npm run build`

   安装生产服务器软件 ` npm install -g serve`

   启动服务器 `server build`

   或者

   打包`yarn build`

   安装生产服务器软件 `yarn global add serve`

   启动服务器

   `serve -s build`

   

   三个入口

   > 页面入口 index.html

   根标签  `<div id="root"></div>`

   

   > js入口 index.js

   ```javascript
   import React from 'react'
   import ReactDOM from 'react-dom'
   
   import App from './App'
   
   ReactDOM.render(<App />, document.getElementById('root'))
   ```

   

   > 组件入口 App.jsx

   ```javascript
   import React, {Component} from 'react'
   /*
   应用根组件
    */
   class App extends Component {
     render() {
       return (
         <div>App</div>
       )
     }
   }
   
   export default App
   ```



#### 使用antd组件库

[antd文档](https://ant.design/docs/react/introduce-cn)

`yarn add antd`

#### 如何按需加载需要的css样式

##### 1. 下载依赖模块
```shell
	npm install --save-dev react-app-rewired customize-cra babel-plugin-import
	npm install --save-dev less less-loader
	
	或者
	yarn add react-app-rewired customize-cra babel-plugin-import
	yarn add less less-loader
```

##### 2. 添加配置:  config-overrides.js
```javascript
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
```
##### 3. 修改配置: package.json
```json
	"scripts": {
		"start": "react-app-rewired start",
		"build": "react-app-rewired build",
		"test": "react-app-rewired test",
		"eject": "react-scripts eject"
	}
```
##### 4. 去除样式引入
```javascript
// import 'antd/dist/antd.css'; 
```



#### 安装路由插件

react-router-dom[中文文档](https://react-router.docschina.org/)

安装

`npm install react-router-dom`

或者

`yarn add react-router-dom`

配置路由



### 登录页设计

#### 表单组件

```javascript
//这个函数会将初级表单组件包装，通过构造传入一个form对象，增强其功能
const WrappedLogin = Form.create()(Login)

export default WrappedLogin
```

#### 高阶组件

```
如果一个函数操作其他函数，即将其他函数作为参数或将函数作为返回值，将其称为高阶函数。高阶组件(high-order component)类似于高阶函数，接收 React 组件作为输入，输出一个新的 React 组件。高阶组件让代码更具有复用性、逻辑性与抽象特征。可以对 render 方法作劫持，也可以控制 props 与 state。
```

简单使用高阶组件

```javascript
class Login extends Component {
    ...
}

export default Form.create()(Login)
```



> 配置对象：属性名固定的对象



#### 输入框验证

#### 搭页面

* 分成三部分
  * 侧边栏
  * header
  * content



##### 布局

* <layout>

##### 定义组件，component文件夹

左侧导航 leftNav

头部 header

整理页面的大体框架

##### 定义路由组件，page文件夹

##### 如何注册路由

一级路由注册到主页

二级路由注册到一级路由的组件中

三级路由注册到二级路由的组件中     

主页home,注册到admin中

```jsx
<Switch>
	<Route path="/home" component={Home}></Route>
    <Redirect to="/home"></Redirect>
</Switch>
```

##### 编写左侧导航

拆分布局

上下解构：上logo，下列表

引入路由

##### 添加导航菜单

* \<menu>

```jsx
<menu>
  <Menu.Item>菜单项</Menu.Item>
  <SubMenu title="子菜单">
    <Menu.Item>子菜单项</Menu.Item>
  </SubMenu>
</menu>
```

defaultSelectedKeys:初始选中的菜单项 key 数组

defaultOpenKeys:初始展开的 SubMenu 菜单项 key 数组

​	

key:元素的唯一标识(不要用Index)

Link标签的作用

使用数据驱动渲染左侧导航

```javascript
[
	{
      title: '首页', // 菜单标题名称
      key: '/home', // 对应的path
      icon: 'home', // 图标名称
    },
    {
      title: '商品',
      key: '/products',
      icon: 'appstore',
      children: [ // 子菜单列表
        {
          title: '品类管理',
          key: '/category',
          icon: 'bars'
        },
        {
          title: '商品管理',
          key: '/product',
          icon: 'tool'
        },
      ]
    ]
```

将数据组装成一个标签数组,放到Menu里

```jsx
    /**
     *  <Menu.Item key="/product">
              <Link to="/product">
                <Icon type="github" />
                <span>商品管理</span>
              </Link>
          </Menu.Item>
     */
    //获取一个标签数组
    getMenuNodes = (menulist)=>{
        //map返回一个数组
        return menulist.map((item)=>{
            //如果是普通的Item
            if(!item.children){
                //直接返回简单的标签
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
                //如果是带有子项的SubMenu就递归调用此函数，将返回的数组插入结果
                return (
                    <SubMenu
                    key={item.key}
                    title={
                        <span>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                        </span>
                    }
                    >
                        {/* {}将返回的数组插到标签中 */}
                        {this.getMenuNodes(item.children)}


                    </SubMenu>
                )
            }
        })
    }
```

##### 如何设置默认选中的菜单项

要求

1. 刷新点击时,选中相应的菜单项

   使用withRouter包装left-nav,获取location

   通过location获取到key(项目中为路由路径)

   使用selectedKeys指定要选中的菜单项

2. 如果选中的是二级菜单,展开对应的SubMenu的二级菜单列表 

   在生成菜单项数组时检查哪个SubMenu的child被命中,设置次SubMenu的key作为defaultOpenKeys,就会达到自动展开的效果

:warning:注意

```
defaultSelectedKeys的特点,第一次指定有效,多次指定无效

SelectedKeys 每次指定都生效 
```



组件中的配置项

配置项写成组件标签的属性

```jsx
 <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
```



|                     |                                    |          |
| ------------------- | ---------------------------------- | -------- |
| defaultOpenKeys     | 初始展开的 SubMenu 菜单项 key 数组 | string[] |
| defaultSelectedKeys | 初始选中的菜单项 key 数组          | string[] |



读取当前请求的路由路径设置到上方的属性上

如何读取呢

```
this.props.location.pathname
```






##### 头部组件的编写

布局

##### 箭头(使用伪元素)

```css
 .header-bottom-left {
     		/*定位*/
            position: relative;
            width: 25%;
            text-align: center;
            &::after{
                content: '';
                /*定位*/
                position: absolute;
                /*水平居中*/
                left: 50%;
                transform: translateX(-50%);
                top:30px;
                border-top: 20px solid rebeccapurple;
                border-left: 20px solid transparent;
                border-right: 20px solid transparent;
                border-bottom: 20px solid transparent;

            }
        }
```



动态显示数据

* 用户名 从内存中读
* 获取Title,从menuConfig中获取,按照当前的路由

```javascript
   //根据当前请求的路径，设置Title
    getTitle = (menus)=>{
        const pathname = this.props.location.pathname
        // console.log('P:'+pathname)
        let title = '';

        // menus.forEach(item=>{
            
        //     if(!item.children){
        //         if(item.key === pathname){
        //             title =  item.title
        //         }
        //     }else{
        //         if(this.getTitle(item.children)){
        //             title =  this.getTitle(item.children)
        //         }
        //     }
        // })
	
        //这个效率稍微高一点
        menus.some(item=>{
            
            if(!item.children){
                if(item.key === pathname){
                    title =  item.title
                    return true
                }else{
                    return false
                }
            }else{
                if(this.getTitle(item.children)){
                    title =  this.getTitle(item.children)
                    return true
                }
            }
        })
        return title;
    }
```

* 显示事件

使用定时器一直改变状态



* 显示天气

http://api.map.baidu.com/telematics/v3/weather?location=shanghai&output=json&ak=3p49MVra6urFRGOT9s8UBWr2

```json
{
  "error": 0,
  "status": "success",
  "date": "2019-09-03",
  "results": [
    {
      "currentCity": "shanghai",
      "pm25": "41",
      "index": [],
      "weather_data": [
        {
          "date": "周二 09月03日 (实时：24℃)",
          "dayPictureUrl": "http://api.map.baidu.com/images/weather/day/zhongyu.png",
          "nightPictureUrl": "http://api.map.baidu.com/images/weather/night/xiaoyu.png",
          "weather": "中雨转小雨",
          "wind": "北风微风",
          "temperature": "26 ~ 23℃"
        },
        {
          "date": "周三",
          "dayPictureUrl": "http://api.map.baidu.com/images/weather/day/zhongyu.png",
          "nightPictureUrl": "http://api.map.baidu.com/images/weather/night/xiaoyu.png",
          "weather": "中雨转小雨",
          "wind": "东风3-4级",
          "temperature": "28 ~ 23℃"
        },
        {
          "date": "周四",
          "dayPictureUrl": "http://api.map.baidu.com/images/weather/day/xiaoyu.png",
          "nightPictureUrl": "http://api.map.baidu.com/images/weather/night/xiaoyu.png",
          "weather": "小雨",
          "wind": "东风3-4级",
          "temperature": "27 ~ 24℃"
        },
        {
          "date": "周五",
          "dayPictureUrl": "http://api.map.baidu.com/images/weather/day/xiaoyu.png",
          "nightPictureUrl": "http://api.map.baidu.com/images/weather/night/duoyun.png",
          "weather": "小雨转多云",
          "wind": "西北风4-5级",
          "temperature": "28 ~ 24℃"
        }
      ]
    }
  ]
}

```

```
取得数据
data.results[0].weather_data[0].weather
data.results[0].weather_data[0].dayPictureUrl
```

编写接口

```javascript
1.引入jsonp
2.使用promise接收jsonp发送的异步请求

//以下为伪代码

import jsonp from 'jsonp'

//定义一个返回promise的方法
getWeather = ()=>{
	return new Promise((resolve,reject)=>{
		//发送jsonp,注意三个参数
		jsonp('http://www.bilibili.com',{},(err,data)=>{
			//请求成功保存数据
			if(!err){
				resolve(data)
			}else{//请求失败
				//传递错误信息，也可以随便传点字符串
				reject(err)
			}
		})
	})
}

//在组件中的钩子函数中调用此方法
async componendDidMount(){
	const data = await getWeather()
	//保存到某个地方
	注意，async的整个函数会被放到微队列里面去，因此第一次render()是没有值的，所以不能通过data.xxx取值，会报can't read property 'xxx' of undifiend
	//所以最好将数据直接保存，比如()
	this.weather = data.weather
	this.pictureUrl = data.pictureUrl
}
```



##### 退出登陆操作

###### 自定义链接按钮（Link-Button）

```jsx
//使用函数组件，因为不需要什么逻辑，这个组件主要是对样式的要求
import React from 'react'
import './index.less'

 //实现看似链接的通用组建
//props传递组件的属性给button标签，否则事件绑定不了
//注意这个方法名一定要定义好，不然react开发者工具找不到

export default function LinkButton(props) {
    return (
        <button className="link-buytton" {...props}>退出</button>
    )
}


//使用时
 <LinkButton onClick={(e)=>{alert('tuichu')}}>退出</LinkButton>

## react组件会将标签体内容传递给内部标签，属性名为children

//标签体是文本，children是文本

//标签体是标签，children是标签

//标签体是多个标签，children是数组
```



##### less样式中需要注意的点

```less
/*outline是轮廓，cursor是鼠标显示*/
.link-buytton {
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    color: yellowgreen;
}
```

按钮触发对话框

##### modal的使用

```jsx
//另外当需要一个简洁的确认框询问用户时，可以使用 Modal.confirm() 等语法糖方法。confirm是语法糖。
//调用showConfirm会将对话框换出
//点击模态框的按钮时会调用onOK或者onCancel

import { Modal } from 'antd';

const { confirm } = Modal;

showConfirm =()=> {
    confirm({
        title: '你确认要退出吗',
        content: '退出需要重新登陆',
        onOk:()=> {

            //退出的逻辑
            //清除localstorage。清除内存
            storageUtils.removeUser()
            memoryUtils.user = {}
            message.success('退出登陆')
            //跳转
            this.props.history.replace('/login')
        },
        onCancel() {
            console.log('取消');
        },
    });
}
//以方法的形式使用
<Button onClick={showConfirm}>Confirm</Button>
```



##### 商品分类

查看界面要使用什么组件

##### 卡片组件的使用

```jsx
//size:尺寸  title：卡片的标题 extra：卡片的附加的部分，它是一个标签

<Card size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>

//向extra添加一个额外的标签
const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        添加
      </Button>
    )
```

##### 表格的使用

```javascript
//数据数组
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
//表头数组
//cloumns用来显示一条数据
//数据数组中的属性与表头数组的dataIndex具有映射关系
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
           
 //将一个标签作为数据
render:()=><a>delete</a>
//获取表单行数据
render:(category)=><Link onClick={(e)=>{
        this.handle(category,e)
    }}>delete</Link>
```



##### Table

| 参数       | 说明                                                         | 类型                            | 默认值 | 版本 |
| ---------- | ------------------------------------------------------------ | ------------------------------- | ------ | ---- |
| bordered   | 是否展示外边框和列边框                                       | boolean                         | false  |      |
| rowKey     | 表格行 key 的取值，可以是字符串或一个函数                    | string\|Function(record):string | 'key'  |      |
| pagination | 分页器，参考[配置项](https://ant.design/components/table-cn/#pagination)或 [pagination](https://ant.design/components/pagination-cn/) 文档，设为 false 时不展示和进行分页 | object                          |        |      |
|            |                                                              |                                 |        |      |
|            |                                                              |                                 |        |      |



##### Pagination

| 参数            | 说明                                         | 类型                                 | 默认值 | 版本 |
| :-------------- | :------------------------------------------- | :----------------------------------- | :----- | :--- |
| current         | 当前页数                                     | number                               | -      |      |
| defaultPageSize | 默认的每页条数                               | number                               | 10     |      |
| pageSize        | 每页条数                                     | number                               | -      |      |
| total           | 数据总数                                     | number                               | 0      |      |
| showQuickJumper | 是否可以快速跳转至某页                       | boolean \| `{ goButton: ReactNode }` | false  |      |
| onChange        | 页码改变的回调，参数是改变后的页码及每页条数 | Function(page, pageSize)             | noop   |      |
|                 |                                              |                                      |        |      |
|                 |                                              |                                      |        |      |
|                 |                                              |                                      |        |      |



##### Column

| 参数   | 说明                                                         | 类型                             | 默认值 | 版本 |
| ------ | ------------------------------------------------------------ | -------------------------------- | ------ | ---- |
| render | 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return 里面可以设置表格[行/列合并](https://ant.design/components/table-cn/#components-table-demo-colspan-rowspan) | Function(text, record, index) {} | -      |      |
| width  | 列宽度（[指定了也不生效？](https://github.com/ant-design/ant-design/issues/13825#issuecomment-449889241)） | string\|number                   |        |      |
|        |                                                              |                                  |        |      |
|        |                                                              |                                  |        |      |



##### 编写路由获取分类数据

url:http://localhost:5000/manage/category/list

##### 跟据API文档编写获取数据的接口



###### API文档

![](http://47.103.65.182/markdown/004.png)

###### 接口编写

```javascript
 export const reqCategorys = ()=>axios({
    url:'/manage/category/list',
    method:'GET',
  })
 //axios设置了请求拦截器，响应拦截器，基础url；基础url为http://localhost:3000
 //请求拦截器将post请求参数转换为urlencoded(默认json格式)
 //响应拦截器将响应数据的data作为promise的返回值
 
```

在componendDidMount()中发送请求，将获取的分类数据存到state中

```
Array(8)
0: {_id: "5d6fbbb84a4af5305884d49c", name: "pans", __v: 0}
1: {_id: "5d6fbbc24a4af5305884d49d", name: "dress", __v: 0}
2: {_id: "5d6fbbcb4a4af5305884d49e", name: "t-shirt", __v: 0}
3: {_id: "5d6fbbd14a4af5305884d49f", name: "shoes", __v: 0}
4: {_id: "5d6fbbd94a4af5305884d4a0", name: "cat", __v: 0}
5: {_id: "5d6fbbec4a4af5305884d4a1", name: "tree", __v: 0}
6: {_id: "5d6fbc0a4a4af5305884d4a2", name: "pangci", __v: 0}
7: {_id: "5d6fbc1b4a4af5305884d4a3", name: "clothes", __v: 0}
length: 8
__proto__: Array(0)
```

设置数据源

```javascript
const dataSource = this.state.categorys
```

##### 列表显示获取的分类数据

设置行样式

```javascript
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    
  },
  {
    title: '操作',
    width:250,
    align:'center',
    render:()=><LinkButton>修改分类</LinkButton>
  },
];
```







##### loading效果

![](http://47.103.65.182/markdown/005.png)



loading需要一个状态来保存



```javascript
getCategorys = async ()=>{
    
    this.setState({
      loading:true
    })
    const result = await reqCategorys()
    this.setState({
      loading:false
    })
    // console.log(result.data);
    if(result.status === 0){
        this.setState({
          categorys:result.data
        })
    }
  }
```



##### 搞一个模态框显示一下

```jsx
 //引入
 import {Modal} from 'antd'
 render(){
 return(
     //给他塞到card里面//然后把属性值设置一下，回调编写一下
     <Card>
 <Modal
     title="Basic Modal"
     visible={this.state.visible}
     onOk={this.handleOk}
     onCancel={this.handleCancel}
     >
         <p>Some contents...</p>
         <p>Some contents...</p>
         <p>Some contents...</p>
     </Modal>
     </Card>
 )
 
 }
//由于要用一个变量控制两个对话框，管理三个状态，所有的状态有3个：1.不显示，2.显示添加分类，3.显示修改分类。所以选择用数字代表状态
/*初始状态为不显示
//categorys分类列表
  //loading，标识是否在请求中
  //showStates,0不显示，1显示添加分类，2显示修改分类
  state={
    categorys:[],
    loading:false,
    showStates:0
  }*/
//改写对话框
<Modal
          title="添加分类"
          visible={showStates === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
          >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
          </Modal>
          <Modal
          title="修改分类"
          visible={showStates === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
          >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
          </Modal>
//对话框基本的显示隐藏
  //显示添加对话框

  showAddCategory = ()=>{
    //更改showState的状态为1
    this.setState({
      showStates:1
    })
  }

  //显示修改对话框，并填入数据
  //如何获取行的数据并传给回掉函数呢，用一个箭头函数包一下
  //render:(category)=>{ return <LinkButton onClick={()=>{this.showUpdateCategory(category)}}>修改分类</LinkButton>}
  showUpdateCategory = ()=>{
    this.setState({
      showStates:2
    })
  }


  //点击取消按钮
  handleCancel = ()=>{
    //关闭添加对话框，清空数据
    this.setState({
      showStates:0
    })
  }
  
  //业务逻辑
  
    //添加分类
  addCategory = ()=>{
    //发送请求
  }

  //修改分类
  updateCategory = ()=>{
    //发送请求
  }
  
 
```




| 参数     | 说明                                 | 类型              | 默认值 | 版本  |
| -------- | ------------------------------------ | ----------------- | ------ | ----- |
| title    | 标题                                 | string\|ReactNode | 无     |       |
| visible  | 对话框是否可见                       | boolean           | 无     |       |
| width    | 宽度                                 | string\|number    | 520    |       |
| onOk     | 点击确定回调                         | function(e)       | 无     |       |
| onCancel | 点击遮罩层或右上角叉或取消按钮的回调 | function(e)       | 无     |       |
| keyboard | 是否支持键盘 esc 关闭                | boolean           | true   | 3.4.2 |





由于两个对话框有相似的中间内容，所以可以将其定义成一个组件

##### category-form组件



##### 表单验证

Form

| 参数        | 说明                                                         | 类型                                                 | 默认值       | 版本   |
| ----------- | ------------------------------------------------------------ | ---------------------------------------------------- | ------------ | ------ |
| form        | 经 `Form.create()` 包装过的组件会自带 `this.props.form` 属性 | object                                               | -            |        |
| onSubmit    | 数据验证成功后回调事件                                       | Function(e:Event)                                    |              |        |
| resetFields | 重置一组输入控件的值（为 `initialValue`）与状态，如不传入参数，则重置所有组件 | Function([names: string[]])                          |              |        |
| labelCol    | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | [object](https://ant.design/components/grid/#Col)    |              | 3.14.0 |
| wrapperCol  | #需要为输入控件设置布局样式时，使用该属性，用法同 labelCol   | [object](https://ant.design/components/grid-cn/#Col) |              | 3.14.0 |
| layout      | 表单布局                                                     | 'horizontal'\|'vertical'\|'inline'                   | 'horizontal' |        |
|             |                                                              |                                                      |              |        |
|             |                                                              |                                                      |              |        |
|             |                                                              |                                                      |              |        |



Item

| 参数        | 说明                                                         | 类型              | 默认值 | 版本 |
| ----------- | ------------------------------------------------------------ | ----------------- | ------ | ---- |
| hasFeedback | 配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用 | boolean           | false  |      |
| label       | label 标签的文本                                             | string\|ReactNode |        |      |
| required    | 是否必填，如不设置，则会根据校验规则自动生成                 | boolean           | false  |      |
| colon       | 配合 label 属性使用，表示是否显示 label 后面的冒号           | boolean           | true   |      |







form属性

| 方法              | 说明                                                         | 类型                                                         | 版本 |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---- |
| getFieldDecorator | 用于和表单进行双向绑定，详见下方描述                         |                                                              |      |
| validateFields    | 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件 | (   [fieldNames: string[]],   [options: object],   callback(errors, values) ) => void |      |
| getFieldValue     | 获取一个输入控件的值                                         | Function(fieldName: string)                                  |      |
| getFieldsValue    | 获取一组输入控件的值，如不传入参数，则获取全部组件的值       | Function([fieldNames: string[]])                             |      |



##### 进行提交验证

```
const {
  form: { validateFields },
} = this.props;
validateFields((errors, values) => {
  // ...
});

```

- `errors`:

  ```js
  {
    "username": {
      "errors": [
        {
          "message": "Please input your username!",
          "field": "username"
        }
      ]
    },
    "password": {
      "errors": [
        {
          "message": "Please input your Password!",
          "field": "password"
        }
      ]
    }
  }
  ```

- `values`:

  ```js
  {
    "username": "username",
    "password": "password",
  }
  ```





##### getFieldDecorator(id, options) 参数

| 参数                 | 说明                                                         | 类型     | 默认值 | 版本 |
| -------------------- | ------------------------------------------------------------ | -------- | ------ | ---- |
| id                   | 必填输入控件唯一标志。支持嵌套式的[写法](https://github.com/react-component/form/pull/48)。 | string   |        |      |
| options.rules        | 校验规则，参考下方文档                                       | object[] |        |      |
| options.initialValue | 子节点的初始值，类型、可选值均由子节点决定(注意：由于内部校验时使用 `===` 判断是否变化，建议使用变量缓存所需设置的值而非直接使用字面量)) |          |        |      |
|                      |                                                              |          |        |      |



使用实例


```jsx
 const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
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
```





校验规则

| 参数       | 说明                                                         | 类型                                    | 默认值   | 版本 |
| ---------- | ------------------------------------------------------------ | --------------------------------------- | -------- | ---- |
| enum       | 枚举类型                                                     | string                                  | -        |      |
| len        | 字段长度                                                     | number                                  | -        |      |
| max        | 最大长度                                                     | number                                  | -        |      |
| message    | 校验文案                                                     | string\|ReactNode                       | -        |      |
| min        | 最小长度                                                     | number                                  | -        |      |
| pattern    | 正则表达式校验                                               | RegExp                                  | -        |      |
| required   | 是否必选                                                     | boolean                                 | `false`  |      |
| transform  | 校验前转换字段值                                             | function(value) => transformedValue:any | -        |      |
| type       | 内建校验类型，[可选项](https://github.com/yiminghe/async-validator#type) | string                                  | 'string' |      |
| validator  | 自定义校验（注意，[callback 必须被调用](https://github.com/ant-design/ant-design/issues/5155)） | function(rule, value, callback)         | -        |      |
| whitespace | 必选时，空格是否会被视为错误                                 | boolean                                 | `false`  |      |





Form.create(options)

```

class CustomizedForm extends React.Component {}

CustomizedForm = Form.create({})(CustomizedForm);
```

| 参数           | 说明                           | 类型                                      | 版本 |
| -------------- | ------------------------------ | ----------------------------------------- | ---- |
| onValuesChange | 任一表单域的值发生改变时的回调 | (props, changedValues, allValues) => void |      |
|                |                                |                                           |      |



##### 被Form.create包装后的表单组件，如何实现表单验证

```jsx
 render() {

        //1.获取字段装饰器
     //getFieldDecorator(id,options)(标签)
     //id:表单域的唯一标识符
     //options:配置对象
     //标签：将要包装的表单控件标签
        const { getFieldDecorator } = this.props.form;
        const {categoryName} = this.props;

        //console.log(categoryName)

        return (
            <Form>
                <Item>
                    {/* 2.装饰字段 */}
                    {
                        getFieldDecorator('categoryName',{
                            initialValue:categoryName,
                            rules:[
                                {whitespace:true,message:"分类名不能为空"},
                                {required:true,message:"必须输入分类名称"}
                            ]
                        })(<Input placeholder="请输入分类名称"></Input>)
                    }
                    
                </Item>
            </Form>
        )
    }
```



##### 实现添加类别功能

##### 如何取得form组件的数据

方案一，父子通信，form组件将自己的form对象传递给父组件

实现：父组件定义一个方法名叫setForm(form)，通过写在组件标签里传递给子组件，子组件通过组件的props属性得到该方法，在componendWillMount钩子函数中调用,张老师说form对象时不会变化的

```jsx
//父组件
//将form保存到组件对象
  setForm = (form)=>{
    message.success('OK')
    this.form = form
  }
  //子组件
   <CategoryForm setForm={this.setForm} categoryName={category.name}></CategoryForm>
   //===================================================================================
   componentWillMount(){
        this.props.setForm(this.props.form);
    }
```



定义发送请求的接口

```javascript
  //添加分类
  export const reqAddCategory = (categoryName)=>axios({
    url:'/manage/category/add',
    method:'POST',
    data:{categoryName}
  })

  //修改分类
  export const reqUpdateCategory = (categoryId,categoryName)=>axios({
    url:'/manage/category/update',
    method:'POST',
    data:{categoryId,categoryName}
  })
```



完成数据添加以及**#擦桌子的工作**

```jsx
#擦桌子  
//1.成攻了首先关闭对话框
//2.更新数据显示
//3.将表单的数据清空；在两种对类别的操作中，都存在表单数据的留存问题；
 /* 是这个字段的问题
 	initialValue:categoryName,
 如果不手动输入修改，每次指定的新的都有效 ；
    如果手动输入了，再指定新的无效（总是显示手动输入）
   */
//解决方法，使用form的resetFields方法，
//解决时机：在添加成功或修改成功，以及关闭对话框的时候调用


//添加分类
  addCategory = ()=>{
    //发送请求
    //进行验证
   // 获取form
   this.form.validateFields( async (err,values)=>{
      //验证成功，发送请求
      if(!err){
        //发送请求
        //获取categoryName
        const {categoryName} = values;
        const result = await reqAddCategory(categoryName)
        if (result.status === 0){
          //关闭对话框
          this.setState({
            showStates:0
          })
          //获取最新的数据显示
          this.getCategorys()
        }else{
          
          message.error('error')
        }
      }else{
        message.error('验证失败')
      }
   })
  }
```



同理完成数据修改，也是取得数据发送请求，以及擦桌子

```jsx
  //修改分类
  updateCategory = ()=>{
     //发送请求
    //进行验证
   // 获取form
   this.form.validateFields( async (err,values)=>{
    //验证成功，发送请求
    if(!err){
      //发送请求
      //获取categoryName
      this.form.resetFields()
      const {categoryName} = values
      const categoryId = this.category._id
      console.log(categoryName,categoryId)

      const result = await reqUpdateCategory(categoryId,categoryName)
      if (result.status === 0){
        //关闭对话框
        this.setState({
          showStates:0
        })
        //获取最新的数据显示
        this.getCategorys()
        message.success('修改成功')
      }else{
        
        message.error('修改失败')
      }
    }else{
      message.error('验证失败')
    }
 })

  }
```

##### 商品管理

可以分为三个组件

商品列表

商品添加

商品详情



将这三个组件添加到商品管理界面，注册路由:要考虑细节都不匹配就重定向

```jsx
 <Switch>
        <Route path='/product' component={ProductHome} exact></Route>
        <Route path='/product/detail/:id' component={ProductDetail}></Route>
        <Route path='/product/addupdate' component={ProductAddUpdate}></Route>
        <Redirect to="/product"></Redirect>
      </Switch>
```



###### 定义API分页获取商品列表

API

`http://localhost:3000/manage/product/search?pageNum=1&pageSize=5`

编写接口

```javascript
 export const reqProducts = (pageNum,pageSize)=>axios({
    url:"/manage/product/search",
    method:"GET",
    params:{
      pageNum,
      pageSize
    }
  })
```

##### 搭建页面

需要组件Card ,Select, Option,Input,Icon,Button, Table

Card的title和extra都可以写组件

 Table组件的编写

dataSource数据：这个数据在DidMount中获取（一般异步获取的state数据在DidMount中获取）

columns数据:这个数据在WillMount中获取（一般同步获取的数据在Will Mount中获取）



根据数据编写columns，

##### 问题：￥符号加在价格之前，

解决方式：使用render,使用render时,不使用dataIndex,render回调使用列数据从参数传入,使用dataIndex时，传入render的是dataIndex取得的数据

```jsx
render:(product)=>`￥${product.price}`
```

```jsx
dataIndex:'price',
             render:(price)=>`￥${price}`
```



商品状态

​	1 ： 在售

​	2：下架



使标签换行，可以使用`<br></br>`

使用Table需要指定rowKey,pagination



##### 如何通过分页器跳转到不同的数据页

```
onChange  页码改变的回调，参数是改变后的页码及每页条数  Function(page, pageSize)  noop  
```

```jsx
 <Table 
                dataSource={products} 
                columns={columns} 
                bordered
                rowKey="_id"
                pagination={{
                    pageSize:2,
                    total,
                    //onChange:(page)=>this.getProducts(page)
                        //程序自己主动调用，会传入参数Function(page, pageSize)，所以可以这样写
        			onChange:this.getProducts
                }}
                ></Table>
```



##### 搜索功能

可以根据两个搜索的条件查询，类似于这种很相似的代码，可以抽象成一个接口，将搜索条件抽象成一个变量

为什么searchType,searchValue需要设置成state呢？

可以改变页面显示的数据，可以都封装到state里，但是感觉这个理由不充分，还有别的办法用更少的state控制页面的显示，是因为Select的值需要变化

##### Select props

| 参数     | 说明                                                         | 类型                                                         | 默认值 | 版本 |
| :------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----- | :--- |
| onChange | 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数 | function(value, option:Option/Array<Option>)                 | -      |      |
| value    | 指定当前选中的条目                                           | string\|string[]\ number\|number[]\ LabeledValue\|LabeledValue[] | -      |      |
|          |                                                              |                                                              |        |      |
|          |                                                              |                                                              |        |      |
|          |                                                              |                                                              |        |      |

select的onChange

```javascript
onChange={searchType=>{this.setState({searchType})}}
```





##### Input的属性





| 参数        | 说明                                                         | 类型              | 默认值 | 版本  |
| :---------- | :----------------------------------------------------------- | :---------------- | :----- | :---- |
| onChange    | 输入框内容变化时的回调                                       | function(e)       |        | 3.9.3 |
| value       | 输入框内容                                                   | string            |        |       |
| disabled    | 是否禁用状态，默认为 false                                   | boolean           | false  |       |
| prefix      | 带有前缀图标的 input                                         | string\|ReactNode |        |       |
| suffix      | 带有后缀图标的 input                                         | string\|ReactNode |        |       |
| addonAfter  | 带标签的 input，设置后置标签                                 | string\|ReactNode |        |       |
| addonBefore | 带标签的 input，设置前置标签                                 | string\|ReactNode |        |       |
| type        | 声明 input 类型，同原生 input 标签的 type 属性，见：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#属性)(请直接使用 `Input.TextArea` 代替 `type="textarea"`)。 | string            | `text` |       |
|             |                                                              |                   |        |       |

input的onChange

```javascript
onChange={e=>this.setState({searchValue:e.target.value})}
```



保存当前的页码，在搜索时指定current



##### 更新商品状态

首先时API接口的编写（），然后是数据的获取（render(product)），保持更新后重新渲染到当前页码（getProducts(this.current)）

##### 添加商品

跳转到product-add-update

##### 商品详情

跳转到product-detail

##### 商品修改

跳转到product-add-update



##### 路由的跳转方式

1.编码式跳转

利用this.props.history的方法



- `push(path, [state])` - (function 类型) 在 history 堆栈添加一个新条目
- `replace(path, [state])` - (function 类型) 替换在 history 堆栈中的当前条目
- `go(n)` - (function 类型) 将 history 堆栈中的指针调整 `n`
- `goBack()` - (function 类型) 等同于 `go(-1)`
- `goForward()` - (function 类型) 等同于 `go(1)`

注意location可以携带四个数据

- `location` - (object 类型) 当前的位置。location 会具有以下属性：
  - `pathname` - (string 类型) URL 路径
  - `search` - (string 类型) URL 中的查询字符串
  - `hash` - (string 类型) URL 的哈希片段
  - `state` - (object 类型) 提供给例如使用 `push(path, state)` 操作将 location 放入堆栈时的特定 location 状态。只在浏览器和内存历史中可用。

2.声明式跳转

```jsx
<Link to="/about">About</Link>
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }
}}/>
```



##### 选择跳转方式

在页面定义的时候，可以使用声明式跳转

在点击按钮进行跳转时，可以使用编程式跳转



##### 编写商品详情页

1.引入要使用的组件

Card, List, Icon, LinkButton

2.List需要的数据

编写API，根据ID获取商品

##### 如何获取路径参数 /xxx/y/:zz

对于路由到的组件

`this.props.match.params.zz`

对于独立的组件需要withRouter包装才能获取路由的三大属性

```jsx

   
    //异步获取商品信息
    async componentDidMount(){
        //获取商品ID，由于这个组件式路由来的，所以无需包装withRouter
         const productId = this.props.match.params.id
         //发送请求获取数据
        const result =  await reqProductById(productId)

        if(result.status === 0){
            // console.log(result.data)
            this.setState(()=>({product:result.data}))

            //获取分类
            const categoryDate = await reqCategoryById(result.data.categoryId)
            if(categoryDate.status === 0 ){
                this.setState(()=>({category:categoryDate.data.name}))
            }
        }
    }

```



解析HTML字符串

##### dangerouslySetInnerHTML

`dangerouslySetInnerHTML` 是 React 为浏览器 DOM 提供 `innerHTML` 的替换方案。为了防御[跨站脚本（XSS）](https://en.wikipedia.org/wiki/Cross-site_scripting)的攻击。

```jsx
function createMarkup() {
  return {__html: '<h1>你的标签</h1>'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

使用List接收并显示数据

```jsx
<List>
    <Item>
        <span className="detail-left">商品名称:</span>
        <span className="detail-right">{product.name}</span>
    </Item>
    <Item>
        <span className="detail-left">商品描述:</span>
        <span className="detail-right">{product.desc}</span>
    </Item>
    <Item>
        <span className="detail-left">商品价格:</span>
        <span className="detail-right">{product.price}</span>
    </Item>
    <Item>
        <span className="detail-left">所属分类:</span>
        <span className="detail-right">{category}</span>
    </Item>
    <Item>
        <span className="detail-left">商品图片:</span>
        <span>{
                // product.imgs.map(item=>item)
                imgs.map(item => <img className="detail-img" src={`http://localhost:5000/upload/${item}`} />)
                         }</span>
    </Item>
    <Item>
        <span className="detail-left">商品详情:</span>
        <div className="detail-right" dangerouslySetInnerHTML={{__html:product.detail}} />
    </Item>
</List>
```

设置list的样式，无非就是span改改字体，图片加加样式，对不和谐的地方可以使用审查元素直接取找问题。

效果

![](http://47.103.65.182/markdown/007.png)



##### 商品添加修改页面

如何使用一个页面完成两个功能呢，

答，根据路由的不同点来判断是修改还是添加

首先是一个card的title,然后是一个表单，表单需要表单验证，使用Form.create包装组件，使用getFiledDecorator包装Item



##### 问题：显示lable，给Item加lable,

```jsx
 <Item label="商品名称">
                        {getFieldDecorator('name',{
                            inititalValueL:"",
                            rules:[
                                {require:true,message:"请输入商品名称"}
                            ]
                            
                        })(
                            <Input placeholder="商品名称">

                            </Input>
                        )}
                    </Item>
```







##### 问题，如何给lable和表单控件以合适的宽度，使用下面两个属性


| labelCol   | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | [object](https://ant.design/components/grid/#Col)    |      | 3.14.0 |
| ---------- | ------------------------------------------------------------ | ---------------------------------------------------- | ---- | ------ |
| wrapperCol | #需要为输入控件设置布局样式时，使用该属性，用法同 labelCol   | [object](https://ant.design/components/grid-cn/#Col) |      | 3.14.0 |



定义格式，这个格式遵从Antd的栅格布局，span表示占用，offset表示前面空位，设置到Form上或者Item上

```jsx
const formLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 8 },
          };
          
          
           <Form
                 onSubmit = {this.handleSubmit}
                 
                 {...formLayout}
                >
```



查看<a href="#####Input的属性">Input的属性</a>可知输入框的后缀是addonAfter,实现输入框后缀的功能,另外更改Type实现数字框



```jsx
 <Input type="number" placeholder="商品价格" addonAfter="元"></Input>
```

商品分类这个框怎么写，他有一个选项表;

一样包装

```jsx
 <Item label="商品分类">
    {getFieldDecorator('category',{
        initialValue:"",
        rules:[
            {required:true,message:"请输入商品分类"}
        ]

    })(
        <Select>
            <Option value="">未选择</Option>
        </Select>
    )}
</Item>
```



##### 路由携带对象数据的方法

查看<a href="#####路由的跳转方式">history的push方法</a>可以携带第二个参数，第二个参数会被保存到路由对象的location对象中，但是这么做有个前提，路由不能是HashRouter，也就是带#号的Router

```javascript
//查看传递的location,可以看到product的属性都存到了state中
{pathname: "/product/addupdate", search: "", hash: "", state: {…}, key: "vrkdu0"}


    hash: ""
    key: "vrkdu0"
    pathname: "/product/addupdate"
    search: ""
    state:
        categoryId: "5d6fbbb84a4af5305884d49c"
        desc: "用来喝水"
        detail: "<p><strong>Fate On Night</strong> 圣杯，听说可是实现一个愿望👌</p>↵"
        imgs: (3) ["image-1567766383978.jpg", "image-1567766393016.jpg", "image-1567766397299.jpg"]
        name: "玻璃杯"
        price: 7
        status: 1
        __v: 0
        _id: "5d7237c05e606556a8b98e3c"
    
```

###### 获取product就可以使用这种方式

```javascript
 //准备点击修改时要填入表单的数据;添加商品时没有这个state
        this.product = this.props.location.state || {}
```

```jsx
//填充数据
const {name,desc,price,categoryId} = this.product

 <Item label="商品名称">
     {getFieldDecorator('name',{
                         initialValue:name,
                         rules:[
                         {required:true, whitespace:true,message:"请输入商品名称"}

     ]

     })(
         <Input placeholder="商品名称">

         </Input>
     )}
         </Item>
```

###### 获取所有分类，填充数据

设置状态数据categorys,调用API获取数据，设置状态，map处理数组，包装为<Option>

```jsx
//设置状态数据categorys,
state = {
        categorys:[]
    }
//调用API获取数据,设置状态
 async componentDidMount(){
        //获取所有的商品类别
        const result = await reqCategorys()
        // console.log(result)
        if(result.status === 0){
            const {categorys} = this.state
            this.setState({
                categorys:[...categorys,...(result.data)]
            })
        }

    }


 <Item label="商品分类">
                        {getFieldDecorator('category',{
                            initialValue:categoryId  ,
                            rules:[
                                {required:true,message:"请输入商品分类"}
                            ]
                            
                        })(
                           <Select>
                               <Option value="">未选择</Option>
            					{/*map处理数组，包装为<Option>*/}
                               {categorys.map(item=><Option value={item._id}>{item.name}</Option>)}
                           </Select>
                        )}
                    </Item>
```



自定义验证价格

```jsx
//1.验证函数
//2.添加到rules
 <Item label="商品价格">
                        {getFieldDecorator('price',{
                            initialValue:price,
                            rules:[
                                {required:true,message:"请输入商品价格"},
                                {validator:this.validatdPrice}
                            ]
                            
                        })(
                            <Input type="number" placeholder="商品价格" addonAfter="元">

                            </Input>
                        )}
                    </Item>
```



##### 上传组件

upload，首先找到需要的组件，然后复制粘贴到文件pictures-wall.jsx，在引入页面使用

##### upload的API

| 参数          | 说明                                                         | 类型                                    | 默认值 | 版本  |
| :------------ | :----------------------------------------------------------- | :-------------------------------------- | :----- | :---- |
| accept        | 接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept),从文件夹中选择文件时只会显示接受的文件类型 | string                                  | 无     |       |
| action        | 上传的地址                                                   | string\|(file) => `Promise`             | 无     |       |
| directory     | 支持上传文件夹（[caniuse](https://caniuse.com/#feat=input-file-directory)） | boolean                                 | false  | 3.7.0 |
| beforeUpload  | 上传文件之前的钩子，参数为上传的文件，若返回 `false` 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 `File` 或 `Blob` 对象则上传 resolve 传入对象）。**注意：IE9 不支持该方法**。 | (file, fileList) => `boolean | Promise` | 无     |       |
| customRequest | 通过覆盖默认的上传行为，可以自定义自己的上传实现             | Function                                | 无     |       |
| data          | 上传所需参数或返回上传参数的方法                             | object\|(file) => object                | 无     |       |
| disabled      | 是否禁用                                                     | boolean                                 | false  |       |
| multiple      | 是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件 | boolean                                 | false  |       |
| name          | 发到后台的文件参数名；http请求的请求参数的名称               | string                                  | 'file' |       |
| listType      | 上传列表的内建样式，支持三种基本样式 `text`, `picture` 和 `picture-card`；简单的说就是上传文件组件的外观 | string                                  | 'text' |       |
| onChange      | 上传文件改变时的状态，详见 [onChange](https://ant.design/components/upload-cn/#onChange)，参数是一个对象包含{file: { /* ... */ },fileList: [ /* ... */ ],event: { /* ... */ },} | Function                                | 无     |       |
| onPreview     | 点击文件链接或预览图标时的回调，点击缩略图上的眼睛Icon,而执行的回调 | Function(file)                          | 无     |       |
| onRemove      | 点击移除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除。点击缩略图上的垃圾桶Icon而执行的回调 | Function(file): `boolean | Promise`     | 无     |       |
|               |                                                              |                                         |        |       |
|               |                                                              |                                         |        |       |
|               |                                                              |                                         |        |       |
|               |                                                              |                                         |        |       |
|               |                                                              |                                         |        |       |
|               |                                                              |                                         |        |       |

pictureWall的竖直排列是由于表单项的格式问题，

```jsx
 const formPicLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
          };
 <Item label="商品图片" {...formPicLayout}>
    <PictresWall></PictresWall>
</Item>
```



##### 上传组件会自己发请求

```jsx
<Upload
          action="http://localhost:3000/manage/img/upload" /*上传的url*/
          listType="picture-card" /*upload组建的外观*/
          fileList={fileList} /*状态数据，显示的文件缩略图*/
          onPreview={this.handlePreview} /*缩略图的小眼睛的回调*/
          onChange={this.handleChange} /*点击上传后，文件上传状态变化触发的回调*/
    	  onRemove = {this.handleReomve}
          accept=".jpg,.png" /*上传文件的类型，在文件选择时，就被限制住了*/
          name="image" /*发送请求时文件的参数名；{image：data[文件类型的数据]}*/
        >
          {fileList.length >= 8 ? null : uploadButton}{/*最多上传几张图片*/}
        </Upload>

/*上传文件状态变化的回掉函数*/
  handleChange = ({ file,fileList }) =>
  {
//只有file的状态是‘done’，file中才会有response属性
    if(file.status === 'done'){
    //  console.log('done',file.percent);
     
     const {status} = file.response
     if(status === 0){
         //从文件上传后后台的响应中获取文件的name和url，覆盖file,
         
      const {data:{name,url}} = file.response
      file.name = name
      file.url = url
         //但是单独的file和fileList的最后file不是同一个对象，所以需要用file将fileList的最后一个file覆盖
       fileList[fileList.length-1] = file
      }
    }else{
      console.log('uploading ');
    }
//注意每次触发事件，必须执行该setState方法，否则文件的状态不会改变，会一直时uploading的状态
    this.setState({fileList:[...fileList]})
  }
  
  
  //删除图片//这里虽然删除了图片但是没有更新商品的状态，所以再次加载商品的时候会有问题
    handleRemove = async (file) =>{
    const result = await reqDeletePic(file.name)
    if(result.status === 0 ){
      message.success('删除图片成功')
    }else{
      message.error('删除失败')
    }
  }
```



获取商品的fileList，从product的imgs中获取，父组件向子组件传递数据，使用props，然后在willMount钩子函数中构造这个fileList

```jsx
//传递
<Item label="商品图片" {...formPicLayout}>
    <PictresWall imgs={this.product.imgs}></PictresWall>
</Item>
//生成fileList
componentWillMount(){
    /**
     * file
     *  {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }
     */
    console.log(this.props.imgs)
    /**
    [
  "image-1567766231621.jpg",
 "image-1567766237934.jpg"
    ]
    */

    const fileList = this.props.imgs ? (this.props.imgs.map((item,index)=>({uid:-index,name:item,status:'done',url:'http://localhost:3000/upload/'+item}))):[]

    this.setState({
      fileList
    })
  }
```



##### 富文本编辑器

[BraftEditor](https://www.yuque.com/braft-editor/be)

```
yarn add braft-editor
```



##### 编辑器API


| **属性名**                                                   | **类型**              | **说明**                                     |
| ------------------------------------------------------------ | --------------------- | -------------------------------------------- |
| onChange                                                     | Function(editorState) | 编辑器状态(内容、选区等)发生变化时的回调函数 |
| onDelete                                                     | Function              | 在编辑器内按下删除键时触发的函数             |
| [value](https://www.yuque.com/braft-editor/be/gz44tn#pdgpzw) | EditorState           | 编辑器的内容                                 |
| [defaultValue](https://www.yuque.com/braft-editor/be/gz44tn#uc5rqq) | EditorState           | 编辑器的初始化内容，仅首次传入生效           |
|                                                              |                       |                                              |
|                                                              |                       |                                              |
|                                                              |                       |                                              |

https://draftjs.org/docs/api-reference-editor-state.html

[EditorState](https://draftjs.org/docs/api-reference-editor-state.html)的详细介绍

`editorState.toHTML()`获取文本编辑器中内容的html字符串

`BraftEditor.createEditorState(内容)`向富文本编辑器设置值



##### 如何将form表单获取的文件内容发送到后台

```javascript
var formdata = new FormData();
        formdata.append("upload",files[0])
```





问题父组件如何拿到编辑器中的数据，

拿到子组件的引用，调用子组件的方法获取

```jsx
  //父组件拿到子组件引用，调用这个方法获取到数据
 getContent= ()=>this.state.editorState.toHTML()
```



可用demo

```jsx
import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'


export default class RichTextEditor extends React.Component {

    state = {
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(null)
    }

  componentWillMount () {  
    this.setState({
        editorState: BraftEditor.createEditorState(this.props.content)
    })
  }

  handleChange=(editorState)=>{
        this.setState({
            editorState
        })
  }
  
  //父组件拿到子组件引用，调用这个方法获取到数据
 getContent= ()=>this.state.editorState.toHTML()
  render () {
    const { editorState } = this.state
    return (
      <div>
        <div className="editor-wrapper">
          <BraftEditor
            value={editorState}
            onChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}
```



##### 更新和添加商品

通过这个`this.product._id`决定是修改商品还是添加商品

首先去定义API，根据文档编写请求方法

```jsx
 //添加商品
 export const reqAddProcut = ({
    categoryId,
    name,
    desc,
    price,
    detail,
    imgs
  })=>axios({
    url:'/manage/product/add',
    method:"POST",
    date:{
      categoryId,
      name,
      desc,
      price,
      detail,
      imgs
    }
  })
 
 //可以在表单总验证中获取四个参数，
  validateFields((errors, values) => {
            if(!errors){
                //提交
                let reqData = {
                    categoryId:values.category,
                    name:values.name,
                    desc:values.desc,
                    price:values.price,

                }
  //可以通过富文本组件对象获取detail
                
  //如何获取图片呢,如法炮制，可以在upload组件中定义一个获取fileList的方法，父组件通过refs获取到子组件再调用方法              
```



##### 角色管理

##### 用户管理

两个界面非常像，组件上都是用Card,Button,Table,BtLink,表格的格式都在WillMount中定义，数据都在DidMount中获取，DateSource都是状态数据

##### 单独的Input如何获取内容

使用state和value绑定获取，或者使用ref得到组件对象获取value

```jsx
<Modal
    title="添加角色"
    visible={this.state.visible}
    onOk={this.handleOk}
    onCancel={this.handleCancel}
    >
    <Input placeholder="请输入角色名" ref={this.inputRef}></Input>
</Modal>



const roleName = this.inputRef.current.state.value
```



##### 表单的下拉框的编写

```jsx
 <Item label="商品分类">
    {getFieldDecorator('category',{
        initialValue:categoryId  ,
        rules:[
            {required:true,message:"请输入商品分类"}
        ]

    })(
        <Select>
            <Option value="">未选择</Option>
            {categorys.map((item,index)=><Option key={index} value={item._id}>{item.name}</Option>)}
        </Select>
    )}
</Item>
```



##### 单独的一个Input组件如何清除它的内容

```javascript
this.inputRef.current.handleReset()//使用ref获取引用
```



##### 如何控制一个从外部引入的表单组件

```jsx
通过ref获取Form但是获取的是form，通过form的validateFields得到所有的表单属性值
```



##### 如何写一个带有lable的单独输入框

```jsx
<Item label='角色名称' {...formItemLayout}>
    <Input value={role.name} />
</Item>
```





##### Tree树形控件

如何显示权限列表

目标是把menu给显示出来

![](http://47.103.65.182/markdown/009.png)





##### Tree

| 参数             | 说明                       | 类型                                                         | 默认值 | 注意                                                         |
| :--------------- | :------------------------- | :----------------------------------------------------------- | :----- | :----------------------------------------------------------- |
| autoExpandParent | 是否自动展开父节点         | boolean                                                      | true   |                                                              |
| checkable        | 节点前添加 Checkbox 复选框 | boolean                                                      | false  |                                                              |
| defaultExpandAll | 默认展开所有树节点         | boolean                                                      | false  |                                                              |
| checkedKeys      | （受控）选中复选框的树节点 | string[] \| {checked: string[], halfChecked: string[]}       | []     | （注意：父子节点有关联，如果传入父节点 key，则子节点自动选中；相应当子节点 key 都传入，父节点也自动选中。当设置`checkable`和`checkStrictly`，它是一个有`checked`和`halfChecked`属性的对象，并且父子节点的选中与否不再关联 |
| onCheck          | 点击复选框触发             | function(checkedKeys, e:{checked: bool, checkedNodes, node, event}) | -      |                                                              |
|                  |                            |                                                              |        |                                                              |
|                  |                            |                                                              |        |                                                              |
|                  |                            |                                                              |        |                                                              |
|                  |                            |                                                              |        |                                                              |



##### TreeNode

| 参数            | 说明                                               | 类型    | 默认值 | 版本   |
| :-------------- | :------------------------------------------------- | :------ | :----- | :----- |
| checkable       | 当树为 checkable 时，设置独立节点是否展示 Checkbox | boolean | -      | 3.17.0 |
| disableCheckbox | 禁掉 checkbox                                      | boolean | false  |        |
|                 |                                                    |         |        |        |
|                 |                                                    |         |        |        |
|                 |                                                    |         |        |        |
|                 |                                                    |         |        |        |
|                 |                                                    |         |        |        |
|                 |                                                    |         |        |        |
|                 |                                                    |         |        |        |



第一步，如何将树显示出来，我们需要根据配置文件中的menuConfig.js动态的生成Tree组件.

这个menuList是一个数组，树形结构依赖的数据是一个数组，数组中包含的对象为节点，对于有children字段的对象，children字段是一个数组，也是包含着对象作为树节点

```javascript
const menuList = [
    {
      title: '首页', // 菜单标题名称
      key: '/home', // 对应的path
      icon: 'home', // 图标名称
    },
    {
      title: '商品',
      key: '/products',
      icon: 'appstore',
      children: [ // 子菜单列表
        {
          title: '品类管理',
          key: '/category',
          icon: 'bars'
        },
        {
          title: '商品管理',
          key: '/product',
          icon: 'tool'
        },
      ]
    },
  
    {
      title: '用户管理',
      key: '/user',
      icon: 'user'
    },
    {
      title: '角色管理',
      key: '/role',
      icon: 'safety',
    },
  
    {
      title: '图形图表',
      key: '/charts',
      icon: 'area-chart',
      children: [
        {
          title: '柱形图',
          key: '/charts/bar',
          icon: 'bar-chart'
        },
        {
          title: '折线图',
          key: '/charts/line',
          icon: 'line-chart'
        },
        {
          title: '饼图',
          key: '/charts/pie',
          icon: 'pie-chart'
        },
      ]
    },
  ]
```





根据此种数据结构，设计生成树节点的代码

```jsx
//从这个代码可以看出，函数对数据结构韩式有要求的，需要有key,title,children

renderTreeNodes = data =>
    data.map(item => {
        if (item.children) {
        return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
            </TreeNode>
        );
        }
        return <TreeNode key={item.key} {...item} />;
    });
```





第二布，将role的menu数据在树形组件选中

```
这时我们需要用到的是checkedKeys，他可以是一个数组（携带所有选中的TreeNode的key），也可以是这样一个对象{checked: string[], halfChecked: string[]}，

```

我们在修改树形组件时会改变checkedKeys，而且在后面很可能用到这个数据，所以最好把checkedKeys设置为state，这样可以给我们带来方便

实时的获取checkedKeys

![](http://47.103.65.182/markdown/016.png)

模态框不会销毁，会导致每次点击，修改权限时得到的是同一个界面，因为我们的状态数据初始化是在WillMount中，解决方法是componentWillReceiveProps



```jsx
  componentWillReceiveProps(nextProps){``
    this.setState({
        checkedKeys:nextProps.role.menus
    })
  }
```



##### Role授权

获取树组件的checkedKeys，这里存入了所有选中的menus

```javascript
  //设置权限
  handleOk2= async()=>{
      //获取书组件
    const treeNode = this.AuthMenusRef.current
    // console.log(treeNode);
    //获取checkedKeys，对应着menus
    const Menus =  treeNode.getMenus()
    //获取此时操作的角色
    const role = this.state.role
    role.menus = Menus//更改按钮
    role.auth_time = Date.now()//设置授权时间
    role.auth_name = memoryUtils.user.username//设置授权人
    const result = await reqUpdateRole(role)//发送请求更新权限
    if(result.status === 0 ){
      // 重新获取页面数据
      this.loadRoles()
      //擦坐姿
      this.handleCancel2()
    }
  }
```





##### 用户管理

没什么东西，修改，添加，删除用户

##### 菜单权限管理

原理：在渲染右侧边栏时在加一层判断，看要渲染的菜单项是不是在用于的角色的menus中

##### redux

##### 图表

##### 前台404





















































