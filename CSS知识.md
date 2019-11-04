## CSS知识

[css调试技巧](https://www.zhihu.com/question/20376053/answer/762829735)

[CSS 将文本固定为多行显示，溢出时显示省略号的实现方式及注意要点](https://blog.csdn.net/zgh0711/article/details/86541139)

#### placeholder如何居中

```less
input{

    &::-ms-input-placeholder{text-align: center;}
    &::-webkit-input-placeholder{text-align: center;}
}
```



#### input的样式如何去除

```css
input{
	 border: none;
     outline: none;
}
```



#### 背景图片如何设置大小

[background-size](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size)

```css
background-size:100%
```



#### [深度选择器](https://www.cnblogs.com/CyLee/p/10006065.html)

在scope的情况下，有可能控制不了第三方组件的样式，所以用深度选择器暴露出

```css
.myclass >>> .disanfangde {
    // ...
}

.myclass /deep/ .disanfangde {
    // ...1111111
```



#### betterscroll小坑

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



#### 横向滚动如何撑开内容区



![](http://47.103.65.182/markdown/030.png)

```less
.topic-box-scroll{//container
    width: 100%;
    display: flex;
    .topic-goods{//ul
    	display: flex;
        li{
            
        }
    }
```



#### 判断是否是移动端的方法

```javascript
if(navigator.userAgent.includes("Android")||navigator.userAgent.includes("iPhone")){
        console.log("移动端");
        this.mobile=true
}
```

#### white-space的用法

![](http://47.103.65.182/markdown/032.png)

