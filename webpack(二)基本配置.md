# webpack

## [配置](https://www.webpackjs.com/configuration/)



```js
const path = require("path")
const webpack = require("webpack")
const clearDir =  require("./plugin/cleanDir")
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    mode:"development",
    context: path.join(__dirname, 'src'),
    entry:{
        app:path.resolve(__dirname,"src/app.js"),
        vendors:path.resolve(__dirname,"src/vendors.js")
    },
    output:{
        filename: '[name].js',
        chunkFilename:"[chunkhash:8].js",
        path: __dirname + '/dist',
        pathinfo: true,
        // publicPath:"http://localhost:8080/"

    },
    devtool: 'inline-source-map',
    devServer: {
           contentBase: './dist',
           hot:true
    },
    module: {
        rules: [
            {   test: /\.css$/,
                use:['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192
                    }
                  }
                ]
              }
         
        ]},
    plugins:[
        new clearDir({path:path.resolve(__dirname,"dist")})  ,
        new webpack.BannerPlugin("[file]"),

        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            {from:"index.html",to:"index.html"}
        ]),
    ]
}
```





### context

 默认使用当前目录，但是推荐在配置中传递一个值。这使得你的配置独立于 CWD(current working directory - 当前执行路径)。 

```js
module.exports = {
  context: path.resolve(__dirname, 'app')
}
```

 注意， `context` 必须是一个绝对路径的字符串。 除此之外，还可以通过在启动 Webpack 时带上参数 `webpack --context` 来设置 `context`。 

 之所以在这里先介绍 `context`，是因为 Entry 的路径和其依赖的模块的路径可能采用相对于 `context` 的路径来描述，`context` 会影响到这些相对路径所指向的真实文件。 

### entry

 `string | [string] | object { <key>: string | [string] } | (function: () => string | [string] | object { <key>: string | [string] }) `

 `entry`是配置模块的入口，可抽象成输入，Webpack 执行构建的第一步将从入口开始搜寻及递归解析出所有入口依赖的模块。 

起点或是应用程序的起点入口。从这个起点开始，应用程序启动执行。如果传递一个数组，那么数组的每一项都会执行。

动态加载的模块**不是**入口起点。

简单规则：每个 HTML 页面都有一个入口起点。单页应用(SPA)：一个入口起点，多页应用(MPA)：多个入口起点。

#### 命名

 如果传入一个字符串或字符串数组，chunk 会被命名为 `main`。如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点。 

#### 动态入口

```js
entry: () => './demo'
```

```js
entry: () => new Promise((resolve) => resolve(['./demo', './demo2']))
```

 当结合 [`output.library`](https://www.webpackjs.com/configuration/output#output-library) 选项时：如果传入数组，则只导出最后一项。 

### output

 `output` 配置如何输出最终想要的代码。`output` 是一个 `object`，里面包含一系列配置项，下面分别介绍它们。 

#### path

`string`

output 目录对应一个**绝对路径**。

```js
path: path.resolve(__dirname, 'dist/assets')
```

#### pathinfo

` boolean`

 告诉 webpack 在 bundle 中引入「所包含模块信息」的相关注释。此选项默认值是 `false`，并且**不应该**用于生产环境(production)，但是对阅读开发环境(development)中的生成代码(generated code)极其有用。 

```js
pathinfo: true
```

 注意，这些注释也会被添加至经过 tree shaking 后生成的 bundle 中。 

```js
/*!****************!*\
  !*** ./app.js ***!
  \****************/
  
  /*!**********************!*\
  !*** ./css/test.css ***!
  \**********************/
  //类似这种东西
```



#### publicPath

 `string` `function` 

 对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，output.publicPath 是很重要的选项。如果指定了一个错误的值，则在加载这些资源时会收到 404 错误。 

 该选项的值是以 runtime(运行时) 或 loader(载入时) 所创建的每个 URL 为前缀。因此，在多数情况下，**此选项的值都会以`/`结束**。 



#### filename

 `string` `function` 

 此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 [`output.path`](https://www.webpackjs.com/configuration/output/#output-path) 选项指定的目录下。 

 对于单个[`入口`](https://www.webpackjs.com/configuration/entry-context#entry)起点，filename 会是一个静态名称。 

```js
filename: "bundle.js"
```

然而，当通过多个入口起点(entry point)、代码拆分(code splitting)或各种插件(plugin)创建多个 bundle，应该使用以下一种替换方式，来赋予每个 bundle 一个唯一的名称……

使用入口名称：

```js
filename: "[name].bundle.js"
```

 使用内部 chunk id 

```js
filename: "[id].bundle.js"
```

使用每次构建过程中，唯一的 hash 生成

```js
filename: "[name].[hash].bundle.js"
```

使用基于每个 chunk 内容的 hash：

```js
filename: "[chunkhash].bundle.js"
```

请确保已阅读过[指南 - 缓存](https://www.webpackjs.com/guides/caching)的详细信息。这里涉及更多步骤，不仅仅是设置此选项。

注意此选项被称为文件名，但是你还是可以使用像 `"js/[name]/bundle.js"` 这样的文件夹结构。

 注意，此选项不会影响那些「按需加载 chunk」的输出文件。对于这些文件，请使用 [`output.chunkFilename`](https://www.webpackjs.com/configuration/output/#output-chunkfilename) 选项来控制输出。通过 loader 创建的文件也不受影响。在这种情况下，你必须尝试 loader 特定的可用选项。 

#### chunkFilename

 `string` `function` 

注意，这些文件名需要在 runtime 根据 chunk 发送的请求去生成。因此，需要在 webpack runtime 输出 bundle 值时，将 chunk id 的值对应映射到占位符(如 `[name]` 和 `[chunkhash]`)。这会增加文件大小，并且在任何 chunk 的占位符值修改后，都会使 bundle 失效。

默认使用 `[id].js` 或从 [`output.filename`](https://www.webpackjs.com/configuration/output/#output-filename) 中推断出的值（`[name]` 会被预先替换为 `[id]` 或 `[id].`）。

#### crossOriginLoading

`boolean` `string`


只用于 [`target`](https://www.webpackjs.com/configuration/target) 是 web，使用了通过 script 标签的 JSONP 来按需加载 chunk。

启用 [cross-origin 属性](https://developer.mozilla.org/en/docs/Web/HTML/Element/script#attr-crossorigin) 加载 chunk。以下是可接收的值……

`crossOriginLoading: false` - 禁用跨域加载（默认）

`crossOriginLoading: "anonymous"` - **不带凭据(credential)**启用跨域加载

`crossOriginLoading: "use-credentials"` - **带凭据(credential)**启用跨域加载 **with credentials**

#### libraryTarget 和 library、libraryExport

##### [创建 library](https://www.webpackjs.com/guides/author-libraries/)

 除了打包应用程序代码，webpack 还可以用于打包 JavaScript library。以下指南适用于希望流水线化(streamline)打包策略的 library 作者。 

 假设你正在编写一个名为 `webpack-numbers` 的小的 library，可以将数字 1 到 5 转换为文本表示，反之亦然，例如将 2 转换为 'two'。 项目引用了loadsh

##### 配置

现在，让我们以某种方式打包这个 library，能够实现以下几个目标：

- 不打包 `lodash`，而是使用 `externals` 来 require 用户加载好的 lodash。
- 设置 library 的名称为 `webpack-numbers`.
- 将 library 暴露为一个名为 `webpackNumbers`的变量。
- 能够访问其他 Node.js 中的 library。

此外，用户应该能够通过以下方式访问 library：

- ES2015 模块。例如 `import webpackNumbers from 'webpack-numbers'`。
- CommonJS 模块。例如 `require('webpack-numbers')`.
- 全局变量，当通过 `script` 脚本引入时



```js
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js'
  }
};
```

 现在，如果执行 `webpack`，你会发现创建了一个非常巨大的文件。如果你查看这个文件，会看到 lodash 也被打包到代码中 。

```diff
  var path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js'
-   }
+   },
+   externals: {
+     lodash: {
+       commonjs: 'lodash',
+       commonjs2: 'lodash',
+       amd: 'lodash',
+       root: '_'
+     }
+   }
  };
```

 这意味着你的 library 需要一个名为 `lodash` 的依赖，这个依赖在用户的环境中必须存在且可用。 

##### 外部扩展的限制

对于从一个依赖目录中，调用多个文件的 library：

```js
import A from 'library/one';
import B from 'library/two';

// ...
```

 无法通过在 externals 中指定 `library` 目录的方式，将它们从 bundle 中排除。你需要逐个排除它们，或者使用正则表达式排除。 

```js
externals: [
  'library/one',
  'library/two',
  // Everything that starts with "library/"
  /^library\/.+$/
]
```

##### 暴露 library

 对于用途广泛的 library，我们希望它能够兼容不同的环境，例如 CommonJS，AMD，Node.js 或者作为一个全局变量。为了让你的 library 能够在各种用户环境(consumption)中可用，需要在 `output` 中添加 `library` 属性： 

```diff
  var path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
-     filename: 'webpack-numbers.js'
+     filename: 'webpack-numbers.js',
+     library: 'webpackNumbers'
    },
    externals: {
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
      }
    }
  };
```

##### libraryTarget

` string `

 当你在 import 引入模块时，这可以将你的 library bundle 暴露为名为 `webpackNumbers` 的全局变量。为了让 library 和其他环境兼容，还需要在配置文件中添加 `libraryTarget` 属性。这是可以控制 library 如何以不同方式暴露的选项。 

```diff
  var path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
-     library: 'webpackNumbers'
+     library: 'webpackNumbers',
+     libraryTarget: 'umd'
    },
    externals: {
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
      }
    }
  };
```

可以通过以下方式暴露 library：

- 变量：作为一个全局变量，通过 `script` 标签来访问（`libraryTarget:'var'`）。
- this：通过 `this` 对象访问（`libraryTarget:'this'`）。
- window：通过 `window` 对象访问，在浏览器中（`libraryTarget:'window'`）。
- UMD：在 AMD 或 CommonJS 的 `require` 之后可访问（`libraryTarget:'umd'`）。

#####  libraryExport 

 `string` or `string[]` (since webpack 3.0.0)

`libraryExport: "default"` - The **default export of your entry point** will be assigned to the library target:

```js
// if your entry has a default export of `MyDefaultModule`
var MyDefaultModule = _entry_return_.default;
```

`libraryExport: "MyModule"` - The **specified module** will be assigned to the library target:

```js
var MyModule = _entry_return_.MyModule;
```

`libraryExport: ["MyModule", "MySubModule"]` - The array is interpreted as a **path to a module** to be assigned to the library target:

```js
var MySubModule = _entry_return_.MyModule.MySubModule;
```

With the `libraryExport` configurations specified above, the resulting libraries could be utilized as such:

```js
MyDefaultModule.doSomething();
MyModule.doSomething();
MySubModule.doSomething();
```

### Module

`module` 配置如何处理模块。

#### module.noParse

`RegExp | [RegExp]`

`RegExp | [RegExp] | function`（从 webpack 3.0.0 开始）

防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中**不应该含有** `import`, `require`, `define` 的调用，或任何其他导入机制。忽略大型的 library 可以提高构建性能。

```js
noParse: /jquery|lodash/

// 从 webpack 3.0.0 开始
noParse: function(content) {
  return /jquery|lodash/.test(content);
}
```

###### 举例

 1.我们一般引用jquery，可以如下引用： 

```js
import jq from 'jquery'
```

 2.对于上面的解析规则 

 当解析jq的时候，会去解析jq这个库是否有依赖其他的包 

3.我们对类似jq这类依赖库，一般会认为不会引用其他的包(特殊除外,自行判断)。所以，对于这类不引用其他的包的库，我们在打包的时候就没有必要去解析，这样能够增加打包速率。 

4. 所以，可以在webpack的配置中增加noParse属性（以下代码只需要看module的noParse属性） 

#### 

#### module.rules(配置 Loader)

##### Rule（规则）

###### rules是一个rule的数组

 A Rule can be separated into three parts — Conditions, Results and nested Rules. 



```js
module: {
  rules: [
    {
      // 命中 JavaScript 文件
      test: /\.js$/,
      // 用 babel-loader 转换 JavaScript 文件
      // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
      use: ['babel-loader?cacheDirectory'],
      // 只命中src目录里的js文件，加快 Webpack 搜索速度
      include: path.resolve(__dirname, 'src')
    },
    {
      // 命中 SCSS 文件
      test: /\.scss$/,
      // 使用一组 Loader 去处理 SCSS 文件。
      // 处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader。
      use: ['style-loader', 'css-loader', 'sass-loader'],
      // 排除 node_modules 目录下的文件
      exclude: path.resolve(__dirname, 'node_modules'),
    },
    {
      // 对非文本文件采用 file-loader 加载
      test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
      use: ['file-loader'],
    },
  ]
}
```

##### Rule Conditions

There are two input values for the conditions:（条件有两种输入值）

1. The resource: An absolute path to the file requested. It's already resolved according to the [`resolve` rules](https://webpack.js.org/configuration/resolve).（资源：文件引入的文件）
2. The issuer: An absolute path to the file of the module which requested the resource. It's the location of the import.（发起请求的资源）

 **Example:** When we `import './style.css'` within `app.js`, the resource is `/path/to/style.css` and the issuer is `/path/to/app.js`. （app.js import style.css,the app.js is a issuer, and the style.css is a issuer）



 In a Rule the properties [`test`](https://webpack.js.org/configuration/module/#ruletest), [`include`](https://webpack.js.org/configuration/module/#ruleinclude), [`exclude`](https://webpack.js.org/configuration/module/#ruleexclude) and [`resource`](https://webpack.js.org/configuration/module/#ruleresource) are matched with the resource and the property [`issuer`](https://webpack.js.org/configuration/module/#ruleissuer) is matched with the issuer. (在Rule中，属性test,include,exclude,resource会匹配resource，属性issuer 会匹配issuer)

##### Rule results

 Rule results are used only when the Rule condition matches. 

 Rule有两种输入值： 

1. Applied loaders:  应用在 resource 上的 loader 数组。 
2. Parser options: An options object which should be used to create the parser for this module.

 这些属性会影响 loader：[`loader`](https://www.webpackjs.com/configuration/module/#rule-loader), [`options`](https://www.webpackjs.com/configuration/module/#rule-options-rule-query), [`use`](https://www.webpackjs.com/configuration/module/#rule-use)。 

 也兼容这些属性：[`query`](https://www.webpackjs.com/configuration/module/#rule-options-rule-query), [`loaders`](https://www.webpackjs.com/configuration/module/#rule-loaders)。 

 [`enforce`](https://www.webpackjs.com/configuration/module/#rule-enforce) 属性会影响 loader 种类。不论是普通的，前置的，后置的 loader。 

 The [`parser`](https://webpack.js.org/configuration/module/#ruleparser) property affects the parser options. 

##### Nested(嵌套) rules

 Nested rules can be specified under the properties [`rules`](https://webpack.js.org/configuration/module/#rulerules) and [`oneOf`](https://webpack.js.org/configuration/module/#ruleoneof). 

 These rules are evaluated（计算） only when（仅当） the parent Rule condition(父 Rule condition) matches. Each nested rule can contain its own conditions. 

The order of evaluation is as follows:

1. The parent rule
2. [`rules`](https://webpack.js.org/configuration/module/#rulerules)
3. [`oneOf`](https://webpack.js.org/configuration/module/#ruleoneof)

##### Rule.enforce

`string`

Possible values: `'pre' | 'post'`

Specifies the category of the loader. No value means normal loader.

There is also an additional category "inlined loader" which are loaders applied inline of the import/require.

There are two phases that all loaders enter one after the other:

1. **Pitching** phase: the pitch method on loaders is called in the order `post, inline, normal, pre`. See [Pitching Loader](https://webpack.js.org/api/loaders/#pitching-loader) for details.
2. **Normal** phase: the normal method on loaders is executed in the order `pre, normal, inline, post`. Transformation on the source code of a module happens in this phase.

All normal loaders can be omitted (overridden) by prefixing `!` in the request.

All normal and pre loaders can be omitted (overridden) by prefixing `-!` in the request.

All normal, post and pre loaders can be omitted (overridden) by prefixing `!!` in the request.

```js
// Disable normal loaders
import { a } from '!./file1.js';

// Disable preloaders and normal loaders
import { b } from  '-!./file2.js';

// Disable all loaders
import { c } from  '!!./file3.js';
```

Inline loaders and `!` prefixes should not be used as they are non-standard. They may be use by loader generated code.

##### Rule.resourceQuery

A [`Condition`](https://webpack.js.org/configuration/module/#condition) matched with the resource query. This option is used to test against the query section of a request string (i.e. from the question mark onwards). If you were to `import Foo from './foo.css?inline'`, the following condition would match:

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.css$/,
        resourceQuery: /inline/,
        use: 'url-loader'
      }
    ]
  }
};
```

##### Condition

Conditions can be one of these:（条件可以是以下之一）

- A string（字符串）: To match the input（匹配的资源） must start with（必须start with 提供的字符串） the provided string. I. e. an absolute directory path, or absolute path to the file.
- A RegExp（正则）: It's tested with the input.（匹配正则）
- A function（函数）: It's called with the input and must return a truthy value to match.（返回true || false）
- An array of Conditions（一个condition的数组）: At least one of the Conditions must match.（至少匹配一项）
- An object（一个对象）: All properties must match. Each property has a defined behavior.（不知道）

`{ test: Condition }`: The Condition must match. The convention is to provide a RegExp or array of RegExps here, but it's not enforced.（不强制）

`{ include: Condition }`: The Condition must match. The convention is to provide a string or array of strings here, but it's not enforced.（不强制）

`{ exclude: Condition }`: The Condition must NOT match. The convention is to provide a string or array of strings here, but it's not enforced.（不强制）

`{ and: [Condition] }`: All Conditions must match.（&&）

`{ or: [Condition] }`: Any Condition must match.（||）

`{ not: [Condition] }`: All Conditions must NOT match.（！）