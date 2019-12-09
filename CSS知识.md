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

### 不换行

```
强制不换行 a{ white-space:nowrap; }

再补充说明所有关于换行的CSS样式：

white-space: normal|pre|nowrap|pre-wrap|pre-line|inherit; 

white-space 属性设置如何处理元素内的空白 

normal 默认。空白会被浏览器忽略。 

pre 空白会被浏览器保留。其行为方式类似 HTML 中的 pre 标签。 

nowrap 文本不会换行，文本会在在同一行上继续，直到遇到 br 标签为止。 

pre-wrap 保留空白符序列，但是正常地进行换行。 

pre-line 合并空白符序列，但是保留换行符。 

inherit 规定应该从父元素继承 white-space 属性的值。

word-wrap: normal|break-word; 

word-wrap 属性用来标明是否允许浏览器在单词内进行断句，这是为了防止当一个字符串太长而找不到它的自然断句点时产生溢出现象。 

normal: 只在允许的断字点换行(浏览器保持默认处理) 

break-word:在长单词或URL地址内部进行换行 

word-break: normal|break-all|keep-all;

word-break 属性用来标明怎么样进行单词内的断句。 

normal：使用浏览器默认的换行规则。

break-all:允许再单词内换行 

keep-all:只能在半角空格或连字符处换行
```

禁止元素被选中

```
div {
   -moz-user-select: -moz-none;
   -khtml-user-select: none;
   -webkit-user-select: none;
   -ms-user-select: none;
   user-select: none;
}
```

