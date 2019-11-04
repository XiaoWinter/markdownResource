

## React移动端项目



#### 安装React脚手架

`yarn global add create-react-app` 或者`npm install -g create-react-app`

#### 构建项目

`create-react-app 项目名`

#### 入口文件

##### index.js

```react
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
```



##### App.jsx

这里写主要写一级路由，以及全局普通组件

```react
import React, {Component} from 'react'
import {BrowserRouter,Switch,Redirect,Route} from 'react-router-dom'
//引入组件
import Footer from './components/footer/Footer'
import Home from './page/home/Home'
import Test from './page/home/Test'
//引入css
import './index.less'
/*
应用根组件
 */
class App extends Component {
  render() {
    return (
     <BrowserRouter>
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/test" component={Test}></Route>
          <Redirect to="/home" ></Redirect>
        </Switch>
        <Footer></Footer>
     </BrowserRouter>
    )
  }
}
```



##### html引入reset

```html
<link rel="stylesheet" href="/css//reset.css">
```



##### 事件直接编入函数，而不使用事件处理程序

```html
<div className='search-input' onClick={()=>{this.props.history.push('/')}}> 
```



#### [如何在react中引入less](https://juejin.im/post/5c3d67066fb9a049f06a8323?tdsourcetag=s_pcqq_aiomsg)

1.安装less和less-loader

`yarn add less less-loader -D`

2.让react生成webpack.config.js(这是因为react脚手架默认创建是所有项目都是简介化的，所以看不到webpack的配置文件，所以需要执行命令，让它生成一个)

 `npm run eject`或者 `yarn run eject`

3.使用npm 或者yarn 去运行 它，然后后续操作点击Y, `此操作是不可逆的`，你点击确定就好

如果你使用git 管理但是没有保存，它会报错提示你commit一下

`多出一个文件夹config`

![](http://47.103.65.182/markdown/031.png)

4.修该webpack配置，文件类型正则匹配

![](http://47.103.65.182/markdown/032.png)

在common 中less的混合文件



#### 如何使用better-scroll

[betterScroll2.x](https://better-scroll.github.io/docs/zh-CN/guide/)

安装

```
yarn add @better-scroll/core@next
```

引入

```
import BScroll from '@better-scroll/core'
```



使用

```react
    //初始化，一部数据的话可能宽度没有撑开
    componentDidMount(){
        this.scroll = new BScroll('#root > div > div.home-header > div.header-nav',{
            click:true,
            scrollX:true
        })
    }


//刷新容器
    //state改变
    componentDidUpdate(){
        //这里应该加一个限制条件
        this.scroll.refresh()
    }
```

#### 如何切分字符串

```js
  stringlimit(value,lenght){
        if(value.length > length){
            return value.substring(0,length)+'...'
         }else{
            return value;
         }
    }
```



#### 如何使用swiper

```js
html结构不变
<!-- Slider main container -->
<div class="swiper-container">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        ...
    </div>
    <!-- If we need pagination -->
    <div class="swiper-pagination"></div>

    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- If we need scrollbar -->
    <div class="swiper-scrollbar"></div>
</div>
css引入不变
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

js代码改变
swiper对象的创建时机，需要在获取了数据之后
//在setState的回调创建，相当于watch了state数据
   this.setState({
            data:data
        }, () => {
                new Swiper('#headerswiper', {
                    //speed: 1300,
                    autoplay:true,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                    },
                    loop:true
                    })
        })
```

##### 移动端适配

