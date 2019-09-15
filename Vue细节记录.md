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

