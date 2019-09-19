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