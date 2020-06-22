# VUE SSR

## 产生HTML

```js
// 第 1 步：创建一个 Vue 实例
const Vue = require('vue')
const app = new Vue({
  template: `<div>Hello World</div>`
})

// 第 2 步：创建一个 renderer
const renderer = require('vue-server-renderer').createRenderer()

// 第 3 步：将 Vue 实例渲染为 HTML
renderer.renderToString(app, (err, html) => {
  if (err) throw err
  console.log(html)
  // => <div data-server-rendered="true">Hello World</div>
})

// 在 2.5.0+，如果没有传入回调函数，则会返回 Promise：
renderer.renderToString(app).then(html => {
  console.log(html)
}).catch(err => {
  console.error(err)
})
```

## 返回响应

```js
const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  })
})

server.listen(8080)
```



<hr>

## 服务器上的数据响应

在纯客户端应用程序 (client-only app) 中，每个用户会在他们各自的浏览器中使用新的应用程序实例。对于服务器端渲染，我们也希望如此：**每个请求应该都是全新的、独立的应用程序实例，以便不会有交叉请求造成的状态污染** (cross-request state pollution)。

**因为实际的渲染过程需要确定性，所以我们也将在服务器上“预取”数据 ("pre-fetching" data) - 这意味着在我们开始渲染时，我们的应用程序就已经解析完成其状态。**也就是说，将数据进行响应式的过程在服务器上是多余的，所以默认情况下禁用。禁用响应式数据，还可以避免将「数据」转换为「响应式对象」的性能开销。



## 组件生命周期钩子函数

 **由于没有动态更新，所有的生命周期钩子函数中，只有 `beforeCreate` 和 `created` 会在服务器端渲染 (SSR) 过程中被调用。**这就是说任何其他生命周期钩子函数中的代码（例如 `beforeMount` 或 `mounted`），只会在客户端执行。 

 **此外还需要注意的是，你应该避免在 `beforeCreate` 和 `created` 生命周期时产生全局副作用的代码**，例如在其中使用 `setInterval` 设置 timer。 

## 访问特定平台(Platform-Specific) API

 **通用代码不可接受特定平台的 API，因此如果你的代码中，直接使用了像 `window` 或 `document`，这种仅浏览器可用的全局变量，则会在 Node.js 中执行时抛出错误，反之也是如此。** 

对于共享于服务器和客户端，但用于不同平台 API 的任务(task)，建议将平台特定实现包含在通用 API 中，或者使用为你执行此操作的 library。例如，[axios](https://github.com/axios/axios) 是一个 HTTP 客户端，可以向服务器和客户端都暴露相同的 API。

**对于仅浏览器可用的 API，通常方式是，在「纯客户端 (client-only)」的生命周期钩子函数中惰性访问 (lazily access) 它们。**



## 自定义指令

 大多数自定义指令直接操作 DOM，因此会在服务器端渲染 (SSR) 过程中导致错误。有两种方法可以解决这个问题： 

1. 推荐**使用组件作为抽象机制**，并运行在「虚拟 DOM 层级(Virtual-DOM level)」（例如，使用渲染函数(render function)）。
2. 如果你有一个自定义指令，但是不是很容易替换为组件，则可以在创建服务器 renderer 时，**使用 [`directives`](https://ssr.vuejs.org/zh/api/#directives) 选项所提供"服务器端版本**(server-side version)"。



<hr>

## 避免状态单例

 当编写纯客户端 (client-only) 代码时，我们习惯于每次在新的上下文中对代码进行取值。但是，**Node.js 服务器是一个长期运行的进程**。当我们的代码进入该进程时，它将进行一次取值并留存在内存中。这意味着**如果创建一个单例对象，它将在每个传入的请求之间共享。** 

 如基本示例所示，我们**为每个请求创建一个新的根 Vue 实例**。这与每个用户在自己的浏览器中使用新应用程序的实例类似。**如果我们在多个请求之间使用一个共享的实例，很容易导致交叉请求状态污染** (cross-request state pollution)。 

 因此，**我们不应该直接创建一个应用程序实例，而是应该暴露一个可以重复执行的工厂函数**，为每个请求创建新的应用程序实例： 

```js
// app.js
const Vue = require('vue')

module.exports = function createApp (context) {
  return new Vue({
    data: {
      url: context.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })
}
```

 **同样的规则也适用于 router、store 和 event bus 实例。你不应该直接从模块导出并将其导入到应用程序中，而是需要在 `createApp` 中创建一个新的实例，并从根 Vue 实例注入。** 



<hr>

## 介绍构建步骤

 到目前为止，我们还没有讨论过**如何将相同的 Vue 应用程序提供给客户端**。**为了做到这一点，我们需要使用 webpack 来打包我们的 Vue 应用程序**。事实上，**我们可能需要在服务器上使用 webpack 打包 Vue 应用程序**，因为： 

* **通常 Vue 应用程序是由 webpack 和 `vue-loader` 构建，并且许多 webpack 特定功能不能直接在 Node.js 中运行**（例如通过 `file-loader` 导入文件，通过 `css-loader` 导入 CSS）。 

* **尽管 Node.js 最新版本能够完全支持 ES2015 特性，我们还是需要转译客户端代码以适应老版浏览器。**这也会涉及到构建步骤。 

 所以基本看法是，**对于客户端应用程序和服务器应用程序，我们都要使用 webpack 打包** - **服务器需要「服务器 bundle」然后用于服务器端渲染(SSR)**，而「**客户端 bundle」会发送给浏览器，用于混合静态标记**。 

 我们将在后面的章节讨论规划结构的细节 - 现在，先假设我们已经将构建过程的规划都弄清楚了，我们可以在启用 webpack 的情况下编写我们的 Vue 应用程序代码。 

## 使用 webpack 的源码结构

 现在我们正在使用 webpack 来处理服务器和客户端的应用程序，大部分源码可以使用通用方式编写，可以使用 webpack 支持的所有功能。同时，在编写通用代码时，有一些[事项](https://ssr.vuejs.org/zh/guide/universal.html)要牢记在心。 

```bash
src
├── components
│   ├── Foo.vue
│   ├── Bar.vue
│   └── Baz.vue
├── App.vue
├── app.js # 通用 entry(universal entry)
├── entry-client.js # 仅运行于浏览器
└── entry-server.js # 仅运行于服务器
```



### app.js

 `app.js` 是我们应用程序的**「通用 entry」**。在**纯客户端应用程序中，我们将在此文件中创建根 Vue 实例，并直接挂载到 DOM**。**但是**，**对于服务器端渲染(SSR)，责任转移到纯客户端 entry 文件**。

> `app.js` 简单地使用 export **导出一个 `createApp` 函数：** 

```js
import Vue from 'vue'
import App from './App.vue'

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp () {
  const app = new Vue({
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })
  return { app }
}
```

### entry-client.js

 **客户端** entry 只需**创建应用程序，并且将其挂载到 DOM** 中： 

```js
import { createApp } from './app'

// 客户端特定引导逻辑……

const { app } = createApp()

// 这里假定 App.vue 模板中根元素具有 `id="app"`
app.$mount('#app')
```

### entry-server.js

 **服务器 entry 使用 default export 导出函数，并在每次渲染中重复调用此函数**。此时，除了创建和返回应用程序实例之外，它不会做太多事情 - 但是稍后我们将在此执行**服务器端路由匹配** (server-side route matching) 和**数据预取逻辑** (data pre-fetching logic)。 

```js
import { createApp } from './app'

export default context => {
  const { app } = createApp()
  return app
}
```



<hr>

# 路由和代码分割

## 使用 `vue-router` 的路由

你可能已经注意到，**我们的服务器代码使用了一个 `*` 处理程序，它接受任意 URL**。**这允许我们将访问的 URL 传递到我们的 Vue 应用程序中**，**然后对客户端和服务器复用相同的路由配置**！

为此，建议使用官方提供的 `vue-router`。我们首先创建一个文件，在其中创建 router。注意，类似于 `createApp`，我们也需要给**每个请求一个新的 router 实例**，**所以文件导出一个 `createRouter` 函数**：

```js
// router.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      // ...
    ]
  })
}
```

 然后更新 `app.js`: 

```js
// app.js
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'

export function createApp () {
  // 创建 router 实例
  const router = createRouter()

  const app = new Vue({
    // 注入 router 到根 Vue 实例
    router,
    render: h => h(App)
  })

  // 返回 app 和 router
  return { app, router }
}
```

 现在我们需要**在 `entry-server.js` 中实现服务器端路由逻辑** (server-side routing logic)： 

```js
// entry-server.js
import { createApp } from './app'

export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
    // 以便服务器能够等待所有的内容在渲染前，
    // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    
    /**IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII**/
    // 设置服务器端 router 的位置
    router.push(context.url)
     /*IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII*/

    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {//组件和钩子函数解析完毕
      const matchedComponents = router.getMatchedComponents()//路由的相关组件Array <component>
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // Promise 应该 resolve 应用程序实例，以便它可以渲染
      resolve(app)
    }, reject)
  })
}
```

 假设服务器 bundle 已经完成构建（请再次忽略现在的构建设置），服务器用法看起来如下： 

```js
// server.js
const createApp = require('/path/to/built-server-bundle.js')

server.get('*', (req, res) => {
  const context = { url: req.url }

  createApp(context).then(app => {
    renderer.renderToString(app, (err, html) => {
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Page not found')
        } else {
          res.status(500).end('Internal Server Error')
        }
      } else {
        res.end(html)
      }
    })
  })
})
```

## 代码分割



**应用程序的代码分割或惰性加载，有助于减少浏览器在初始渲染中下载的资源体积，可以极大地改善大体积 bundle 的可交互时间**(TTI - time-to-interactive)。**这里的关键在于，对初始首屏而言，"只加载所需"**。

Vue 提供异步组件作为第一类的概念，将其与 [webpack 2 所支持的使用动态导入作为代码分割点](https://webpack.js.org/guides/code-splitting-async/)相结合，你需要做的是：

```js
// 这里进行修改……
import Foo from './Foo.vue'

// 改为这样：
const Foo = () => import('./Foo.vue')
```

 **在 Vue 2.5 以下的版本中**，服务端渲染时**异步组件只能用在路由组件上**。然而**在 2.5+ 的版本中**，**得益于核心算法的升级**，**异步组件现在可以在应用中的任何地方使用**。 

 需要注意的是，**你仍然需要在挂载 app 之前调用 `router.onReady`，因为路由器必须要提前解析路由配置中的异步组件，才能正确地调用组件中可能存在的路由钩子**。这一步我们已经在我们的服务器入口 (server entry) 中实现过了，现在我们只需要更新客户端入口 (client entry)： 

```js
// entry-client.js

import { createApp } from './app'

const { app, router } = createApp()

router.onReady(() => {
  app.$mount('#app')
})
```

 异步路由组件的路由配置示例： 

```js
// router.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: () => import('./components/Home.vue') },
      { path: '/item/:id', component: () => import('./components/Item.vue') }
    ]
  })
}
```

# 数据预取和状态

## 数据预取存储容器 (Data Store)

 在服务器端渲染(SSR)期间，我们本质上是在渲染我们应用程序的"快照"，所以如果应用程序依赖于一些异步数据，**那么在开始渲染过程之前，需要先预取和解析好这些数据**。 

 另一个需要关注的问题是在客户端，**在挂载 (mount) 到客户端应用程序之前，需要获取到与服务器端应用程序完全相同的数据 - 否则，客户端应用程序会因为使用与服务器端应用程序不同的状态，然后导致混合失败**。 

 **为了解决这个问题，获取的数据需要位于视图组件之外**，即**放置在专门的数据预取存储容器**(data store)或"**状态容器**(state container)）"中。首先，在服务器端，我们可以在渲染之前预取数据，并将数据填充到 store 中。此外，我们将在 HTML 中序列化(serialize)和内联预置(inline)状态。这样，在挂载(mount)到客户端应用程序之前，可以直接从 store 获取到内联预置(inline)状态。 

 为此，我们将使用官方状态管理库 [Vuex](https://github.com/vuejs/vuex/)。我们先创建一个 `store.js` 文件，里面会模拟一些根据 id 获取 item 的逻辑： 

```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 假定我们有一个可以返回 Promise 的
// 通用 API（请忽略此 API 具体实现细节）
import { fetchItem } from './api'

export function createStore () {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
      fetchItem ({ commit }, id) {
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        return fetchItem(id).then(item => {
          commit('setItem', { id, item })
        })
      }
    },
    mutations: {
      setItem (state, { id, item }) {
        Vue.set(state.items, id, item)
      }
    }
  })
}
```



 然后修改 `app.js`： 

```js
// app.js
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

export function createApp () {
  // 创建 router 和 store 实例
  const router = createRouter()
  const store = createStore()

  // 同步路由状态(route state)到 store
  sync(store, router)

  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  // 暴露 app, router 和 store。
  return { app, router, store }
}
```

## 带有逻辑配置的组件 (Logic Collocation with Components)

 那么，我们**在哪里放置**「dispatch **数据预取** action」的代码？ 

 我们需要通过访问路由，来决定获取哪部分数据 - 这也决定了哪些组件需要渲染。事实上，给定路由所需的数据，也是在该路由上渲染组件时所需的数据。所以**在路由组件中放置数据预取逻辑**，是很自然的事情。 

 我们将在**路由组件上暴露出一个自定义静态函数 `asyncData`**。注意，由于**此函数会在组件实例化之前调用**，**所以它无法访问 `this`。需要将 store 和路由信息作为参数传递进去**： 

```html
<!-- Item.vue -->
<template>
  <div>{{ item.title }}</div>
</template>

<script>
export default {
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchItem', route.params.id)
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item () {
      return this.$store.state.items[this.$route.params.id]
    }
  }
}
</script>
```

## 服务器端数据预取 (Server Data Fetching)

 在 `entry-server.js` 中，我们可以通过路由获得与 `router.getMatchedComponents()` 相匹配的组件，如果组件暴露出 `asyncData`，我们就调用这个方法。然后我们需要将解析完成的状态，附加到渲染上下文(render context)中。 

```js
// entry-server.js
import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state

        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
```

 当使用 `template` 时，`context.state` 将作为 `window.__INITIAL_STATE__` 状态，自动嵌入到最终的 HTML 中。而在客户端，在挂载到应用程序之前，store 就应该获取到状态： 

```js
// entry-client.js

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
```

## 客户端数据预取 (Client Data Fetching)

 在客户端，处理数据预取有两种不同方式： 

 **1.在路由导航之前解析数据：** 

使用此策略，应用程序会等待视图所需数据全部解析之后，再传入数据并处理当前视图。好处在于，可以直接在数据准备就绪时，传入视图渲染完整内容，但是如果数据预取需要很长时间，用户在当前视图会感受到"明显卡顿"。因此，如果使用此策略，建议提供一个数据加载指示器 (data loading indicator)。

我们可以通过检查匹配的组件，并在全局路由钩子函数中执行 `asyncData` 函数，来在客户端实现此策略。注意，在初始路由准备就绪之后，我们应该注册此钩子，这样我们就不必再次获取服务器提取的数据。



## 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。

```js
import { createApp } from './app'

const { app, router } = createApp()

// entry-client.js

// ...忽略无关代码

router.onReady(() => {
    // 添加路由钩子函数，用于处理 asyncData.
    // 在初始路由 resolve 后执行，
    // 以便我们不会二次预取(double-fetch)已有的数据。
    // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
    router.beforeResolve((to, from, next) => {
      const matched = router.getMatchedComponents(to)
      const prevMatched = router.getMatchedComponents(from)
  
      // 我们只关心非预渲染的组件
      // 所以我们对比它们，找出两个匹配列表的差异组件
      let diffed = false
      const activated = matched.filter((c, i) => {
        return diffed || (diffed = (prevMatched[i] !== c))
      })
  
      if (!activated.length) {
        return next()
      }
  
      // 这里如果有加载指示器 (loading indicator)，就触发
  
      Promise.all(activated.map(c => {
        if (c.asyncData) {
          return c.asyncData({ store, route: to })
        }
      })).then(() => {
  
        // 停止加载指示器(loading indicator)
  
        next()
      }).catch(next)
    })
  
    app.$mount('#app')
  })
```

2. **匹配要渲染的视图后，再获取数据：** 

此策略将客户端数据预取逻辑，放在视图组件的 `beforeMount` 函数中。当路由导航被触发时，可以立即切换视图，因此应用程序具有更快的响应速度。然而，传入视图在渲染时不会有完整的可用数据。因此，对于使用此策略的每个视图组件，都需要具有条件加载状态。

这可以通过纯客户端 (client-only) 的全局 mixin 来实现：

```js
Vue.mixin({
  beforeMount () {
    const { asyncData } = this.$options
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route
      })
    }
  }
})
```

 这两种策略是根本上不同的用户体验决策，应该根据你创建的应用程序的实际使用场景进行挑选。但是无论你选择哪种策略，当路由组件重用（同一路由，但是 params 或 query 已更改，例如，从 `user/1` 到 `user/2`）时，也应该调用 `asyncData` 函数。我们也可以通过纯客户端 (client-only) 的全局 mixin 来处理这个问题： 

```js
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})
```

## Store 代码拆分 (Store Code Splitting)

 **在大型应用程序中，我们的 Vuex store 可能会分为多个模块**。当然，也可以将这些模块代码，分割到相应的路由组件 chunk 中。假设我们有以下 store 模块： 

```js
// store/modules/foo.js
export default {
  namespaced: true,
  // 重要信息：state 必须是一个函数，
  // 因此可以创建多个实例化该模块
  state: () => ({
    count: 0
  }),
  actions: {
    inc: ({ commit }) => commit('inc')
  },
  mutations: {
    inc: state => state.count++
  }
}
```

 我们可以在路由组件的 `asyncData` 钩子函数中，使用 `store.registerModule` 惰性注册(lazy-register)这个模块： 

```html
// 在路由组件内
<template>
  <div>{{ fooCount }}</div>
</template>

<script>
// 在这里导入模块，而不是在 `store/index.js` 中
import fooStoreModule from '../store/modules/foo'

export default {
  asyncData ({ store }) {
    store.registerModule('foo', fooStoreModule)
    return store.dispatch('foo/inc')
  },

  // 重要信息：当多次访问路由时，
  // 避免在客户端重复注册模块。
  destroyed () {
    this.$store.unregisterModule('foo')
  },

  computed: {
    fooCount () {
      return this.$store.state.foo.count
    }
  }
}
</script>
```

# 客户端激活 (client-side hydration)

 所谓客户端激活，指的是 Vue 在浏览器端接管由服务端发送的静态 HTML，使其变为由 Vue 管理的动态 DOM 的过程。 

 在 `entry-client.js` 中，我们用下面这行挂载(mount)应用程序： 

```js
// 这里假定 App.vue template 根元素的 `id="app"`
app.$mount('#app')
```

由于服务器已经渲染好了 HTML，我们显然无需将其丢弃再重新创建所有的 DOM 元素。相反，我们需要"激活"这些静态的 HTML，然后使他们成为动态的（能够响应后续的数据变化）。

如果你检查服务器渲染的输出结果，你会注意到应用程序的根元素上添加了一个特殊的属性：

```html
<div id="app" data-server-rendered="true">
```

`data-server-rendered` 特殊属性，让客户端 Vue 知道这部分 HTML 是由 Vue 在服务端渲染的，并且应该以激活模式进行挂载。注意，这里并没有添加 `id="app"`，而是添加 `data-server-rendered` 属性：你需要自行添加 ID 或其他能够选取到应用程序根元素的选择器，否则应用程序将无法正常激活。

注意，在没有 `data-server-rendered` 属性的元素上，还可以向 `$mount` 函数的 `hydrating` 参数位置传入 `true`，来强制使用激活模式(hydration)：

```js
// 强制使用应用程序的激活模式
app.$mount('#app', true)
```



在开发模式下，Vue 将推断客户端生成的虚拟 DOM 树 (virtual DOM tree)，是否与从服务器渲染的 DOM 结构 (DOM structure) 匹配。如果无法匹配，它将退出混合模式，丢弃现有的 DOM 并从头开始渲染。**在生产模式下，此检测会被跳过，以避免性能损耗。**

### 一些需要注意的坑

使用「SSR + 客户端混合」时，需要了解的一件事是，浏览器可能会更改的一些特殊的 HTML 结构。例如，当你在 Vue 模板中写入：

```html
<table>
  <tr><td>hi</td></tr>
</table>
```

浏览器会在 `` 内部自动注入 ，然而，由于 Vue 生成的虚拟 DOM (virtual DOM) 不包含 ，所以会导致无法匹配。为能够正确匹配，请确保在模板中写入有效的 HTML。

# Bundle Renderer 指引

## 使用基本 SSR 的问题

到目前为止，我们假设打包的服务器端代码，将由服务器通过 `require` 直接使用：

```js
const createApp = require('/path/to/built-server-bundle.js')
```

这是理所应当的，然而在每次编辑过应用程序源代码之后，都必须停止并重启服务。这在开发过程中会影响开发效率。此外，Node.js 本身不支持 source map。

## 传入 BundleRenderer

