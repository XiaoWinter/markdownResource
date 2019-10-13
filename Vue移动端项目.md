<h1 align='center'>Vue移动端项目</h1>
#### 搭建环境

##### 新建vue项目

```shell
vue create giaowaimai
```

##### 安装依赖

vue-router，stylus

```
//开发依赖
yarn add stylus stylus-loader -D
//运行依赖
yarn add vue-router
```



#### 开发静态页面

#### html注意点

```html
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="http://at.alicdn.com/t/font_518606_5kcf4pgw3tc.css">
    <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
    <title>giaowaimai</title>
  </head>
```

##### fastClick的作用

```
FastClick是一个简单易用的库，用于消除物理点击和在移动浏览器上触发点击事件之间的300ms延迟。 目的是使您的应用程序感觉更轻松，响应更快，同时避免对当前逻辑的任何干扰。

FastClick由英国《金融时报》旗下的FT Labs开发。

注意：截至2015年末，大多数移动浏览器-特别是Chrome和Safari-不再具有300ms的触摸延迟，因此fastclick对较新的浏览器没有好处，并且存在将错误引入应用程序的风险。 请仔细考虑您是否真的需要使用它。
```

##### reset.css

放到public文件夹下的css文件夹里

```css
/**
 * Eric Meyer's Reset CSS v2.0 (http://meyerweb.com/eric/tools/css/reset/)
 * http://cssreset.com
 */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header,
menu, nav, output, ruby, section, summary,
time, mark, audio, video, input {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-weight: normal;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, menu, nav, section {
  display: block;
}

body {
  line-height: 1;
}

blockquote, q {
  quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* custom */
a {
  color: #7e8c8d;
  text-decoration: none;
  -webkit-backface-visibility: hidden;
}

li {
  list-style: none;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track-piece {
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-border-radius: 6px;
}

::-webkit-scrollbar-thumb:vertical {
  height: 5px;
  background-color: rgba(125, 125, 125, 0.7);
  -webkit-border-radius: 6px;
}

::-webkit-scrollbar-thumb:horizontal {
  width: 5px;
  background-color: rgba(125, 125, 125, 0.7);
  -webkit-border-radius: 6px;
}

html, body {
  width: 100%;
  height: 100%;
}

body {
  -webkit-text-size-adjust: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.ellipsis{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

```





##### 拆分页面结构

```
Content,Footer
```

##### 文件结构

```
src
	|-- components------------非路由组件文件夹
		|-- FooterGuide---------------底部组件文件夹
			|-- FooterGuide.vue--------底部组件vue
      |-- pages-----------------路由组件文件夹
		|-- Msite---------------首页组件文件夹
			|-- Msite.vue--------首页组件vue
		|-- Search----------------搜索组件文件夹
			|-- Search.vue---------搜索组件vue
		|-- Order--------------订单组件文件夹
			|-- Order.vue-------订单组件vue
		|-- Profile--------------个人组件文件夹
			|-- Profile.vue-------个人组件vue
	|-- App.vue---------------应用根组件vue
	|-- main.js---------------应用入口js
```



##### 编写静态文件



先把字体的css,reset写到index.html里，以后就再也不用管他了

###### 体力活

注意一个组件需要一个文件夹存放组件所需各种资源

1.把各个vue组件的模板写下

​	先写四个路由组件，然后是Footer组件，基本架子搭一搭

​	Footer组件很独立，先写这个：HTML结构拷过来，stylus样式拷过来，

​	App组件的app样式也拷一下，把Footer组件写到App中

​	静态的底部导航就完成了

![](http://47.103.65.182/markdown/023.png)

2.四个路由组件的路由规则设置一下

routes.js专门定义路由的规则

```javascript
import Msite from '../page/msite/Msite.vue'
import Search from '../page/search/Search.vue'
import Profile from '../page/profile/Profile.vue'
import Order from '../page/order/Order.vue'

export default [
    {
        path:'/msite',
        component:Msite
    },
    {
        path:'/search',
        component:Search
    },
    {
        path:'/profile',
        component:Profile
    },
    {
        path:'/order',
        component:Order
    },
    {
        path:'/',
        redirect:'/msite'
    },

    
]
```

index.js暴露一个router对象来给Vue对象配置router

```javascript
import VueRouter from "vue-router";
import routes from './routes'
export default new VueRouter({
    mode:'history',
    routes
})
```



main.js中Vue需要配置router

```javascript
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './route'

Vue.config.productionTip = false
//使用插件
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  //配置路由
  router
}).$mount('#app')

```

在App中，暴露一个路由出口

```vue
<template>
  <div id="app">
      //路由出口
    <router-view/>
    <FooterGuide></FooterGuide>
  </div>
</template>
```

基本的路由功能也完成了



#### FooterGuide组件

##### 首先实现footer导航会根据当前路由，点亮不同的图标

##### css代码

* 如何快速布局，使用flex,
* 如何缩小图片，background-size
* 如何实现1px边框： 混合

实现方法，加类：类名为on，条件为，当前路由与图标对应

```
//表示当前的路由是msite就加上on
:class="{on:$route.path === '/msite'}">

```



代码

```javascript
<footer class="footer_guide border-1px">
<!--+++++++++++++++++++++++++++++++就是这样，加类+++++++++++++++++++++++++++++++++--> 
    <span @click="jumpto('/msite')" class="guide_item" :class="{on:$route.path === '/msite'}">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </span>
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
            
            
    <span @click="jumpto('/search')" class="guide_item" :class="{on:$route.path === '/search'}">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </span>
   
  </footer>
```

点击不同的图标跳转到不同的路由，

实现方式，编程式跳转，给图标加监听，点击不同的图标跳转到不同的组件

```javascript
//加点击事件监听，定传入相应路径参数
<span @click="jumpto('/search')" class="guide_item" :class="{on:$route.path === '/search'}">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </span>

<script>
export default {
  methods:{
      //跳转方法
    jumpto(url){
      this.$router.replace(url)
    }
  }
}
</script>
```

##### 实现不同的路由footer有选择的显示

```
//App.vue中
<FooterGuide v-show="$route.meta.isShowFooter"></FooterGuide>
//routes.js中,要显示的都有这个属性  meta:{
                                    isShowFooter:true
                                }
export default [
    {
        path:'/msite',
        component:Msite,
        meta:{
            isShowFooter:true
        }

    },
    {
        path:'/search',
        component:Search,
        meta:{
            isShowFooter:true
        }
    },
    {
        path:'/profile',
        component:Profile,
        meta:{
            isShowFooter:true
        }
    },
    {
        path:'/order',
        component:Order,
        meta:{
            isShowFooter:true
        }
    },
    
    {
        path:'/login',
        component:Login
    }
   ]

```



#### 登陆组件

编写Login模板

Login的入口在Msite的header中，所以先把Msite的header编写一下，又因为Msite,Order,Search,Profile的header基本类似，所以抽取成一个普通组件，然后在Header组件放置插槽

注意，Msite中的header样式与Header中的样式不同所以在两个组件中的<style>标签不能加scope，这是为了让Msite组件的样式覆盖Header的样式

注意，在 复制粘贴stylus时，如果自己整理了缩进，可能会破坏原有的缩进结构，所以直接粘过来，不要动

静态页面基本上复制粘贴，属于体力活

注意，有时候复制粘贴后他的内存数据没有改变，目前都是再复制粘贴一遍，这个问题出现的比较随机，不好查找原因



##### [redirct失效问题](https://segmentfault.com/q/1010000014539156/a-1020000014539878)

你没注意看文档，你那个`redirect`使用不当，一般有这么两种方式：

- **重定向path**

```
const routes = [
  {
    path:"/HelloWorld",
    component: HelloWorld
  },
  {
    path: "/second",
    component: second
  },
  //默认
  {
    path: '/',
    redirect: '/HelloWorld'
  }
]
```

- **重定向name**

```
const routes = [
  {
    path:"/HelloWorld",
    name: 'helloworld',
    component: HelloWorld
  },
  {
    path: "/second",
    component: second
  },
  //默认
  {
    path: '/',
    redirect: { name: 'helloworld' }
  }
]
```



#### 重要的混合写法

##### 清除浮动

```stylus

//清除浮动
clearFix()
  *zoom 1
  &::after
    content ''
    display block
    clear both
```

less版

```less
//清除浮动
.clearFix(){
  *zoom: 1;
  &::after{
    content : '';
    display : block;
    clear : both;
  }
} 
```



##### 根据像素比使用2x,3x图

```stylus
//根据像素比来使用 2x图 3x图
bg-image($url)
  background-image:url($url+"@2x.png")
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
    background-image:url($url+"@3x.png")
```



##### 根据像素比缩放1px边框

```stylus
//根据像素比缩放1px像素边框
@media only screen and (-webkit-device-pixel-ratio:2 )
  .border-1px
    &::before
      transform scaleY(.5)
@media only screen and (-webkit-device-pixel-ratio:3 )
  .border-1px
    &::before
      transform scaleY(.333333)
```

less版

```less
//根据像素比缩放1px像素边框
@media only screen and (-webkit-device-pixel-ratio:2 ){
  .border-1px(){
    &::before{
      transform: scaleY(.5)
    }
  }
}

@media only screen and (-webkit-device-pixel-ratio:3 ){
  .border-1px(){
    &::before{
      transform: scaleY(.333333)
    }
  }
}
```



##### 1像素边框

```stylus
// 一像素上边框
top-border-1px($color)
  position relative
  &::before
    content ''
    position absolute
    z-index 200
    left 0
    top 0
    width 100%
    height 1px
    background-color $color
```

less版

```less
  
// 一像素上边框
.top-border-1px($color){
  position: relative;
  &::before{

    content: '';
    position: absolute;
    z-index: 200;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background-color: $color;
  }
}
// 一像素下边框
.bottom-border-1px($color){
  position: relative;
  &::after{
    content: '';
    position: absolute;
    z-index: 200;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background-color: $color;
  }
}
  
```



#### Store的注册

##### 生成store对象

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getter from './getter'


Vue.use(Vuex)

export default new Vuex.Store({
    state,
    getter,
    mutations,
    actions
})
```

##### 编写配置对象的js文件

##### state.js

```javascript
export default {
    //坐标
    latitude:'40.10038',
    longitude:'116.36867',
    address: {}, // 地址信息对象
    categorys: [], // 分类数组
    shops: [], //商家数组
}
```

##### mutation-types.js

```javascript
export const RECEIVE_ADDRESS = 'receive_address'
export const RECEIVE_SHOPS = 'receive_shops'
export const RECEIVE_CATEGORYS = 'receive_categorys'

```



##### mutations.js

```javascript
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS
} from './mutation-types'

export default {
    [RECEIVE_ADDRESS](state,{addresss}){
        state.addresss = addresss
    },
    [RECEIVE_CATEGORYS](state,categorys){
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state,shops){
        state.shops = shops
    },
}
```

##### actions.js

```javascript
import {
    RECEIVE_SHOPS,
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS
} from './mutation-types.js'
import {reqPosition, reqCategorys, reqShops} from '../api'

const actions = {
    async getAddress({state,commit}){
        //取得地址
        const result = await reqPosition(state)
        if(result.code === 0){
            //更改状态
            commit(RECEIVE_ADDRESS,result.data)
        }
    },
    async getShops({state,commit}){
        const result = await reqShops(state)
        if(result.code===0){
            commit(RECEIVE_SHOPS,result.data)
        }
    },
    async getCategorys({ commit}){
        //取得分类
        const result = await reqCategorys()
        if(result.code === 0){
            commit(RECEIVE_CATEGORYS,result.data)
        }
    }
}

export default actions
```



#### Store的使用

##### 分发action

```javascript
 mounted(){
    this.$store.dispatch('getAddress')
  },
```



map辅助函数获取状态

```javascript
  computed: {
  ...mapState(['address'])
},
    
//可以直接访问了
this.address//如果address的结果是一个异步请求得到的，需要等会拿

//原始方法
this.$store.state.状态名
```



#### Swiper的使用

[API](https://swiperjs.com/api/)

##### 安装swiper

`yarn add swiper`

```js
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
```



在MSite引入js文件和css文件都在script里引

##### 如何查找文件

首先需要安装插件 Search node_modules，

然后`ctrl+shift+p`打开命令搜索，点击search node_modules,开始文件搜索

##### 获取category数据

##### 引入lodash

获取category的数据，然后用v-for渲染

引入lodash,使用chunk方法

`import chunk from 'lodash/chunk'`

##### [NextTick异步更新队列](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)

对于数据的变化，Vue是这么处理的

> vue处理：更新数据状态 ==> 调用监视的回调函数 ==> 异步更新界面

为了在数据变化之后等待 Vue 完成更新 DOM，可以在**数据变化**之后立即使用 Vue.nextTick(callback)。这样回调函数将在 DOM 更新完成后被调用。

```
要做什么： DOM 更新完成后调用回调函数
怎么做：**数据变化**之后立即使用 Vue.nextTick(callback)
监听数据变化的地方：watch有这个能力，computed也有这个能力
```

```javascript
//根据上面得出的结论，大概可以这么用 
watch:{
    categorys(){//categorys的状态数据更新了 
      //轮播图
      this.$nextTick(()=>{
        new Swiper('.swiper-container',{
              loop: true,
              // If we need pagination
              pagination: {
                el: '.swiper-pagination',
              },
              autoplay: {
                delay: 5000,
              },
          })
      })
}
    
//或者是在改变数据后立即调用
    this.somedata = xxxx
    this.$nextTick(()=>{
        //DOM完成更新后这个回调，它用到了上面的somedata
        console.log('DOM更新完成',somedata)
    })
 //这个改变数据的地方可以是很多地方
    computed中的set方法
    actions中的commit执行之后
```



##### action什么时候执行成功（promise的状态确定）

Action 通常是异步的，那么如何知道 action 什么时候结束呢？

action返回一个promise，所以，当promise的状态确定后，action就结束了,

action结束时，同时DOM也更新完成了

```javascript
store.dispatch('actionA').then(() => {
  //这个地方可以编写DOM更新完成才能执行的代码，比如new Swiper('xxx',{})
})
```



#### ShopList的编写

##### 抽取ShopList

编写出组件

##### 获取shoplist数据

使用v-for填充到组件中

##### 显示加载图片

**作用**：在数据没有加载完成前，默认显示一张加载图片

**做法**：使用v-if v-else

```html
<ul class="shop_list" v-if="shops.length"...>
<!-- 当没有shops的数据时，就显示这张图片  -->
<ul class="shop_list" v-else>
    <li>
    	<img src="./images/shop_back.svg" alt="">
    </li>
</ul>
```



##### Start组件的编写

写好组件，根据评分生成星星

思路：根据评分生成一个数组，这个数组包含星星显示的类（满星，半星，空星），另外还有显示的星星大小，这个通过改变类的后缀实现（star-24,star-32,star-48）

```js
<span class="star-item" v-for="(starClass ,index) in starClasses" :class="starClass" :key="index"></span>

//由于小数的计算可能有误差，所以转成整数计算
computed:{
            starClasses(){
                const stars = []
                for (let index = 0; index < 5; index++) {
                    if (this.rating*10 - index*10 >= 10){
                        stars.push('on')
                    }else if(this.rating*10 - index*10 >= 5){
                        stars.push('half')
                    }else{
                        stars.push('off')
                    }
                    
                }
                return stars
            }
        }
```







#### 验证码功能

img的src请求后台验证码的API

API 是`/captcha`

```js
<img class="get_verification" src="http://localhost:9999/captcha" alt="captcha">
```

##### 如何避免img使用缓存

更改url，给url加上请求参数，这个请求参数对于后台没什么用，但是可以让浏览器认为这是一个新的请求

```js
updateCaptcha(){
          this.$refs.captcha.src= 'http://localhost:9999/captcha?'+Date.now()
        }
```



#### 短信功能

##### api是`/sendcode`

搞个能发短信的服务商，按它的索命文档肝

这里添加一个测试号码，给这个手机号发短信

![](http://47.103.65.182/markdown/024.png)



##### 手机短信登陆

设计state,把vuex写写

设计请求接口，api写一下 `/login_sms`

表单数据绑定，写一下v-modal

前期验证一下validate

发送登录请求

存一下用户和token

擦桌子

跳转到我的

##### 用户名密码登录

与手机短信登陆差不多



##### 引入Mint-UI

`yarn add mint-ui`

实现按需加载，需要使用bable

`yarn add -D babel-plugin-component`

babel.config.js

```js
module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins:[
    ['component',
      {
        "libraryName":"mint-ui",
        "style":true
      }
    ]
  ]
}
```

使用

```js
//引入
import { Toast , MessageBox} from 'mint-ui';


if(result.code === 0){
    Toast('短信发送成功')
}else{
    this.computedTime = 0
    MessageBox('提示',result.msg)
}
```



##### 实现自动登录

从localStorage取得token，用户一进界面就直接登陆

在APP的mounted里发送请求，保存状态

编写API`auto_login`

发请求时带上authorization

在APP中发请求



##### 错误处理

```js
if(!error.response){
      messageBox(error.msg)
      if(router.currentRoute.path !== '/login'){
        router.replace('/login')
      }
    }else if(error.response.status == '404'){
      messageBox('访问的资源不存在')
      router.back() 
    }else if(error.response.status == '401'){
      messageBox('我们需要确认您的身份，请登录')
      router.replace('/login')
    }
```

##### 退出登录

清一下内存中的user数据，local storage中的token数据



##### 商家界面

首先给每个商家<li>加点击监听，跳转到商店页

```html
<li class="shop_li border-1px" @click="$router.push('/shop')" v-for="(shop , index) in shops" :key="index">
```

编写商家的组件（Shop）,拆分整体页面，拆分成，Shop容器，ShopHeader,以及3个子路由组件Info,Goods,Rating.

编写一个导航，以及路由出口

```html
<div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/rating" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
    <router-view/>
```



##### 设计json数据

###### 设计准则

设计数据应该依赖后台的实际数据，不能只看页面而设计，要达到从Mock数据切换到后台数据时不用修改代码，去掉mock直接使用，这要求mock数据的结构必须与后台数据的结构一致，类型一致

##### Mock数据

[mock.js](http://mockjs.com/)

404错误，解决方法，使用完整的路径`http://localhost:8080/api/goods`

```js
import Mock from 'mockjs'
import data from './data.json'

Mock.mock('http://localhost:8080/api/goods',{code:0,data:data.goods})
Mock.mock('http://localhost:8080/api/ratings',{code:0,data:data.ratings})
Mock.mock('http://localhost:8080/api/info',{code:0,data:data.info})
```

##### shopHeader

显示商家信息

从mock中获取info数据，装配到页面上

问题：不能显示

```html
<nav class="shop-nav"
         :style="`backgroundImage: url(${info.bgImg})}`">
```

> 为什么刚开始会从空对象中读值，我不是用mapState获取了吗

解决方法

```html
<nav class="shop-nav" v-if="info.bgImg"
         :style="`backgroundImage: url(${info.bgImg})`">
```



##### css样式省略号

```css
.ellipsis{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```



##### 引入reset的问题

要注意不要写成这种形式

```html
<link rel="stylesheet" href="./css/reset.css">
会访问http://localhost:8080(/xxx)/css/reset.css
```

写成下面的这种形式

```html
<link rel="stylesheet" href="/css/reset.css">
会访问http://localhost:8080/css/reset.css
```




##### v-if控制标签是否存在



##### shop头部动画

<transition>标签

去vue细节记录找过渡与动画

###### 获取经验：

如何将某个逐渐显示的元素，改成立即消失

解决：直接隐藏元素，display：none,height = 0,width = 0

##### 图片和文字如何到一行

放到一个span里就行了



##### 滑动效果使用

##### [better-scroll文档](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/)

[betterScroll2.x](https://better-scroll.github.io/docs/zh-CN/guide/)

##### [当 better-scroll 遇见 Vue](https://zhuanlan.zhihu.com/p/27407024)

```
这篇文章我不仅仅是要教会大家封装一个 scroll 组件，还想传递一些把第三方插件（原生 JS 实现）Vue 化的思考过程。很多学习 Vue.js 的同学可能还停留在 “XX 效果如何用 Vue.js 实现” 的程度，其实把插件 Vue 化有两点很关键，一个是对插件本身的实现原理很了解，另一个是对 Vue.js 的特性很了解。对插件本身的实现原理了解需要的是一个思考和钻研的过程，这个过程可能困难，但是收获也是巨大的；而对 Vue.js 的特性的了解，是需要大家对 Vue.js 多多使用，学会从平时的项目中积累和总结，也要善于查阅 Vue.js 的官方文档，关注一些 Vue.js 的升级等。
```

betterscroll小坑

```
你需要一个纯粹的容器，不要有padding,margin,乱七八糟的东西，只要固定宽高，overflow : hodden 就够了

最好把创建的动作放到$nextTick的回调里
 this.$nextTick(()=>{

         new BScroll(this.$refs.navscroll,{
            scrollX: true,
            click: true
         })
         new BScroll(this.$refs.contentScroll,{
            scrollY: true,
            click: true
         })
      })
```



首先写了静态页面，然后去加js效果

```js
yarn add @better-scroll/core@next
```

```js
import BScroll from '@better-scroll/core'

```

```js
//要注意时机的问题，必须在DOM渲染完之后，执行BScroll

watch:{
    goods(){
      this.$nextTick(()=>{
          //this.$refs.left，这个是vue获取的dom元素的引用
          new BScroll(this.$refs.left, {})
          new BScroll(this.$refs.right, {})
      })
    }
  }

//这中构建的方法有问题，当在子路由切换时，goods的数据不会改变，但是每次组件都要再构建一次，所以以后都不会构建BScroll，解决办法是
//1.  mounted(){
    setTimeout(()=>{
      console.log(this.goods)
    },2000)
    if(this.goods.length > 0){
      this.$nextTick(()=>{
          new BScroll(this.$refs.left, {})
          new BScroll(this.$refs.right, {})
      })
    }
  },
      
 //2.保存组件,(有效)
      
     <keep-alive>
      <router-view/>
    </keep-alive>
```



##### 高级功能

better-scroll禁用了原生的dom事件，不支持分发

##### 功能需求

滑动右侧，左侧列表更新，

原理

![](http://47.103.65.182/markdown/025.png)

现在要解决的问题就是，右侧部分的每小块高度是多少？（形成数组）

```html
<ul ref='rightUl'>
    循环出了几个
    <li v-for:"xxx"></li>
</ul>

<script>
	const lis = this.$refs.rightUl.children(伪数组)
    Array.from(lis).reduce((pre,item,index)=>{pre.push(pre[index]+item.offsetHeight) return pre},[0])
</script>
```



解决：查看html结构可知，右侧的每一小块都是一个li，所以只要拿到li，再通过取得其高度，即可形成数组，而且应该需要使用reduce方法

滚动了多少高度？（滑动的距离）



#####  probeType

派发[scroll 事件],不然的话，给betterscroll对象绑定的回调不会触发

```
- 类型：Number
- 默认值：0
- 可选值：1、2、3
- 作用：有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发[scroll 事件]；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件。
```

##### 绑定回调

```js
 //绑定滑动回调函数
 this.scrollRight.on('scroll',({x,y})=>{//滑动事件
 	this.scrollY = -y
 })
 this.scrollRight.on('scrollEnd',({x,y})=>{//滑动结束事件
 	this.scrollY = -y
 })
```



##### 计算出currentIndex

这也达到了滑动rightScroll（右侧列表），leftScroll(左侧列表)更新的效果

```js
//计算出滑动到了哪个区间
currentIndex(){
      const {scrollY, tops} = this
      return this.tops.findIndex((top,index)=> scrollY >= top && scrollY < tops[index+1])
    }
//通过currentIndex改变左侧小列表的样式
:class="{'current':index === currentIndex}" 
```



##### 点击左侧分类，右侧滑动

点击leftScroll（左侧列表），拿到index，通过index得到rightScroll(右侧列表)的高度应该是

```js
<li @click="selectItem(index)" >

 selectItem(index){
      //根据index，获得右侧列表应该的高度
      const y = this.tops[index]
      //设置scroll改变currentIndex
      this.scrollY =  y
      //调用scrollRight的方法将右侧列表滑动到相应的位置
      this.scrollRight.scrollTo(0, -y, 500)
   }
```



##### 左侧跟随右侧滑动



目前在rightscroll（右侧列表）改变时,leftScroll(左侧列表)并不会跟着改变

```js
scrollToElement(el, time, offsetX, offsetY, easing)
//作用：滚动到指定的目标元素。
```



```js
//currentIndex变化时
//让左侧列表滑动
      const toTop = index - 3
      if(toTop >= 0){
          const li = Array.from(this.$refs.rightUl.children)[toTop]
          this.scrollLeft.scrollToElement(li, 200)//滑动到li
      } 

```



监视index的变化，可以再计算属性，可以在watch中获取

scroll.scrollToElement(li)



##### 多模块编程

多module

module是一个js对象

```js
const module = {
	state:{},
	mutations:{},
	actions:{},
	getters:{}
}

export default new Vuex.Store({
   
    modules:{
        msite,
        user,
        shop
    }
})
```







##### 使用setInterval()的坑







##### vuecli2 、3的坑

- 2带编译器可以直接编译模板（template），3不带编译器，用render函数渲染组件（component）

##### 在vuecli3中配置webpack

vue.config.js ——>configureWebpack——>webpack的相关配置

path.join方法的使用，获取文件的绝对路径

###### path.join([...paths])

`path.join()` 方法使用平台特定的分隔符作为定界符将所有给定的 `path` 片段连接在一起，然后规范化生成的路径。

`..`代表跳出一层

零长度的 `path` 片段会被忽略。 如果连接的路径字符串是**零长度**的字符串，则返回 `'.'`，表示当前工作目录。`

- `...paths`<string> 路径片段的序列。
- 返回: string

```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// 返回: '/foo/bar/baz/asdf'
```



##### 配置了webpack配置项的vue.config.js

```js
import path from 'path'

//工具方法，拼接路径
function resolve(dir){
    return path.join(__dirname,dir)
}

module.exports={
    
    configureWebpack:{
        resolve: {
            extensions:['.js','.vue','.json'],
            alias:{
                'vue$':'vue/dist/vue.esm.js',
                '@':resolve('src'),
                'components$':resolve('src/components')
            }
        }
    }
}
```



##### 无中生有的问题

问题：axios发送POST请求，data携带请求参数，后台得不到

原因：axios发送POST请求，一旦data指定为对象，axios使用json格式发送数据，而服务端支支持urlencoding格式，

解决办法：使用axios的请求拦截器，将配置中的data对象转换为urlencodeed格式字符串



##### 各种第三方库的失效问题

绝大部分是使用时机的问题，在和使用虚拟dom的框架结合使用时，这种问题很容易发生，特别是第三方库需要的还是状态数据

##### setInterval问题



```js
import  {setInterval} from 'timers'
这个定时器也能用，那么问题是什么呢？
问题：用原生的clearInterval（）方法不能清除这个vue的定时器
```

##### cartController

创建一个cartController组件，理由是什么，我也不太清楚，这个组件对数据的操作还是很厉害的

##### 要注意要操作数据的出处

子组件不能直接更新父组件的数据，数据可能是vuex中的，如果是这样，只能在action里定义更新方法，所以定义action以改变food的count属性

```js
//action
 //更新food数量的同步action
        updateFoodCount({commit},{isAdd,food}){
            if(isAdd){//add
                commit(ADD_FOOD_COUNT,food)
            }else{//reduce
                commit(REDUCE_FOOD_COUNT,food)
            }
}


//mutation//注意state没有用到
[ADD_FOOD_COUNT](state,food){
        if(food.count !== undefined){
            food.count++
          }else{
            Vue.set(food,'count')
            food.count = 1
          }
},
[REDUCE_FOOD_COUNT](state,food){
         if(food.count>0){
                food.count --
     }
 }


```



##### 

##### [Vue.set( target, propertyName/index, value )](https://cn.vuejs.org/v2/api/#Vue-set)) 给新加的属性，进行数据劫持

**用法**：

向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性 (比如 `this.myObject.newProperty = 'hi'`)

```js
Vue.set(food,'count',1)
```



##### 父组件操作子组件的属性

vue通过Ref可以得到的组件对象，同react中一样，直接调用子组件的方法

```
<template>
	<father>
		<son ref='sonComponent'></son>
	</father>
</template>

<script>
	methods:{
	aaa(){
		this.$refs.sonComponent.xxx()
	}
}
</script>
```



##### 图片懒加载

`vue-lazyload`

安装

`yarn add vue-lazyload`

mint-UI已经引入了

[文档](https://github.com/hilongjw/vue-lazyload)



##### import 动态导入路由组件

```js
const msite = ()=>import('page/goods/goods.vue')
```



##### 简单用法

main.js

```js
import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})



new Vue({
  el: 'body',
  components: {
    App
  }
})
```

对上面的补充

```js
//图片的路径不清楚，就用这种方式
import VueLazyload from 'vue-lazyload'
import loading from '@/commons/img/loading.jpg'

Vue.use(VueLazyload, {
  loading
})
```

template

```vue
<ul>
  <li v-for="img in list">
    <img v-lazy="img.src" >
  </li>
</ul>
```



解决图片会显示上一张图片的问题，隐藏foodShow时删除img

```html
<img v-if="isShowFood" v-lazy="food.image" ref='img'>
```



##### 购物车模块

购物车需要具备结算和修改的功能，所以在数据结构的设计上，需要有一个容器（购物车）对已选中的商品进行统一的管理，放入购物车的条件是商品的购买数量是否大于零，

##### 购物车实现方式

缺点：计算多次

```js
const getters = {
    cartFoods(state){
        return state.goods.reduce((pre,good)=>{
            if(good.count&&good.count>0){
                pre.push(good)
            }
            return pre
        },[])
    }
}
```

使用state保存

```js
const state = {
    ...
    //设置为状态
    cartFoods:[]
} 


[ADD_FOOD_COUNT](state,food){
        if(food.count !== undefined){
            food.count++
          }else{
            Vue.set(food,'count')
            food.count = 1
              //添加到购物车
            state.cartFoods.push(food)
          }
    },
[REDUCE_FOOD_COUNT](state,food){
        if(food.count>0){
            food.count --
        }else{
            //从购物车删除
            state.cartFoods.splice(state.cartFoods.indexOf(food),1) 
        }
    },
//购物车的必要信息     
const getters = {
   //计算属性
    totalCount(state){
        return state.cartFoods.reduce((pre,food)=> pre += food.count,0)
    },
    totalPrice(state){
        return state.cartFoods.reduce((pre,food)=>pre += food.count*food.price,0)
    },

}        
```

##### 类名没有确定。可以以变量的形式书写

###### 应用

```js
<div class="pay" :class="payClass">
//类是计算属性的值
payClass(){
            const {totalPrice} = this
            const {minPrice} = this.shopInfo
            return totalPrice >= minPrice ? 'enough' : 'not-enough'
        }
```

##### 文本值有多种情况，并且与数据相关，使用计算属性控制

```js
 payText(){
            const {totalPrice} = this
            const {minPrice} = this.shopInfo
            if(totalPrice === 0){
                return `${minPrice}元起送`
            }else if(totalPrice > 0 && totalPrice < minPrice){
                return `还差${minPrice - totalPrice}元起送`
            }else if(totalPrice>minPrice){
                return '去结算'
            }
        },
```





##### 使用路由守卫

```js
//Good组件中,解决由其他组件进入good组件没有滚动效果的问题
export default {
    ...
    beforeRouteEnter (to, from, next){
    next(vm => {
      vm.$nextTick(()=>{
          vm.scrollLeft =  new BScroll(vm.$refs.left, {
             click:true
          })
          //配置
          vm.scrollRight = new BScroll(vm.$refs.right, {
            probeType:2,
            click:true
          })
      })
    })
  },
}

//使用全局守卫，控制未登录用户只能进入，登陆界面
router.beforeEach((to, from, next) => {
  const topath = to.path
  if(topath !== '/login' && !store.state.user.token){
    next('/login')
    

  } else{
    next()
  }

})

//使用组件守卫控制，进入登陆界面的只有未登录用户
   beforeRouteEnter(to, from, next){
      
      next(vm=>{
        console.log('object');
        console.log(vm.$store.state.user.token);
        if(vm.$store.state.user.token){
          console.log(1);
          //阻止进入该路由
          next('/profile') 
        }else{
          console.log(2);
          //允许放行
          next()
        }
      })
    }
```





findIndex与indexOf的区别

/****************************************************                      findIndex        ******************************************************************************************/

`findIndex()`方法返回数组中满足提供的测试函数的第一个元素的**索引**。否则返回-1。

**callback**

针对数组中的每个元素, 都会执行该回调函数, 执行时会自动传入下面三个参数:

- `element`

  当前元素。

- `index`

  当前元素的索引。

- `array`

  调用`findIndex`的数组。

**thisArg**

可选。执行`callback`时作为`this`对象的值.

/*************************************************************               indexOf()         **********************************************************************************/

`indexOf()`方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

语法

`indexOf(searchElement)`

**searchElement**要查找的元素



toogle效果

better-scroll只会在刚创建时给滑动dom加上控制滑动的style，所以不能换掉滑动dom,所以只能用v-show不能用v-if



##### `better-scroll`问题排除注意

首先要观察容器尺寸是否大于滑动内容尺寸



##### 打包

```sheel
yarn run build
```

##### 配置反向代理

使用nginx

[nginx教学视频](https://www.bilibili.com/video/av68136734?from=search&seid=2114232868809176869)



##### history的两个问题？

###### 直接访问路由路径

* 跨域的问题



* 路由组件下刷新404问题

  向后台发送了路由路径

  访问不存在的`not`，路径成为`http://localhost/xxxx/route/not`这个路径的文件并不存在，所以会返回404



##### 组件标签的内容会放到哪里

##### 作用域插槽

##### 混合

##### 动态组件，缓存组件，异步组件

```javascript
//异步组件
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

缓存组件

```html
<keep-alive>
	<component>
</keep-alive>
```



##### 组件标签使用v-modal

[v-model详解](https://www.jianshu.com/p/4147d3ed2e60)

##### 事件（原生事件，自定义事件）

```html
<input v-model="sth" />
<input v-bind:value="sth" v-on:input="sth = $event.target.value" />
```



```html
<currency-input v-model="price"></currentcy-input>
<!--上行代码是下行的语法糖
  <currency-input :value="price" @input="price = arguments[0]"></currency-input>
-->
在current-input里可能有这样的代码
<input type="text" @input="this.$emit('input',$event.target.value)">
```



**原因：**组件没有原生事件，只有自定义事件，若想使用自定义事件，需要加上`.native`变为原生事件，

除此之外，组件上的事件都是自定义事件，需要在组件里使用`this.$emit(自定义事件名，参数)`手动触发



移动端适配

[vuecli3使用进行适配](https://www.jianshu.com/p/0a584fa6708e)

```shell
npm install lib-flexible --save
yarn add lib-flexible

npm install postcss-px2rem --save-dev
yarn add postcss-px2rem -D
```

vue.config.js

```js
module.exports = {
  css: {
      loaderOptions: {
        css: {},
        postcss: {
          plugins: [
            require('postcss-px2rem')({
              remUnit: 75//改成你使用的设计稿的10分之一
            })
          ]
        }
      }
  }
}
```



网易严选

| 状态                       | 耗时 |
| -------------------------- | ---- |
| 使用图片懒加载             | 18s  |
| 原先基础上，使用路由懒加载 | 16s  |