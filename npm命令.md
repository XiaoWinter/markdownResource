## npm命令

##### 安装cnpm(不必了，可直接使用下面的)

`npm install -g cnpm --registry=https://registry.npm.taobao.org`

##### 使用cnpm

`npm config set registry https://registry.npm.taobao.org`

##### 切换到npm

`npm config set registry https://registry.npmjs.org/`

##### 初始化一个项目

`npm init`

`npm init -y`

##### 查看包的所有版本

`npm view webpack versions`

##### 本地安装依赖

`npm install webpack@3.11.0 --sava-dev`

##### 查看命令行程序安装位置

`npm root -g`





<table>
<thead>
<tr>
  <th>命令</th>
  <th>解释</th>
</tr>
</thead>
<tbody><tr>
  <td>npm init</td>
  <td>在项目中引导创建一个package.json文件</td>
</tr>
<tr>
  <td>npm install</td>
  <td>安装模块</td>
</tr>
<tr>
  <td>npm uninstall</td>
  <td>卸载模块</td>
</tr>
<tr>
  <td>npm update</td>
  <td>更新模块</td>
</tr>
<tr>
  <td>npm outdated</td>
  <td>检查模块是否已经过时</td>
</tr>
<tr>
  <td>npm remove</td>
  <td>移除</td>
</tr>
<tr>
  <td>npm root</td>
  <td>查看当前包的安装路径</td>
</tr>
<tr>
  <td>npm root -g</td>
  <td>查看全局模块的安装目录</td>
</tr>
<tr>
  <td>npm help</td>
  <td>查看npm帮助</td>
</tr>
<tr>
  <td>npm list</td>
  <td>当前目录已安装插件</td>
</tr>
<tr>
  <td>npm config</td>
  <td>管理npm的配置路径</td>
</tr>
<tr>
  <td>npm cache</td>
  <td>管理模块的缓存</td>
</tr>
<tr>
  <td>npm start</td>
  <td>启动模块</td>
</tr>
<tr>
  <td>npm stop</td>
  <td>停止模块</td>
</tr>
<tr>
  <td>npm restart</td>
  <td>重新启动模块</td>
</tr>
<tr>
  <td>npm test</td>
  <td>测试模块</td>
</tr>
<tr>
  <td>npm version</td>
  <td>查看模块版本</td>
</tr>
<tr>
  <td>npm view</td>
  <td>查看模块的注册信息</td>
</tr>
<tr>
  <td>npm publish</td>
  <td>发布模块</td>
</tr>
<tr>
  <td>npm access</td>
  <td>在发布的包上设置访问级别</td>
</tr>
</tbody></table>

##### npm ERR! Unexpected end of JSON input while parsing near" "

`npm cache clean --force`

<img src='http://47.103.65.182/images/DOAX-VenuVacation_190416_225803.jpg' />

<table>
<thead>
<tr>
  <th>关键字</th>
  <th>解释</th>
</tr>
</thead>
<tbody><tr>
  <td>name</td>
  <td>包名</td>
</tr>
<tr>
  <td>version</td>
  <td>包的版本号</td>
</tr>
<tr>
  <td>description</td>
  <td>包的描述</td>
</tr>
<tr>
  <td>homepage</td>
  <td>包的官网 url</td>
</tr>
<tr>
  <td>author</td>
  <td>包的作者姓名</td>
</tr>
<tr>
  <td>contributors</td>
  <td>包的其他贡献者姓名</td>
</tr>
<tr>
  <td>dependencies</td>
  <td>依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下</td>
</tr>
<tr>
  <td>repository</td>
  <td>包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上</td>
</tr>
<tr>
  <td>main</td>
  <td>main 字段是一个模块ID，它是一个指向你程序的主要项目。就是说，如果你包的名字叫 express，然后用户安装它，然后require(“express”)</td>
</tr>
<tr>
  <td>keywords</td>
  <td>关键字</td>
</tr>
</tbody></table>



#### 配置package.json脚本

<img src="https://upload-images.jianshu.io/upload_images/5743293-cf15a8abbbf0524d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/842/format/webp"/>

## npx

```
npx 的原理很简单，就是运行的时候，会到`node_modules/.bin`路径和环境变量`$PATH`里面，检查命令是否存在。
```

```
npx 想要解决的主要问题，就是调用项目内部安装的模块。
```



