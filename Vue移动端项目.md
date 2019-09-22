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
        redirect:Msite
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

实现方法，加类：类名为on，条件为，当前路由与图标对应

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

再MSite引入js文件和css文件都在script里引

##### 如何查找文件

首先需要安装插件 Search node_modules，

然后`ctrl+shift+p`打开命令搜索，点击search node_modules,开始文件搜索

##### 获取category数据

获取category的数据，然后用v-for渲染

引入lodash,使用chunk方法

`import chunk from 'lodash/chunk'`

##### [异步更新队列](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)

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
    conputed中的set方法
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

mock.js