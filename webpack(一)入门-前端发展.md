# webpack

## 前端发展

### 模块化

分解复杂系统

#### CommonJS

 [CommonJS](http://www.commonjs.org/) 是一种使用广泛的 JavaScript 模块化规范，核心思想是通过 `require` 方法来同步地加载依赖的其他模块，通过 `module.exports` 导出需要暴露的接口。 

 CommonJS 规范的流行得益于 Node.js 采用了这种方式，后来这种方式被引入到了网页开发中。 

```js
// 导入
const moduleA = require('./moduleA');

// 导出
module.exports = moduleA.someFunc;
```

#### AMD

#### ES6 模块化

 ES6 模块化是欧洲计算机制造联合会 ECMA 提出的 JavaScript 模块化规范，它在语言的层面上实现了模块化。浏览器厂商和 Node.js 都宣布要原生支持该规范。它将逐渐取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。 

```js
// 导入
import { readFile } from 'fs';
import React from 'react';
// 导出
export function hello() {};
export default {
  // ...
};
```

#### 样式文件中的模块化

 除了 JavaScript 开始模块化改造，前端开发里的样式文件也支持模块化。 以 SCSS 为例，把一些常用的样式片段放进一个通用的文件里，再在另一个文件里通过 `@import` 语句去导入和使用这些样式片段。 

```scss
// util.scss 文件

// 定义样式片段
@mixin center {
  // 水平竖直居中
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
```

```scss
// main.scss 文件

// 导入和使用 util.scss 中定义的样式片段
@import "util";
#box{
  @include center;
}
```

### 新框架

 在 Web 应用变得庞大复杂时，采用直接操作 DOM 的方式去开发将会使代码变得复杂和难以维护， 许多新思想被引入到网页开发中以减少开发难度、提升开发效率。 

#### React

 [React](https://facebook.github.io/react/) 框架引入 JSX 语法到 JavaScript 语言层面中，以更灵活地控制视图的渲染逻辑。 

```jsx
let has = true;
render(has ? <h1>hello,react</h1> : <div>404</div>);
```

#### Vue

 [Vue](https://vuejs.org/) 框架把一个组件相关的 HTML 模版、JavaScript 逻辑代码、CSS 样式代码都写在一个文件里，这非常直观。 

```html
<!--HTML 模版-->
<template>
  <div class="example">{{ msg }}</div>
</template>

<!--JavaScript 组件逻辑--> 
<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<!--CSS 样式-->
<style>
.example {
  font-weight: bold;
}
</style>
```

#### Angular2

 [Angular2](https://angular.io/) 推崇采用 TypeScript 语言去开发应用，并且可以通过注解的语法描述组件的各种属性。 

```typescript
@Component({
  selector: 'my-app',
  template: `<h1>{{title}}</h1>`
})
export class AppComponent {
  title = 'Tour of Heroes';
}
```

### 新语言

 JavaScript 最初被设计用于完成一些简单的工作，在用它开发大型应用时一些语言缺陷会暴露出来。 CSS 只能用静态的语法描述元素的样式，无法像写 JavaScript 那样增加逻辑判断与共享变量。 为了解决这些问题，许多新语言诞生了。 

#### ES6

 ECMAScript 6.0（简称 ES6）是 JavaScript 语言的下一代标准。它在语言层面为 JavaScript 引入了很多新语法和 API ，使得 JavaScript 语言可以用来编写复杂的大型应用程序。例如： 

- 规范模块化；
- Class 语法；
- 用 `let` 声明代码块内有效的变量 ，用 `const` 声明常量；
- 箭头函数；
- async 函数；
- Set 和 Map 数据结构。
- Promise(axios)
- Proxy(vue3)

#### TypeScript

 [TypeScript](https://www.typescriptlang.org/) 是 JavaScript 的一个超集，由 Microsoft 开发并开源，除了支持 ES6 的所有功能，还提供了静态类型检查。采用 TypeScript 编写的代码可以被编译成符合 ES5、ES6 标准的 JavaScript。 将 TypeScript 用于开发大型项目时，其优点才能体现出来，因为大型项目由多个模块组合而成，不同模块可能又由不同人编写，在对接不同模块时静态类型检查会在编译阶段找出可能存在的问题。 TypeScript 的缺点在于语法相对于 JavaScript 更加啰嗦，并且无法直接运行在浏览器或 Node.js 环境下。 

```typescript
// 静态类型检查机制会检查传给 hello 函数的数据类型
function hello(content: string) {
  return `Hello, ${content}`;
}
let content = 'word';
hello(content);
```

#### Flow

 [Flow](https://flow.org/) 也是 JavaScript 的一个超集，它的主要特点是为 JavaScript 提供静态类型检查，和 TypeScript 相似但更灵活，可以让你只在需要的地方加上类型检查。 

#### SCSS

 [SCSS](http://sass-lang.com/) 可以让你用程序员的方式写 CSS。它是一种 CSS 预处理器，基本思想是用和 CSS 相似的编程语言写完后再编译成正常的 CSS 文件。 

```scss
$blue: #1875e7;　
div {
  color: $blue;
}
```

 采用 SCSS 去写 CSS 的好处在于可以方便地管理代码，抽离公共的部分，通过逻辑写出更灵活的代码。 和 SCSS 类似的 CSS 预处理器还有 [LESS](http://lesscss.org/) 等。 

---



 使用新语言可以提升编码效率，但是必须把源代码转换成可以直接在浏览器环境下运行的代码。 

## 常见的构建工具及对比

 在阅读完上一节 [1-1前端的发展](https://webpack.wuhaolin.cn/1入门/1-1前端的发展.html) 后你一定会感叹前端技术发展之快，各种可以提高开发效率的新思想和框架被发明。但是这些东西都有一个共同点：源代码无法直接运行，必须通过转换后才可以正常运行。 

 构建就是做这件事情，把源代码转换成发布到线上的可执行 JavaScrip、CSS、HTML 代码，包括如下内容。 

* 代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。 

*  文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。 

*  代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。 
*  模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。 
*  自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。 
*  代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过 。
*  自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。 

 构建其实是工程化、自动化思想在前端开发中的体现，把一系列流程用代码去实现，让代码自动化地执行这一系列复杂的流程。 构建给前端开发注入了更大的活力，解放了我们的生产力。 

 历史上先后出现一系列构建工具，它们各有其优缺点。由于前端工程师很熟悉 JavaScript ，Node.js 又可以胜任所有构建需求，所以大多数构建工具都是用 Node.js 开发的。下面来一一介绍它们。 

### Npm Script

 [Npm Script](https://docs.npmjs.com/misc/scripts) 是一个任务执行者。Npm 是在安装 Node.js 时附带的包管理器，Npm Script 则是 Npm 内置的一个功能，允许在 `package.json` 文件里面使用 `scripts` 字段定义任务： 

```json
{
  "scripts": {
    "dev": "node dev.js",
    "pub": "node build.js"
  }
}
```

 里面的 `scripts` 字段是一个对象，每个属性对应一段 Shell 脚本，以上代码定义了两个任务 `dev` 和 `pub`。 其底层实现原理是通过调用 Shell 去运行脚本命令，例如执行 `npm run pub` 命令等同于执行命令 `node build.js`。 

 Npm Script的优点是内置，无须安装其他依赖。其缺点是功能太简单，虽然提供了 `pre` 和 `post` 两个钩子，但不能方便地管理多个任务之间的依赖。 

### Grunt

 [Grunt](https://gruntjs.com/) 和 Npm Script 类似，也是一个任务执行者。Grunt 有大量现成的插件封装了常见的任务，也能管理任务之间的依赖关系，自动化执行依赖的任务，每个任务的具体执行代码和依赖关系写在配置文件 `Gruntfile.js` 里，例如： 

```js
module.exports = function(grunt) {
  // 所有插件的配置信息
  grunt.initConfig({
    // uglify 插件的配置信息
    uglify: {
      app_task: {
        files: {
          'build/app.min.js': ['lib/index.js', 'lib/test.js']
        }
      }
    },
    // watch 插件的配置信息
    watch: {
      another: {
          files: ['lib/*.js'],
      }
    }
  });

  // 告诉 grunt 我们将使用这些插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 告诉grunt当我们在终端中启动 grunt 时需要执行哪些任务
  grunt.registerTask('dev', ['uglify','watch']);
};
```

在项目根目录下执行命令 `grunt dev` 就会启动 JavaScript 文件压缩和自动刷新功能。

Grunt的优点是：

- 灵活，它只负责执行你定义的任务；
- 大量的可复用插件封装好了常见的构建任务。

Grunt的缺点是集成度不高，要写很多配置后才可以用，无法做到开箱即用。

Grunt 相当于进化版的 Npm Script，它的诞生其实是为了弥补 Npm Script 的不足。

### Gulp

 [Gulp](http://gulpjs.com/) 是一个基于流的自动化构建工具。 除了可以管理和执行任务，还支持监听文件、读写文件。Gulp 被设计得非常简单，只通过下面5个方法就可以胜任几乎所有构建场景： 

- 通过 `gulp.task` 注册一个任务；
- 通过 `gulp.run` 执行任务；
- 通过 `gulp.watch` 监听文件变化；
- 通过 `gulp.src` 读取文件；
- 通过 `gulp.dest` 写文件。

 Gulp 的最大特点是引入了流的概念，同时提供了一系列常用的插件去处理流，流可以在插件之间传递，大致使用如下： 

```js
// 引入 Gulp
var gulp = require('gulp'); 
// 引入插件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// 编译 SCSS 任务
gulp.task('sass', function() {
  // 读取文件通过管道喂给插件
  gulp.src('./scss/*.scss')
    // SCSS 插件把 scss 文件编译成 CSS 文件
    .pipe(sass())
    // 输出文件
    .pipe(gulp.dest('./css'));
});

// 合并压缩 JS
gulp.task('scripts', function() {
  gulp.src('./js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

// 监听文件变化
gulp.task('watch', function(){
  // 当 scss 文件被编辑时执行 SCSS 任务
  gulp.watch('./scss/*.scss', ['sass']);
  gulp.watch('./js/*.js', ['scripts']);    
});
```

Gulp 的优点是好用又不失灵活，既可以单独完成构建也可以和其它工具搭配使用。其缺点是和 Grunt 类似，集成度不高，要写很多配置后才可以用，无法做到开箱即用。

可以将Gulp 看作 Grunt 的加强版。相对于 Grunt，Gulp增加了监听文件、读写文件、流式处理的功能。

### Fis3

 [Fis3](https://fex.baidu.com/fis3/) 是一个来自百度的优秀国产构建工具。相对于 Grunt、Gulp 这些只提供基本功能的工具，Fis3 集成了 Web 开发中的常用构建功能，如下所述。 

- 读写文件：通过 `fis.match` 读文件，`release` 配置文件输出路径。
- 资源定位：解析文件之间的依赖关系和文件位置。
- 文件指纹：通过 `useHash` 配置输出文件时给文件 URL 加上 md5 戳来优化浏览器缓存。
- 文件编译：通过 `parser` 配置文件解析器做文件转换，例如把 ES6 编译成 ES5。
- 压缩资源：通过 `optimizer` 配置代码压缩方法。
- 图片合并：通过 `spriter` 配置合并 CSS 里导入的图片到一个文件来减少 HTTP 请求数。

 大致使用如下： 

```js
// 加 md5
fis.match('*.{js,css,png}', {
  useHash: true
});

// fis3-parser-typescript 插件把 TypeScript 文件转换成 JavaScript 文件
fis.match('*.ts', {
  parser: fis.plugin('typescript')
});

// 对 CSS 进行雪碧图合并
fis.match('*.css', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true
});

// 压缩 JavaScript
fis.match('*.js', {
  optimizer: fis.plugin('uglify-js')
});

// 压缩 CSS
fis.match('*.css', {
  optimizer: fis.plugin('clean-css')
});

// 压缩图片
fis.match('*.png', {
  optimizer: fis.plugin('png-compressor')
});
```

可以看出 Fis3 很强大，内置了许多功能，无须做太多配置就能完成大量工作。

Fis3的优点是集成了各种 Web 开发所需的构建功能，配置简单开箱即用。其缺点是目前官方已经不再更新和维护，不支持最新版本的 Node.js。

Fis3 是一种专注于 Web 开发的完整解决方案，如果将 Grunt、Gulp 比作汽车的发动机，则可以将Fis3 比作一辆完整的汽车。

### Webpack

 [Webpack](https://webpack.js.org/) 是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。Webpack 专注于构建模块化项目。 

 其官网的首页图很形象的画出了 Webpack 是什么，如下： 

<img src="https://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/img/1-2webpack.png"/>

 一切文件：JavaScript、CSS、SCSS、图片、模板，在 Webpack 眼中都是一个个模块，这样的好处是能清晰的描述出各个模块之间的依赖关系，以方便 Webpack 对模块进行组合和打包。 经过 Webpack 的处理，最终会输出浏览器能使用的静态资源。 

 Webpack 具有很大的灵活性，能配置如何处理文件，大致使用如下： 

```js
module.exports = {
  // 所有模块的入口，Webpack 从入口开始递归解析出所有依赖的模块
  entry: './app.js',
  output: {
    // 把入口所依赖的所有模块打包成一个文件 bundle.js 输出 
    filename: 'bundle.js'
  }
}
```

Webpack的优点是：

- 专注于处理模块化的项目，能做到开箱即用一步到位；
- 通过 Plugin 扩展，完整好用又不失灵活；
- 使用场景不仅限于 Web 开发；
- 社区庞大活跃，经常引入紧跟时代发展的新特性，能为大多数场景找到已有的开源扩展；
- 良好的开发体验。

Webpack的缺点是只能用于采用模块化开发的项目。

### Rollup

[Rollup](https://rollupjs.org/) 是一个和 Webpack 很类似但专注于 ES6 的模块打包工具。 Rollup 的亮点在于能针对 ES6 源码进行 Tree Shaking 以去除那些已被定义但没被使用的代码，以及 Scope Hoisting 以减小输出文件大小提升运行性能。 然而 Rollup 的这些亮点随后就被 Webpack 模仿和实现。 由于 Rollup 的使用和 Webpack 差不多，这里就不详细介绍如何使用了，而是详细说明它们的差别：

- Rollup 是在 Webpack 流行后出现的替代品；
- Rollup 生态链还不完善，体验不如 Webpack；
- Rollup 功能不如 Webpack 完善，但其配置和使用更加简单；
- Rollup 不支持 Code Spliting，但好处是打包出来的代码中没有 Webpack 那段模块的加载、执行和缓存的代码。

Rollup 在用于打包 JavaScript 库时比 Webpack 更加有优势，因为其打包出来的代码更小更快。 但功能不够完善，很多场景都找不到现成的解决方案。

---

## 为什么选择 Webpack

上面介绍的构建工具是按照它们诞生的时间排序的，它们是时代的产物，侧面反映出 Web 开发的发展趋势如下：

1. 在 Npm Script 和 Grunt 时代，Web 开发要做的事情变多，流程复杂，自动化思想被引入，用于简化流程；
2. 在 Gulp 时代开始出现一些新语言用于提高开发效率，流式处理思想的出现是为了简化文件转换的流程，例如将 ES6 转换成 ES5。
3. 在 Webpack 时代由于单页应用的流行，一个网页的功能和实现代码变得庞大，Web 开发向模块化改进。

这些构建工具都有各自的定位和专注点，它们之间既可以单独地完成任务，也可以相互搭配起来弥补各自的不足。 在了解这些常见的构建工具后，你需要根据自己的需求去判断应该如何选择和搭配它们才能更好地完成自己的需求。

经过多年的发展， Webpack 已经成为构建工具中的首选，这是有原因的：

- 大多数团队在开发新项目时会采用紧跟时代的技术，这些技术几乎都会采用“模块化+新语言+新框架”，Webpack 可以为这些新项目提供一站式的解决方案；
- Webpack 有良好的生态链和维护团队，能提供良好的开发体验和保证质量；
- Webpack 被全世界的大量 Web 开发者使用和验证，能找到各个层面所需的教程和经验分享。

下面开始跨入 Webpack 的大门吧！

