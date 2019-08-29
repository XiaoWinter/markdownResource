<h1 align='center'>session与cookie</h1>
#### cookie的分类

 > **会话cookie**: 浏览器保存在运行时内存中, 关闭浏览器消失

> **持久化cookie**: 浏览器保存在本地文本中, 关闭浏览器还存在, 但过了有效期自动删除





### 为什么关闭浏览器会话就结束了

```
cookie分为会话cookie和持久化cookie，session存储在会话cookie中所以当浏览器关闭时，内存中cookie对象消失，会话结束
```



### 怎么实现用户免登陆

```
session中保存的信息转而保存到持久化cookie中，然后当用户关闭浏览器后，cookie中的session的信息不会丢失，从而实现用户免登陆
```

