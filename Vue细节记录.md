## Vue细节记录

##### 模板

带有魔法的HTML

vue指令：vue自定义的标签属性

插值语法：{{js代码}} //用于文本的显示

```
<div id="moban">
	<input type='text' v-model="msg">
	<p>{{msg}}</p>
</div>
```





```
new Vue({
	el:"#moban",
	data:{
		msg:"xxx"
	}

})
```



Vue的option

el:指示模板

data://变量（数据）容器

​	msg://变量名

data:{xxx:yyy}

data(){

​	return{

​	xxx:yyy

}

}

##### 语句和表达式



##### v-bind 强制绑定数据

```javascript
<a v-bind:href="data">xxxxx</a>
语法糖
<a :href="data">xxxxx</a>
```

##### v-on 强制绑定事件

```javascript
<button v-on:click="test($event,'abc')">按钮</button>

new Vue({
	methons:{
		test(event,msg){
			alert('xxxx')
		}
	}
})
```

##### 计算属性computed

计算属性是根据现有的数据计算而得到

computed ：一旦data发生改变，计算属性的函数应该绘制行,

计算属性会缓存{方法名：计算的值}，减少计算的次数，优化性能呢 

```
computed:{
	complete:{
		get(){
			//根据已有的数据得到生成的数据
		},
		set(val){
			//自定义设置（比如，调用父组件的方法）
		}
	}
}
```







##### watch属性

包括多个属性监视对象

```
watch:{

	firstName:function(newValue, oldValue){

	},
	todos:{
		deep:true,
		handler:(newVal,oldVal)=>{
			
		}
	}

}
vm.$watch('firstName',function(){})
```



##### get()获取属性值

##### set()监听属性值



##### 绑定class属性

类名没有确定。从vm中获取

:class ="myClass"

类名确定但是有没有没确定

:class={classA:hasA,classB:hasB}

固定的类名

直接加class="xxx''

多个类名

:class="['A','B','C']"

##### style绑定

:style="{color:activeColor}"



##### v-if/v-show

```vue
<div>
    <p v-if="ok">表白成</P>
	<p v-else>表白失败</P>

<button @click="ok=!ok">
    切换
</button>
	<p v-show="ok">
        结婚成,空间换时间
    </p>
    <p v-show="!ok">
       结婚失败哦
    </p>
</div>

```



##### v-for

```vue
<ul id="example-1">
    //遍历一个数组
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>


<script>
	var example1 = new Vue({
      el: '#example-1',
      data: {
        items: [
          { message: 'Foo' },
          { message: 'Bar' }
        ]
      }
    })
</script>
```



```jsx
<ul id="example-2">
    //可以有index,遍历对象
  <li v-for="(value, index) in items">
    {{ value }}
  </li>
</ul>

<script>
        var example2 = new Vue({
          el: '#example-2',
          data: {
            parentMessage: 'Parent',
            items: {
                A:'a',
                B:'b',
                C:'c'
            }
          }
        })
</script>
```

```vue
//自定义组件进行循环复制时，需要指定key,key为item得来的
<Item v-for="todo in todos" :key="todo.id" ></Item>
```







##### vue监视data

数组和非数组

data会监视所有层次的数据，

对象：所有属性通过set方法监视

数组：重写数组的cud方法，来实现监视，它做了两件事

​	1）调用数组的对应方法，对元素进行操作

​	2）更新界面

splice（第几个，删几个，插几个数）

##### 事件修饰符；获取事件对象，修饰事件处理函数

```vue
<button @click.prevent ="todo($event,'msg')">
阻止事件的默认行为，$event事件对象
</button>

<button @click.stop ="todo($event,'msg')">
阻止事冒泡，$event事件对象
</button>
.once
```



##### 按键修饰符

给元素绑定一个键盘事件，当命中修饰符时，调用回调函数

```vue
<input type="text" @keyup.enter="todo">
```



##### 表单数据收集



```vue
<input type="radio" value="男" v-model="sex">男</index>
<input type="checkbox" value="backet" v-model="like">篮球</input>
<input type="checkbox" value="foot" v-model="like">足球</input>
<select v-model="cityId">
    <option value="">伪选择</option>
    <option :value="city.id" v-for="city in citys" :key="city.id"></option>
</select>
<textarea v-model="text"></textarea>

data: 
{
	like:[],
	sex:'男',
	cityId:'',
	text:""
}
```











##### 配置

Vue.config.xxxx

##### MVVM

##### v-model 双向数据绑定

页面改变——>vue对象改变

vue对象改变——>页面改变

![](http://47.103.65.182/markdown/008.png)





##### vue生命周期

```java
初始化：
	//准备好基本的vm上下文
	beforeCreate()
	create()
	//编译模板
	beforeMount()
	mounted()
	
运行时：
	beforeUpdate()
	updated()
	
销毁：
	beforeDetroy()
	destroyed
	
```





![](https://vue.docschina.org/images/lifecycle.png)

##### 过渡与动画

```vue
<style>
    /*命名方式看下图*/
    .fade_xxxx {
        
    }
</style>
<transition name="fade">
	<p>
        xxxxx
    </p>
</transition>
```



##### 类名命名方式

v是你自己啊指定的

![](https://cn.vuejs.org/images/transition.png)



##### 过滤器

```vue
<body>
    <div id="test1">
        //竖杠的后面写过滤器的名字
        <div>{{time|myfileter}}</div>
        <!-- 在 `v-bind` 中 -->
		<div v-bind:id="rawId | formatId"></div>
    </div>
    <script>
        //定义过滤器
        Vue.filter('myfileter',function(value,option...){
            return moment(value).format('YYYY--MM--DD HH:mm:ss')
        })

        new Vue({
            el:'#test1',
            data:{
                time:Date.now()
            }
        })
        </script>
</body>
```



##### ref



可以得到dom对象，也可以得到组件对象

```vue
 <div id="test1">
     	//标记标签
        <p ref="content">xxxxx</p>
        <button @click="hint">提示</button>
</div>
<script>
		new Vue({
            el:'#test1',
            methods:{
                hint(){
                    //塞到了$refs,属性名为ref
                    alert(this.$refs.content.innerHTML)
                }
            }
        })
</script>
 

```



##### 自定义指令 

expresion表达式 

directive指令

```vue

 <div id="test1">
        <p v-up="msg"></p>
        <p v-lower-case="msg"> </p>	
    </div>
<script>
    //全局的自定义指令，所有的组件中都能使用它
    //el,指令所在的dom，binding,与指令相关的所有属性
		Vue.directive('up',function(el,binding){
            el.innerText = binding.value.toUpcase()
        })
    
    
     new Vue({
            el:'#test1',
            data:{
                msg:'sdasd'
            },
           //局部的自定义指令，只在当前的实例中有效
            directive:{
                'lower-case'(el,binding){
					el.innerText = binding.value.toUpcase()
                }
            }

        })
</script>
```



##### 插件

```javascript
!(function(){
    var MyPlugin
    MyPlugin.install = function(Vue,options){

        //定义全局API
        Vue.xxxxx
        //自定义指令
        Vue.directive
        //定义过滤器
        Vue.filter
        //自定义实例方法
        Vue.propertype.xxxxx()

    }
    
    window.MyPlugin = MyPlugin;
} )(window)

Vue.use(MyPlugin,options)

```



##### v-text/v-html

定义标签内容



##### 桥接



##### 编码规范检查





##### xxxrc中rc的rc

runtime control



##### 组件

```
实现某个局部功能的所有代码的集合
```

组件的三部分

```vue
HTML//模板
<template>

</template>


<script>
    
export default {	
	xxx:'xxx',
	data(){
    return {
        yyy:'yyy'
    }

}
}
</script>
//样式局部启用
<style scoped>

</style>

```

##### 注册组件

```
import xxx from '../xxx/a'
new Vue({

    componends:{
        xxx:xxx
    }
})
```



**组件是可复用的 Vue 实例**，且带有一个名字：在这个例子中是 `<button-counter>`。我们可以在一个通过 `new Vue` 创建的 Vue 根实例中，把这个组件作为自定义元素来使用：

**我们所写的vue文件最终就转化为了下面这种定义组件的形式**



###### 定义组件

```vue
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```



模板（vue解析的代码块）

```vue
<div id="components-demo">
  <button-counter></button-counter>
</div>
```



###### 使用

```vue
new Vue({ el: '#components-demo' })
```



##### vue的数据传输方式

###### [通过 Prop 向子组件传递数据](https://cn.vuejs.org/v2/guide/components.html#通过-Prop-向子组件传递数据)

```vue
<template>
	<div>
        <Son :todos="todos"></Son>
    </div>
</template>

export default{
//声明接收的树形
	prps:['todos'],
//或者
	props:{
	todo:Object
}
	componends:{
	
	}
}
```



##### 组件间通信

###### 原则一：子组件不要直接修改父组件的属性



```
<1> props  缺点：祖先后代通信需要逐层传递，兄弟组件通信需要借助父组件
<2>自定义事件 ==> 事件总线  
<3>消息订阅发布 pubsub库
<4>slot插槽
<5>vuex
```





组件对象（VueComponend）。他是VueComponend构造出的对象，VueComponend是以视图模型对象为原型的函数

视图模型对象（ViewModel） ,他是以Vue函数构造出的对象



##### 事件总线可行性基础

组件对象的父类是ViewModel对象，但是每个ViewModel对象是不同的，

组件对象的爷爷类是Vue的prototype,所有组件对象的爷爷类是同一个人

![](http://47.103.65.182/markdown/010.png)







##### 自定义事件

##### 子向父简单通信

目的：进行子向父通信

步骤

```vue
第一，父组件中给子组件绑定事件

<Father>
    <Son @myEvent="dosomething"></Son>
</Father>

<script>
	new Vue({
        methods:{
            dosomething:(param)=>{
                //todo
            }
        }
    })
</script>

第二，子组件触发这个事件

<Son>
	xxx
</Son>
<script>
	new Vue({
        methods:{
            letDo(){
                this.$emit('myEvent',param)
            }
        }
    })
</script>
```



##### 跨越组件通信(使用事件总线)

<a href="##### 事件总线可行性基础">事件总线可行性基础</a>

```vue
//定义一个Vue对象，总线对象
Vue.prototype.$Bus = new Vue()

组件A

Mounted钩子中
绑定事件
this.$Bus.$on('事件名',callBack)

beforeDestory钩子
解除绑定
this.$Bus.$off('事件名')

组件B
分发事件(触发事件
)
this.$Bus.$emit('事件名',参数)
```



#### slot

```vue
//子组件
<template>
	<div>
        <slot name="A"></slot>
        <p>
            hahaha
    	</p>
        <slot name="B">
    		设置默认值
    	</slot>
    </div>
</template>


//父组件中解析好了,这样就在相应位置传递了标签
<Father>
	<Son>
    	<div slot="A">
            slotA
        </div>
        <div slot="B">
            slotB
        </div>
    </Son>
</Father>
```

类似于React的children



如何合并两个对象



##### [快速上手@vue/cli](https://baijiahao.baidu.com/s?id=1628046958550495589&wfr=spider&for=pc)

如果有2.x版本的vue-cli要卸载掉，否则3会出错



```
拆分为header，todos{item},footer
```



##### 初始化

使用cli构建一个项目

##### 编写

###### 拆分

书写组件，将整个页面拆分成几个部分，将样式文件分成几个部分，

###### 静态页面

将几个部分写成组件，引入到App

```javascript
<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Todos from './components/Todos.vue'

export default {
  name: 'app',
  components: {
    Header,
    Footer,
    Todos
  }
}
</script>
```



动态效果

1.初始化数据，

数据结构为下

```
todos:[
    {
        id:Date.now(),
        name:'吃饭',
        complete:false
    },
    {
        id:Date.now(),
        name:'睡觉',
        complete:false
    },
    {
        id:Date.now(),
        name:'休息',
        complete:false
    }
]
```

2.数据的位置

App中

```javascript
  data(){
    return {
      todos:[
    {
        id:Date.now(),
        name:'吃饭',
        complete:false
    },
    {
        id:Date.now(),
        name:'睡觉',
        complete:false
    },
    {
        id:Date.now(),
        name:'休息',
        complete:false
    }
]
    }
  },
```



3.传递数据



```vue
//父组件中向子组件传递数据
<Todos :todos="todos"></Todos>
//子组件声明这个数据
export default {
	props:{
		todos:Array
	}
}
//传递的数据怎么用，直接用，就当在data中定义的一样
//
<Item v-for="todo in todos" :key="todo.id" :todo="todo" ></Item>
```

##### 使用总线



###### 给Vue的原型绑定事件的代理对象

```javascript
//main.js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//创建一个Vue实例作为事件代理对象
Vue.prototype.$Bus = new Vue()


new Vue({
  render: h => h(App),
}).$mount('#app')

```

###### 绑定事件



```vue
<template>
  
    
     <div class="todo-container">
       
    
    
    <div class="todo-wrap">
      <Header></Header>
      <Todos :todos="todos"></Todos>
      <Footer :completed="completed" :total="total"></Footer>
      
    </div>
  </div>
 
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Todos from './components/Todos.vue'

export default {
  name: 'app',
    //设置数据
  data(){
    return {
      todos:[]
    }
  },
    //给footer传入计算属性
  computed:{
    completed(){
      
      return this.todos.reduce((pre,item)=> pre += item.complete,0)
    },
    total(){
      return this.todos.length
    }
  },
    //在挂载后，绑定自定以事件到总线上，以及从localStorage获取todos
  mounted(){
    //初始化todos
    this.todos = JSON.parse(localStorage.getItem('todos')||'[]')
    //添加一条记录
    this.$Bus.$on('addTodo',this.addTodo)
    //删除一条记录
    this.$Bus.$on('delTodo',this.delTodo)
    //修改完成
    this.$Bus.$on('setCheck',this.setCheck)
    //选则所有
    this.$Bus.$on('checkAll',this.checkAll)
    //清除选中的
    this.$Bus.$on('delCompleted',this.delCompleted)
  },
    //定义总线绑定事件的回调
   methods:{
    addTodo(todo){
      this.todos.unshift(todo)
    },
    delTodo(index){
      this.todos.splice(index,1)
    },
    setCheck(index,isCheck){
      this.todos[index].complete = !isCheck
    },
    checkAll(isCheck){
      this.todos.forEach(todo => {
        todo.complete = isCheck
      });
    },
    delCompleted(){
      this.todos = this.todos.filter(todo=>!todo.complete)
    }
  },
    //组件销毁时解绑事件
   beforeDestory(){
    //解绑
    this.$Bus.$off('addTodo')
    this.$Bus.$off('delTodo')
    this.$Bus.$off('setCheck')
    this.$Bus.$off('checkAll')
    this.$Bus.$off('delCompleted')
  },
    //监视todos 的变化实现数据驱动
  watch:{
    todos:{
      deep:true,
		  handler(newVal,oldVal){
        // console.log('看到了')
        this.todos = newVal
        localStorage.setItem('todos',JSON.stringify(this.todos))
		  }
    }
  },
 
 
  components: {
    Header,
    Footer,
    Todos
  }
}
</script>
```



###### 触发总线的事件

```javascript
<template>
        <li>
          <label>
    		
            <input type="checkbox" :checked="todo.complete" @click="setCheck"/>
            <span>{{todo.title}}</span>
          </label>
          <button class="btn btn-danger" @click="delTodo">删除</button>
        </li>
</template>

<script>
export default {
    props:['todo','index'],
    data(){
        return{
            check:false
        }
    },
    mounted(){
        this.check = this.todo.complete
        // console.log('调用了mounted',this.check)

    },
    beforeUpdate(){
       this.check = this.todo.complete
    //    console.log('调用了beforeUpdate',this.check)
    },
	//在标签触发某些事件时触发总线事件（其实在任意合适的时机都可使用），并出入参数，以供自定义事件的回调使用，
    methods:{
        delTodo(){
            this.$Bus.$emit('delTodo',this.index)
        },
        setCheck(){
            this.$Bus.$emit('setCheck',this.index,this.check)
        }
    }
}
</script>
```



##### 组件什么时候销毁



##### Vue发送请求

###### 最最重要的发送请求的方式时axios

###### 传统方法：vue-resource（插件）



##### 常见的UI组件库

###### UI组件库都需要按需打包

###### PC：Element/iview

###### Mobile:mint-ui/MUI

##### 在Vue2中的配置

代理设置

config,baseconfig,

```javascript
//一般写法
proxyTable:{
    //路径
	'/xxx':'url',
      //替换
    pathRewayte:{
        '^/xxx':''
        },
     //可跨域
	changeOrigin:true
}

//更具扩展性的写法
proxyTable:{	
	'xxx':{
        target:'url,'
         pathRewayte:{
            '^/xxx':''
            },
        changeOrigin:true
	}
}



```



data中得数据会被添加到VM对象上



#### Vue-Router

路由就是转发（跳转）的规则，路由可以将组件渲染到页面的某些位置



#### QuickStart

#### 1.如何设置规则

##### 定义路由

路由是一个js对象，它通过VueRouter构造函数创建，

他接受一个一个配置routes ，routes 是一个格式固定的数组，

routes 维护路由路径与组件的映射关系`{ path: '/foo', component: ComponentA }`

```javascript
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Vue from 'vue'
import VueRouter from 'vue-router'

import ComponentA from '../xxxx'
import ComponentB from '../xxxx'
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是import xxx from '组件路径'
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: ComponentA },
  { path: '/bar', component: ComponentB }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})
```



##### 注册路由

在vue中路由是Vue实例的一个配置项(options)

通过将router对象配置到vue根实例，从而使得，整个vue整个应用都有路由功能

```javascript
// 4. 创建和挂载根实例。

const app = new Vue({
  router：router
}).$mount('#app')//$mount('app')等同于配置el:'#app'
```



#### 2.如何使用规则（路由）

##### 使用路由

使用路由至少包括两个要素，

* 命令（要哪个组件`{ path: '/foo', component: ComponentA }`，vue中称之为**导航**）

  > 命令这个操错有两种达成方式

  <1>**声明式路由导航**

  ```html
  	<!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link to="/foo">Go to Foo</router-link>
      <router-link to="/bar">Go to Bar</router-link>
  	
	<!-- repacle 在历史记录中，会替换当前的路由 -->
  	<router-link :to="..." replace></router-link>
  ```
```
  

  
  <2>**[编程式路由导航](https://router.vuejs.org/zh/guide/essentials/navigation.html)**
  
  在根实例注册了路由之后，会在Vue的prototype上挂载一个$router对象，通过调用这个对象的一些方法，可以使路由跳转
  
  ```javascript
  // 字符串
  router.push('home')
  // 对象
  router.push({ path: 'home' })
  
  //这里可以携带参数
  // 命名的路由
  router.push({ name: 'user', params: { userId: '123' }})
  // 带查询参数，变成 /register?plan=private
  router.push({ path: 'register', query: { plan: 'private' }})
  
  
  router.replace(location, onComplete?, onAbort?)
                 
  router.go(n)
```

  



#### 编写HelloWorld

##### 创建一个脚手架

```
vue create vue-router

```

建好后，按提示

```
cd vue-router
yarn serve
```



##### 拆分页面

根据HelloWorld拆分组件,可拆分成Header ,Sider,Show三个组件，放到App中，另外还有两个有声明式导航使用的路由组件About，Home





![](http://47.103.65.182/markdown/011.png)

![](http://47.103.65.182/markdown/013.png)

##### 编写静态页面

编写组件写上一点样式

![](http://47.103.65.182/markdown/012.png)



##### 路由应用

要想使用路由，需要安装vue-router包

`yarn add vue-router`

在src下新建文件夹route,然后创建index.js文件,在这个文件中，我们编写路由的规则，暴露一个路由对象，然后导入到App中，让App配置这个Router对象，使我们的应用可以使用路由功能，

eslint太烦了，所以在index.js的最上方加上忽略命令`/* eslint-disable */`

注意：这里有vue3的一个小坑

```
if you Vue-Router don't work when you use vue/cli3,you may need to change you 'import' from "import Vue from 'vue'" to "import Vue from 'vue/dist/vue.js'"
如果你的vueRouter不工作了，在vue/cli3的环境下，你可能需要修改你的import，把"import Vue from 'vue'"
改成"import Vue from 'vue/dist/vue.js'"
```



###### 定义路由的规则

```javascript
/* eslint-disable */
import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'

//导入组件
import About from '../page/About.vue'
import Home from '../page/Home.vue'

//记得安装一下路由插件
Vue.use(VueRouter)
//定义一下路由的规则
//component写成了componend，搞了好久，太艹了
const routes = [
    {path:'/About',component:About},//path的'/'表示根路径（http://www.xx.com/）；整个path表示（http://www.xx.com/Aout）
    {path:'/Home',component:Home}
]

//创建一个路由对象，待会传给App
const router = new VueRouter({
    mode: 'history', // 浏览器地址栏路径不带#
    routes
})

export {router}
```

###### 注册给根组件

```javascript
import Vue from 'vue/dist/vue.js'
import App from './App'
import router from './router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  components: { App }
}).$mount('#app')
```



###### 使用路由

* 声明路由

```html
<!--Sider组件编写路由声明,<router-link to="/about">...-->
<template>
  <div id="sider">
    <ul>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/home">Home</router-link></li>     
    </ul>
  </div>
</template>
```

* 路由视图

```html
<!-- Show组件中写一个路由出口，虽然路由和出口写在了不同的组件中，但是任然可以正常使用  -->
<template>
  <div id="show">
  <!-- 目前来说所有的路由视图的渲染都会跳到这里   -->
 <router-view></router-view>
  </div>
</template>
```



#### [嵌套路由](https://router.vuejs.org/zh/guide/essentials/nested-routes.html)

###### 组件目前可以被分成两类

* 普通组件：构成一开始页面的组件，如Header,Sider,Footer等

* 路由组件：注册到路由规则中，通过`<router-link>`或者`$router`跳转,通过`<router-view>`渲染到页面中的组件

目前的helloworld实现了一级路由的功能，一级路由的路由组件渲染会直接找到最顶层的出口（`<router-view/>`）,这个标签写在普通组件中，所以会被当作一级路由的渲染出口，如果我们想要在路由组件A中渲染一个组件B，则可以在该路由组件中定义`<router-link to='B'>` 和`<router-view>`,`<router-link to='B'>`对应的组件会被渲染到组件A中。这种路由组件中渲染路由组件就叫嵌套路由

路由组件A中，编写路由组件B的声明和渲染

```html
//HOME组件中进行子组件的渲染
<template>
  <div>
    <h1>Home</h1>
    <ul>
      <!-- 路由声明  -->  
      <li><router-link to="/home/news">news</router-link></li>
      <li><router-link to="/home/message">messages</router-link></li>
    </ul>
    <!-- 路由渲染  -->
    <router-view/>
    </div>
</template>
```



###### 定义规则

嵌套路由通过路由规则的children属性来表示，其值是路由规则的数组

```javascript

const routes = [
    {
        path:'/about',
        component:About
    },
    {
        path:'/home',
        component:Home,
        //嵌套路由
        children:[
            {	
                //path:'/news',//这是个错误写法
                //path:'/home/news',//这是该路由队则的完整写法
                path:'news',//这是该路由规则的简要写法
                component:News
            },
            {
                path:'message',
                component:Message

            },
            //给'/home'路由规则设置一个默认的跳转（重定向）
            {
                path:'',
                redirect:'news'
            }
        ]
    },
]
```



#### 动态路由匹配

如何向路由组件传递数据，对于那种页面结构一样，只是数据不同的页面，可以使用路径参数（params）来传递关键字数据，从而显示页面

形如`/xxx/yyy/1`,`/xxx/yyy/2`,`/xxx/yyy/3`，这三个路径其实是同一个组件，通过最后的`/1` `/2` `/3`传递数据，显示不同的页面。

###### 如何声明一个动态路由

```javascript
//动态路由配置
routes=[
	{path:'/:id',component:xxx}
]
```



```javascript
//helloworld项目的routes中声明动态路由
const routes = [
    {
        path:'/about',
        component:About,
        children:[

        ]
    },
    {
        path:'/home',
        component:Home,
        children:[
            {
                path:'/home/news',
                component:News
            },
            {
                path:'message',
                component:Message,
                children:[
                    {
                        //在这里配置动态路由
                        path:'detail/:id',
                        component:MessageDetail
                    }
                ]
            },
            {
                path:'',
                redirect:'news'
            }
        ]
    },
]
```



###### 组件中动态路由的使用

`router-link`的路径是动态生成的。并且可以匹配动态路由规则 

```vue
<template>
  <div>
      <ul>
          <li v-for="msg in Msgs" :key='msg.id' >
              <router-link :to="`/home/message/detail/${msg.id}`">{{msg.msg}}</router-link>
              </li>
      </ul>
      <router-view/>
  </div>
</template>
```

###### 如何获取动态路由传递的数据

原理：路由的params参数和query参数被存到了Vue原型对象的$route属性上了

![](http://47.103.65.182/markdown/014.png)

```vue
<template>
  <ul>
      <li>ID:{{message.id}}</li>
      <li>message:{{message.msg}}</li>
      <li>Content:{{message.content}}</li>
  </ul>
</template>

<script>
export default {
    data(){
        return{
            message:{},
        }
    },
    //mounted是为了初始化显示
    mounted(){
        
        //从$route中取得路径参数
        const ID = this.$route.params.id
        this.message = {
            id:ID,
            msg:'ID是'+ID,
            content:'内容是'+ID
        }
    },
    //由于这个组件不会销毁所以需要每次数据改变就修改页面数据，
    //可以有两个方法，
    //1.使用watch监视$route数据
    //2.使用生命周期函数beforeUpdate
    watch:{
        $route:{
            handler(newVal){
                const ID = newVal.params.id
                this.message = {
                id:ID,
                msg:'ID是'+ID,
                content:'内容是'+ID
        }
            }
        }
    }
}
</script>

<style>

</style>
```



#### [编程式导航](https://router.vuejs.org/zh/guide/essentials/navigation.html)

[API](https://router.vuejs.org/zh/api/#router-push)

除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

##### 编程式导航api

###### push方法

```
想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。


router.push(location).then(onComplete).catch(onAbort)


router.push(location, onComplete?, onAbort?)

    location：同上
    onComplete:同上
    onAbout:同上
    
```



```javascript
// 字符串
router.push('home')
// 对象
router.push({ path: 'home' })
// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```







###### replace方法

```
跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。
这两个方法的参数代表的含义与push相同
router.replace(location).then(onComplete).catch(onAbort)
   
router.replace(location, onComplete?, onAbort?)

```

###### go方法

```
这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。
```

###### back方法

略

###### forward方法

略

##### 如何使用编程式路由导航

通过$router的实例方法实现编程式导航

```vue
<template>
  <div>
      <ul>
          <li v-for="msg in Msgs" :key='msg.id' >
              <router-link :to="`/home/message/detail/${msg.id}`">{{msg.msg}}</router-link>
              <button @click="push(`${msg.id}`)">push</button>
              <button @click="replace(`${msg.id}`)">replace</button>
              </li>
      </ul>
      <router-view/>
  </div>
</template>

<script>
export default {
    data(){
        return {
            Msgs:[]
        }
    },
    mounted(){
        setTimeout(()=>{
            this.Msgs = [
                {id:1,msg:'aaaaa',key:'a'},
                {id:2,msg:'bbbbb',key:'b'},
                {id:3,msg:'ccccc',key:'c'},
            ]
        },1000)
    },
    //通过$router的实例方法实现编程式导航
    methods:{
        push(id){
            this.$router.push('/home/message/detail/'+id)
        },
        replace(id){
             this.$router.replace('/home/message/detail/'+id)
        }
    }

}
</script>
```

#### [命名路由](https://router.vuejs.org/zh/guide/essentials/named-routes.html)

​	有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 `routes` 配置中给某个路由设置名称。

##### 给路由命名

这里把MessageDetail的路由加上name属性

```javascript
{
                path:'message',
                component:Message,
                children:[
                    {
                        name:'detail',
                        path:'detail/:id',
                        component:MessageDetail,

                    }
                ]
            },
```

##### 使用命名路由

###### 声明式导航使用命名路由

```vue
//写成一个对象的形式，name代表路由，params,query代表传递的参数
<router-link :to="{ name: 'detail', params: { id: msg.id }}">{{msg.msg}}</router-link>
```

###### 编程式导航使用命名路由

```javascript
 //同样的传入一个对象，包括路径和参数，路径是name，参数是params或者是query
methods:{
        push(id){
            // this.$router.push('/home/message/detail/'+id)
            this.$router.push({ name: 'detail', params: { id: id }})
        },
        replace(id){
            // this.$router.replace('/home/message/detail/'+id)
            this.$router.replace({ name: 'detail', params: { id: id }})
        }
    }
```



#### 缓存路由组件

组件创建时会从服务器获取数据，如果切换组件，该组件死亡，再次路由到该组件时会再次向服务器发起请求，所以我们需要缓存被切换的组件，让其不要死亡

##### 解决办法



使用`keep-alive`包裹最顶层出口`<router-view>`，可使所有组件缓存下来

```html
<template>
  <div id="show">
  <!-- 目前来说所有的路由视图的渲染都会跳到这个   -->
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  </div>
</template>
```



![](http://47.103.65.182/markdown/015.png)

#### $Router和$Route的区别

**$Router**:包含实现路由跳转的方法

<a href='##### 编程式导航api'>$Router</a>

$Route:包含路由传递的信息

![](https://img2018.cnblogs.com/blog/1288536/201811/1288536-20181115132315183-218072593.png)



#### [路由组件传参](https://router.vuejs.org/zh/guide/essentials/passing-props.html#%E5%B8%83%E5%B0%94%E6%A8%A1%E5%BC%8F)

##### render()

```
new Vue({
  render: h => h(App),
  router,
  components: { App }
}).$mount('#app')


new Vue({
  components:{
  	App
  }
  router,
  components: { App }
}).$mount('#app')
```



#### Vuex

![](https://vuex.vuejs.org/flow.png)





##### Vuex要解决什么问题

当我们的应用遇到**多个组件共享状态**时，单向数据流的简洁性很容易被破坏：

- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态。

对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。

对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

因此，我们为什么不把组件的共享状态抽取出来，以一个全局单例模式管理呢？在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！

通过定义和隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性，我们的代码将会变得更结构化且易维护。

![](https://vuex.vuejs.org/vuex.png)

简单的状态管理应该使用[store](https://cn.vuejs.org/v2/guide/state-management.html#%E7%AE%80%E5%8D%95%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E8%B5%B7%E6%AD%A5%E4%BD%BF%E7%94%A8)



##### 使用vuex

安装包vuex

使用插件Vue.use(Vuex)

###### 创建store

##### store是什么

> 官方说明

每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的**状态 (state)**。Vuex 和单纯的全局对象有以下两点不同：

1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 (commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

> 自己的话

store[API](https://vuex.vuejs.org/zh/api/#vuex-store)

首先是一个构造函数，配置对象是，state，mutation，action，getter ...

 

配置store

```javascript
new Vue({
	store
})
```

##### state

###### API

```
state
类型: Object | Function

Vuex store 实例的根 state 对象。详细介绍

如果你传入返回一个对象的函数，其返回的对象会被用作根 state。这在你想要重用 state 对象，尤其是对于重用 module 来说非常有用。
```

定义状态

```javascript
new Vue.Store({
	state:{
		count:0
	}
	
	state(){
		return Math.random()
	}
})
```

读取状态

```javascript
//直接从$store中读取
$store.state.状态名
//map辅助函数
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练//如果我自己定义了方法，vuex就不会帮我创建新的方法了
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`//会去取名为count的状态值
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数//this要看怎么调用的把
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```
这才是最常用的形式吧
```javascript
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```





##### getter

有时候我们需要从 store 中的 state 中派生出一些状态。

我们可以在Vuex 的 store 中定义“getter”（**可以认为是 store 的计算属性**）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

Getter 接受 state 作为其第一个参数：

###### 定义getter

```javascript
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

###### 访问getter

```javascript
//$store访问
$store.getters.doneTodos
//map辅助函数
import { mapGetters } from 'vuex'

//展开的方法名与getter中的方法同名
export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}

//给getter方法设置别名
mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```



##### mutations

更改 Vuex 的 store 中的状态的**唯一（直接）方法**是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

###### API

```javascript
mutations
类型: { [type: string]: Function }

在 store 上注册 mutation，处理函数总是接受 state 作为第一个参数（如果定义在模块中，则为模块的局部状态），payload 作为第二个参数（可选）。
```



###### 定义mutation

```javascript
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    },
    increment2 (state,n) {
      // 变更状态
      state.count+=n
    },
    increment3 (state,val) {
      // 变更状态
      state.count+=val.n
    }
  }
})
```

###### 使用mutation

```javascript
//通过$store对象
$store.commit('increment')
//可以向设置了载荷的mutation传递参数
$store.commit('increment',20)
//可以使用对象风格的提交方式
$store.commit({
  type: 'increment3',
  n: 10
})

```

```javascript
//map辅助函数
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```



###### 使用常量替代 Mutation 事件类型（简单了解）

```javascript
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
```

```javascript
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

###### Mutation 必须是同步函数

因为mutation是直接操作状态的唯一方法，所以如果是异步的方法将导致状态的混乱

##### actions

```php
  Action 类似于 mutation，不同在于：
  - Action 提交的是 mutation，而不是直接变更状态。
  - Action 可以包含任意异步操作。
```

######  

###### API

```javascript
actions
类型: { [type: string]: Function }

在 store 上注册 action。处理函数总是接受 context 作为第一个参数，payload 作为第二个参数（可选）。

context 对象包含以下属性：

{
  state,      // 等同于 `store.state`，若在模块中则为局部状态
  rootState,  // 等同于 `store.state`，只存在于模块中
  commit,     // 等同于 `store.commit`
  dispatch,   // 等同于 `store.dispatch`
  getters,    // 等同于 `store.getters`
  rootGetters // 等同于 `store.getters`，只存在于模块中
}
同时如果有第二个参数 payload 的话也能够接收。
```



######  声明一个actions

```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

###### 分发action（调用action方法）

```javascript
$store.dispatch('increment')
//与mutation相同，action同样支持以载荷的形式分发，以及以对象的形式分发
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})

//map辅助函数
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```



##### modules

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```javascript
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

###### 模块的局部状态

对于模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**。

```javascript
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

同样，对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`：

```javascript

new Vue.Store({
    state:{
        sss
    }
})

const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

