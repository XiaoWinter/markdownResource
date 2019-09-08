<h1 align='center'>react组件的生命周期</h1>
react类组件的生命周期（函数组件没有状态，也没有生命周期）

1.组件从创建到销毁会经历三个时期，初始化时期、运行时期、销毁时期

2.在组件经历的每个生命时期，都会调用相应的回调函数

3.在自定义组件时，我们可以重写这些生命周期函数，让组件在调用生命周期函数时，执行我们需要的业务逻辑

4.这种由程序自动调用，并且让我们可以重写的函数叫做钩子

##### 前提

###### 组件生命周期流程图

Mount ：挂载

![1566525513332](.\reactImg\1566525513332.png)



##### 组件的三个生命周期状态

```
 * Mount：插入真实 DOM
 * Update：被重新渲染
 * Unmount：被移出真实 DOM
```



##### 组件的生命周期流程

```
初始化
a.第一次初始化渲染显示: ReactDOM.render()
      * constructor(): 创建对象初始化state
      * componentWillMount() : 将要插入回调
      * render() : 用于插入虚拟DOM回调
      * componentDidMount() : 已经插入回调

运行时
b.每次更新state: this.setState()
      * componentWillUpdate() : 将要更新回调
      * render() : 更新(重新渲染)
      * componentDidUpdate() : 已经更新回调
b2.父组件解析,render(),prop改变
	  * componendWillReceiveProps(new=xtProps)
b3.state改变，性能优化点
	  * shouldComponendUpdate(nextProps , nextState)  

结束
c.移除组件: ReactDOM.unmountComponentAtNode(containerDom)
      * componentWillUnmount() : 组件将要被移除回调
      
```