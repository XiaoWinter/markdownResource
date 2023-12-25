# [开发平台文档](https://open.hand-china.com/document-center/doc/product/10081/10610?doc_id=169433&doc_code=26364)

![image-20220221093831494](https://typora-huang-cong.oss-cn-shanghai.aliyuncs.com/image-20220221093831494.png)

![image-20220221093904121](https://typora-huang-cong.oss-cn-shanghai.aliyuncs.com/image-20220221093904121.png)

## 整体架构

![image-20220210154022907](https://typora-huang-cong.oss-cn-shanghai.aliyuncs.com/image-20220210154022907.png)



## 订单流程

![image-20220210154039758](https://typora-huang-cong.oss-cn-shanghai.aliyuncs.com/image-20220210154039758.png)

## [宏定义配置](https://open.hand-china.com/document-center/doc/product/10081/10610?doc_id=169215&doc_code=19013#%E5%AE%8F%E5%AE%9A%E4%B9%89%E9%85%8D%E7%BD%AE)

### 基本概念

#### 对象

对象：目前系统预设对象14个。

#### 函数

1.聚合函数：单据多对一，作为一个或多个事务提交操作，失败则整个都失败；不可以作为主函数，如批量调度函数
2.单个函数：单据一对一提交操作
3.主函数：执行结果可以反馈给前端的函数，只有一个主函数
4.通用函数：函数定义{对象}=通用，不区分使用单据对象，如事务开启&关闭、获取变量函数、IF函数，详见宏特性清单
5.函数参数符号：

* #{当前对象属性名称}
* ${动态参数名称}（一般用于和获取变量函数组合使用）
* &{前端传参}



### 宏执行校验

宏执行校验：执行时先执行校验，只有校验通过后才会执行宏后续相关动作。



* SQL校验：SQL输出结果集不为空（即TRUE）则校验通过。

* 表达式校验：满足表达式校验即为校验通过。

* 存在多个校验的情况，多个校验同时通过才算通过。

* 提示语言支持多语言，在宏维护界面的执行校验的提示文本中输入对应的返回消息管理即可实现。

  

### 出入参数

出入参数：已维护的函数的所有入参、出参拼接，参数类型：整数 Long、小数 Double、文本 String、日期（时间）Date。参数为当前对象的函数对应的参数集合，遇到同名参数即合并。宏内部对象跳转后的函数参数不显示。
d)

### 导出配置

导出配置：用于将设置好的宏配置导出到外部文件

### 导入配置

导入配置：将外部文件导入系统，入ID一致，则视为更新。

## 注意事项

### 宏执行结果分三类：失败、成功、异常。

* 成功：
  1.有聚合函数：无阻断异常，聚合函数标记为{成功}
  2.无聚合函数有主函数：无阻断异常，主函数标记为{成功}
  3.无聚合和主函数：无阻断异常
* 失败：
  1.有聚合函数：无阻断异常，聚合函数标记为{失败}
  2.无聚合函数有主函数：无阻断异常，主函数标记为{失败}
  3.无主函数：不记结果
* 异常：有阻断异常：函数内部校验失败、通用函数Raise exception 抛出异常 、代码级报错/宏配置错误导致执行问题





## [创建工程](https://open.hand-china.com/document-center/video-center/=rkVu-VZS9YaXKBOLcRqC-g===?lineId==tROkoHW5YX7G_bmmdsWjaQOX4kEHtwC5gOj13s07_qs==&productId==UaKBg1SL9Me1eGYx_jIRRQOX4kEHtwC5gOj13s07_qs==)

### 安装脚手架

```
安装 hzero-cli
```

### 创建工程

```
hzero new project_name
```

### 查看脚手架

```
hzero-cli info
```

### 子模块配置列表

hzerorc.js 子模块配置->package->node_module=>编译至dist



### 创建子模块

创建出的子模块名称会以父工程名称为前缀

```
npx hzero-cli g sub-module  sub_moudle_name
```

### 创建react页面

```
hzero-cli g simple-page page-name(页面名必须是小写加中划线，会生成驼峰页面)
```

### 创建vue页面

```
hzero-cli g vpage page-name
```

```
hzero-cli g -h
```

### 编译子模块

```
yarn run build:ms
```



子模块配置文件 microConfig

API_HOST 配置在 .env.yml文件



### 编译

#### 全量编译

```
yarn run build
```

#### 增量编译

```
yarn run build:ms sub-module-name
```



### dist测试

```
serve -s dist
```



## [DataSet](https://open.hand-china.com/document-center/video-center/=rkVu-VZS9YaXKBOLcRqC-g===?lineId==tROkoHW5YX7G_bmmdsWjaQOX4kEHtwC5gOj13s07_qs==&productId==UaKBg1SL9Me1eGYx_jIRRQOX4kEHtwC5gOj13s07_qs==)

[猪齿鱼文档](https://open-hand.gitee.io/choerodon-ui/zh/procmp/dataset/dataset/)

关键属性

### field字段

### record记录

![image-20220211110746291](https://typora-huang-cong.oss-cn-shanghai.aliyuncs.com/image-20220211110746291.png)



### 与后端相关的属性

primaryKey

name

### [抽象组件](https://open-hand.gitee.io/choerodon-ui/zh/procmp/abstract/ViewComponent)

##  [菜单](https://open.hand-china.com/document-center/video-center/=rkVu-VZS9YaXKBOLcRqC-g===?lineId==tROkoHW5YX7G_bmmdsWjaQOX4kEHtwC5gOj13s07_qs==&productId==UaKBg1SL9Me1eGYx_jIRRQOX4kEHtwC5gOj13s07_qs==)

![image-20220211111944363](https://typora-huang-cong.oss-cn-shanghai.aliyuncs.com/image-20220211111944363.png)



### [值集](https://open.hand-china.com/document-center/video-center/=g6KF8MagwABmDjTE0vgxRA===?lineId==scs5NxPLpHgJgrJ3ZgWwmyJJrhkbr6PkmJnfGkIhrFY==&productId==5D56H1jaOJ7F5-c36t3ZniJJrhkbr6PkmJnfGkIhrFY==)

#### 独立值集

#### 自定义sql值集

#### url值集

#### 值集视图

## [路由传参](https://open.hand-china.com/document-center/video-center/=g6KF8MagwABmDjTE0vgxRA===?lineId==scs5NxPLpHgJgrJ3ZgWwmyJJrhkbr6PkmJnfGkIhrFY==&productId==5D56H1jaOJ7F5-c36t3ZniJJrhkbr6PkmJnfGkIhrFY==)

打开调试

![image-20220211162540886](https://typora-huang-cong.oss-cn-shanghai.aliyuncs.com/image-20220211162540886.png)

```js
const {dispatch} = this.props
const pathname = '/xxx/xxx/xxx/123
dispatch(
	routerRedux({
		pathname,
        search:'?a=1&b=2
    })
);
const param =
this.props.match.params.taskParam

const queryParam = this.props.location.search
const paramsParse = new URLSearchParams(queryParam)
const a = paramsParse.get('a')
const b = paramsParse.get('b')

// 这样就把数据注入到当前页面组件的props中了
@connect(
 // state是所有dva存储的数据
(state)=>{
    return state.xxx
}
)
class Detail extends Component{

}

```

## jenkins



### 安装docker



### 创建jenkins-home



### docker安装Jenkins



### 初始化Jenkins

初始化密码

### 配置node插件

管理->可用插件->安装

### 查看全局工具配置



### 新建任务

provide node to PATH

自由风格



### 安装nginx

创建数据持久化文件夹和配置保存文件夹

docker运行nginx镜像



### 配置jenkins持续集成

设置source code management

### 添加构建脚本



### 执行构建及发包部署

插件publish Over SSH



SKIP_NO_CHANGE_MODULE
