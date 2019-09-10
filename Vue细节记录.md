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





##### watch属性

包括多个属性监视对象

```
watch:{

	firstName:function(newValue, oldValue){

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

直接加class-"xxx''

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
    //可以有index
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>

<script>
        var example2 = new Vue({
          el: '#example-2',
          data: {
            parentMessage: 'Parent',
            items: [
              { message: 'Foo' },
              { message: 'Bar' }
            ]
          }
        })
</script>
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

双向数据绑定

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
    </div>
    <script>
        //定义过滤器
        Vue.filter('myfileter',function(value){
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



组件

```

```



runtime control





















































































![](https://cn.vuejs.org/images/components.png)





