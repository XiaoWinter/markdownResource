# [mbox](https://cn.mobx.js.org/)



@computed 会缓存

@autorun 

@observer `observer` 函数/装饰器可以用来将 React 组件转变成响应式组件。 它用 `mobx.autorun` 包装了组件的 render 函数以确保任何组件渲染中使用的数据变化时都可以强制刷新组件。

@observable

@action



runInAction：等价action,可看作游离action



```js

// mobx配置
configure({

})

class Store {
    //可观测的数据
	@observable count
    @observable price
    @computed get total(){
        return this.count * this.price
    }
    // 绑定this
	@action.bound change(){
		this.count = 1
        this.price = 1
	}
    
    // 异步调用
    @action asyncXxx(){
        //异步action
        1.定义action
        2.调用action
        3.runInAction
        
    }
}

const store = new Store()


runInAction(()=>{
    
})
```
```tsx
//副作用的触发
@computed

//
action('name',()=>{
//	只有count改变才会执行
    console.log(store.count)
})

// 直接执行
runInAction(()=>{
    store.count = 1
})

// 条件执行，只会执行一次
when(():boolean=>{},():void=>{})

// reaction
reaction(()=>{
    return somedata
},(data,reaction)=>{
    
})


```





```tsx
import {observable} from 'mobx'
// user store
class User {
    @observable id 
    @observable name
    @observable age
    @observable male
    
    @action.bound getUser(){
        this.id = ''
        this.name = ''
        this.age = ''
        this.male = ''
    }
    
    @computed mainInfo(){
        return `${this.name}, id ${this.id}, is a ${this.age} years old ${this.male},`
    }
    
    constructor(rootStore){
        this.rootStore = rootStore
    }
    
}
```





```tsx
// 根store
import  User from 'user'
export default class RootStore {
    constructor(){
        this.userStore = new User(this)
    }
}
```



```tsx
import {observer , inject} from 'mobx-react'

// user 组件
@observer //store 连接组件
@inject('userStore')
export default class User extend Component{
    
    constructor(props){
        const {userStore} = this.props
        
        userStore.getUser()
    }
    
    render(){
        const {userStore} = this.props
        return <>
            <h1>{userStore.name}</h1>
            <p>{userStore.info}</p>
            </>
    }
}	
```



```tsx
// 根组件

import {Provider} from 'mobx-react'
import RootStore from 'RootStore'
// 全局注入RootStore
ReactDOM.render(<Provider {...new RootStore()}><App/></Provider>,rootEle)
```

