<h1 align='center'>虚拟DOM的key问题</h1>









#### \<li> 使用index作为key的问题



| key(index) |    数据     | 虚拟DOM | 真实DOM | 输入框值 |
| :--------: | :---------: | :-----: | :-----: | :------: |
|     0      | {name:tom}  |  0<li>  |  <li>   |    a     |
|     1      | {name:jack} |  1<li>  |  <li>   |          |


    当React删除第一个li时，jack的key变为了0，此时React会去内部的虚拟dom中寻找key为0的虚拟dom然后复用此DOM，更新此虚拟dom对应的真实dom,而0对应的真实的dom的是那个带a的li,因此React复用此li并且将数据更新，而其余部分不变
      	
      	原本：两个li,以index作为key
       [
        0--{name: tom}   0<li>   <li>   a
        1--{name: Jack}  1<li>   <li>
      ]
      
      删除一个li：虚拟dom中有key为0的li,所以React会复用key为0的虚拟dom，并更新变化的数据，而其余部分不变
      [
            0--{name: Jack}  0<li>  <li>  a
       ]




```
         面试题:
      1). react/vue中的key的作用/内部原理
      2). 为什么列表的key尽量不要用index
      
      我们来简单的了解一下react的diff算法策略，我们都知道，react为了提升渲染性能，在内部维持了一个虚拟dom，当渲染结构有所变化的时候，会在虚拟dom中先用diff算法先进行一次对比，将所有的差异化解决之后，再一次性根据虚拟dom的变化，渲染到真实的dom结构中。
      
   1. 虚拟DOM的key的作用?
      1). 简单的说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用
      2). 详细的说: 当列表数组中的数据发生变化生成新的虚拟DOM后, React进行新旧虚拟DOM的diff比较
          a. key没有变
              item数据没变, 直接使用原来的真实DOM
              item数据变了, 对原来的真实DOM进行数据更新
          b. key变了
              销毁原来的真实DOM, 根据item数据创建新的真实DOM显示(即使item数据没有变)
              
   2. key为index的问题
      1). 添加/删除/排序 => 产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低（会更新数据）
      2). 如果item界面还有输入框 => 产生错误的真实DOM更新 ==> 界面有问题（输入框不会更新）
      注意: 如果不存在添加/删除/排序操作, 用index没有问题
   3. 解决:
      使用item数据的标识数据作为key, 比如id属性值
   
```