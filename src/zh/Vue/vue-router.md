---
title: Vue Router
icon: page
order: 1
author: HCX
date: 2024-06-16
category:
  - Vue Router
tag:
  - Vue Router
sticky: true
star: true
footer: fly fly fly ~
---

# Vue-router V4

Vue Router 是官方路由库

## 快速起步

- CDN：`<script src="https://unpkg.com/vue-router@next">`
- NPM：`npm install vue-router@next -S`

在 App.vue 文件中配置路由出口

```vue
<template>
  <h1>Hello App!</h1>
  <!-- 在组件模板中使用 $route 来访问当前的路由对象 -->
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <nav>
    <!-- 创建链接 -->
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav>
  <main>
    <!-- 用于渲染当前 URL 路径对应的路由组件 -->
    <RouterView />
  </main>
</template>
```

定义路由配置，其中`createWebHistory`也可以是`createWebHashHistory`

```js
import { createWebHistory, createRouter } from 'vue-router';

// 导入组件
import HomeView from './HomeView.vue';
import AboutView from './AboutView.vue';

// 定义路由规则
const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
];

// 创造路由器实例
export default createRouter({
  history: createWebHistory(),
  routes,
});
```

在`main.js`中注册路由器插件

```js
import router from './router/index';
createApp(App).use(router).mount('#app');
```

在插件内进行了以下工作：

- 全局注册 `RouterView` 和 `RouterLink` 组件。
- 添加全局 `$router` 和 `$route` 属性。
- 启用 `useRouter()` 和 `useRoute()` 组合式函数。
- 触发路由器解析初始路由。

访问路由：

在组合式 API 中通过

```vue
<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 通过 useRoute() 和 useRouter() 来访问路由器实例和当前路由。
const router = useRouter();
const route = useRoute();

const search = computed({
  get() {
    return route.query.search ?? '';
  },
  set(search) {
    router.replace({ query: { search } });
  },
});
</script>
```

在选项式 API 中通过

```js
export default {
  methods: {
    goToAbout() {
      this.$router.push('/about');
    },
  },
};
```

:::info
RouterView 和 RouterLink

组件 RouterView 和 RouterLink 都是全局注册的，因此它们不需要在组件模板中导入。但你也可以通过局部导入它们，例如 `import { RouterLink } from 'vue-router'`。

在模板中，组件的名字可以是 PascalCase 风格或 kebab-case 风格的。Vue 的模板编译器支持两种格式，因此 `<RouterView>` 和 `<router-view>` 通常是等效的。此时应该遵循你自己项目中使用的约定。

如果使用 DOM 内模板，那么需要注意：组件名字必须使用 kebab-case 风格且不支持自闭合标签。因此你不能直接写 `<RouterView />`，而需要使用 `<router-view></router-view>`。

:::

## 动态路由匹配

基本用法

- 路由配置： `{ path: "/course/:id", component: ComponentName}`
- 参数获取: `this.$route.params.id` 或 `useRoute().params.id`

```js
import User from './User.vue';

// 这些都会传递给 `createRouter`
const routes = [
  // 动态字段以冒号开始
  { path: '/users/:id', component: User },
];
```

> 现在像 /users/johnny 和 /users/jolyne 这样的 URL 都会映射到同一个路由。

:::warning
使用带有参数的路由时需要注意的是，当用户从 `/users/johnny` 导航到 `/users/jolyne` 时，相同的组件实例将被重复使用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会被调用。

要对同一个组件中参数的变化做出响应的话，你可以简单地 `watch $route` 对象上的任意属性

或者，使用 `beforeRouteUpdate` 导航守卫，它还允许你取消导航
:::

**通配或 404 处理**

```js
const routes = [
  // 将匹配所有内容并将其放在 `route.params.pathMatch` 下
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // 将匹配以 `/user-` 开头的所有内容，并将其放在 `route.params.afterUser` 下
  { path: '/user-:afterUser(.*)', component: UserGeneric },
];
```

在括号之间使用了自定义正则表达式，并将 pathMatch 参数标记为可选可重复。也就意味着可以匹配到 `/xxx/yyy/zzz` 这样的路径

```js
router.push({
  name: 'NotFound',
  // 保留当前路径并删除第一个字符，以避免目标 URL 以 `//` 开头。
  params: { pathMatch: this.$route.path.substring(1).split('/') },
  // 保留现有的查询和 hash 值，如果有的话
  query: route.query,
  hash: route.hash,
});
```

## 嵌套路由

组件之间的嵌套常常会用嵌套路由形式与之对应

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'profile',
        component: UserProfile,
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: 'posts',
        component: UserPosts,
      },
    ],
  },
];
```

注意此时 `/user/:id` 无匹配结果，将会白屏。需要提供一个空的嵌套路径：

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      // 当 /user/:id 匹配成功
      // UserHome 将被渲染到 User 的 <router-view> 内部
      { path: '', component: UserHome },

      // ...其他子路由
    ],
  },
];
```

如果需要导航 `/user/:id` 而不显示嵌套路由。那样的话，你还可以命名父路由，但请注意重新加载页面将始终显示嵌套的子路由，因为它被视为指向路径`/users/:id` 的导航，而不是命名路由

如果父组件不渲染任何东西，只想提供一个统一的 url 前缀，也可以省略父组件的声明

```js
const routes = [
  {
    path: '/admin',
    children: [
      { path: '', component: AdminOverview },
      { path: 'users', component: AdminUserList },
      { path: 'users/:id', component: AdminUserDetails },
    ],
  },
];
```

:::info
命名路由

当创建一个路由时，我们可以选择给路由一个 name

```js
const routes = [
  {
    path: '/user/:username',
    name: 'profile',
    component: User,
  },
];
```

```vue
<router-link :to="{ name: 'profile', params: { username: 'erina' } }">
  User profile
</router-link>
```

使用 name 有很多优点：

- 没有硬编码的 URL。
- params 的自动编码/解码。
- 防止你在 URL 中出现打字错误。
- 绕过路径排序，例如展示一个匹配相同路径但排序较低的路由。
- 所有路由的命名都必须是唯一的。如果为多条路由添加相同的命名，路由器只会保留最后那一条
  :::

## 编程式导航

借助 router 的实例方法，通过编写代码来实现路由跳转

在组件内部，你可以使用 `$router` 属性访问路由，例如 `this.$router.push(...)`。如果使用组合式 API，你可以通过调用 `useRouter()` 来访问路由器。

:::info

`router.push` 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，会回到之前的 URL。

当你点击 `<router-link>` 时，内部会调用这个方法，所以点击 `<router-link :to="...">` 相当于调用 `router.push(...)` ：
:::

```js
// 字符串路径
router.push('/users/eduardo');

// 带有路径的对象
router.push({ path: '/users/eduardo' });

// 命名的路由，并加上参数，让路由建立 url
router.push({ name: 'user', params: { username: 'eduardo' } });

// 带查询参数，结果是 /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } });

// 带 hash，结果是 /about#team
router.push({ path: '/about', hash: '#team' });
```

注意：如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path

```js
const username = 'eduardo';
// 我们可以手动建立 url，但我们必须自己处理编码
router.push(`/user/${username}`); // -> /user/eduardo
// 同样
router.push({ path: `/user/${username}` }); // -> /user/eduardo
// 如果可能的话，使用 `name` 和 `params` 从自动 URL 编码中获益
router.push({ name: 'user', params: { username } }); // -> /user/eduardo
// `params` 不能与 `path` 一起使用
router.push({ path: '/user', params: { username } }); // -> /user
```

`router.replace` 也可以实现跳转，但不会新增历史记录，而是取代当前的历史。并且`router.push`也能实现

```js
router.push({ path: '/home', replace: true });
// 相当于
router.replace({ path: '/home' });
```

## 路由守卫

vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。这里有很多方式植入路由导航中：全局的，单个路由独享的，或者组件级的。

使用 `router.beforeEach` 注册一个全局前置守卫

```js
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return false
})
```

接收两个参数，to 表示即将导航进入的目标，from 表示从哪里导航来的

可以返回的值如下:

- false: 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
- 一个路由地址: 通过一个路由地址重定向到一个不同的地址，如同调用 `router.push()`，且可以传入诸如 `replace: true` 或 `name: 'home'` 之类的选项。它会中断当前的导航，同时用相同的 from 创建一个新导航。

- undefined 或返回 true，则导航是有效的，并调用下一个导航守卫

:::info
在之前的 Vue Router 版本中，还可以使用 第三个参数 next 。这是一个常见的错误来源，Vue-router 经过 RFC 讨论将其移除。

然而，它仍然是被支持的，这意味着你可以向任何导航守卫传递第三个参数。在这种情况下，确保 next 在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。
:::

**路由独享的守卫**

```js
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false;
    },
  },
];
```

beforeEnter 守卫 只在进入路由时触发，不会在 params、query 或 hash 改变时触发。例如，从 `/users/2` 进入到 `/users/3` 或者从 `/users/2#info` 进入到 `/users/2#projects`。它们只有在**从一个不同的**路由导航时，才会被触发。

**在组件内部定义路由守卫**

在组件内可以使用以下钩子定义路由守卫：

- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`

```vue
<script>
export default {
  beforeRouteEnter(to, from) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
  },
  beforeRouteUpdate(to, from) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
    // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
  },
};
</script>
```

## 路由元数据

有时需要在定义路由时附带额外信息，此时可以利用路由源数据，这样导航时就可以访问到这些信息

```js
{
  path: '/about',
  component: About,
  meta: {foo: 'bar'}
}
```

如何访问到？ 通过 meta 属性

一个路由匹配到的所有路由记录会暴露为 route 对象(还有在导航守卫中的路由对象)的 `route.matched` 数组。我们需要遍历这个数组来检查路由记录中的 meta 字段，Vue Router 还提供了一个 `route.meta` 方法，它是一个非递归合并所有 meta 字段（从父字段到子字段）的方法。

## 路由懒加载

打包时将单个路由组件分片打包，访问时才异步加载，可以有效降低 app 尺寸和加载空间

定义异步路由，component (和 components) 配置接收一个返回 Promise 组件的函数，Vue Router 只会在第一次进入页面时才会获取这个函数，然后使用缓存数据。

```js
const Test = () => import('./Test');
const router = createRouter({
  //..
  routes: [{ path: '/users/:id', component: Test }],
});
```

**分块打包**，有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中

使用 webpack，只需要使用命名 chunk，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)：

```js
const UserDetails = () => import(/* webpackChunkName: "group-user" */ './UserDetails.vue');
const UserDashboard = () => import(/* webpackChunkName: "group-user" */ './UserDashboard.vue');
const UserProfileEdit = () => import(/* webpackChunkName: "group-user" */ './UserProfileEdit.vue');
```

使用 Vite ，在 rollupOptions 下定义分块：

```js
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks: {
          'group-user': ['./src/UserDetails', './src/UserDashboard', './src/UserProfileEdit'],
        },
      },
    },
  },
});
```

## 缓存和过渡动画

RotuerView 组件暴露了一个插槽，可以用来渲染路由组件：

```vue
<router-view v-slot="{ Component }">
  <component :is="Component" />
</router-view>
```

上面的代码等价于不带插槽的 <router-view />，但是当我们想要获得其他功能时，插槽提供了额外的扩展性。

如缓存的实现

> 当在处理 KeepAlive 组件时，我们通常想要保持路由组件活跃，而不是 RouterView 本身。为了实现这个目的，我们可以将 KeepAlive 组件放置在插槽内：

```vue
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
```

类似的过渡动画

```vue
<router-view v-slot="{ Component }">
  <transition>
    <component :is="Component" />
  </transition>
</router-view>
```

## 动态路由的添加、删除

有时希望在 app 正在运行时动态添加路由到 router，vue-router 提供如下 api

**新增路由**：`router.addRoute({ path: '/about', component: About })`

**移除路由**

- 通过 name 删除：`router.removeRoute('about')`
- 通过`addRoute()`返回的回调

```js
const removeRoute = router.addRoute(routeRecord);
removeRoute();
```

- 通过添加一个 name 冲突的路由

```js
router.addRoute({ path: '/about', name: 'about', component: About });
router.addRoute({ path: '/other', name: 'about', component: Other });
```

**添加嵌套路由**

通过参数 1 传递父组件 name 即可
`router.addRoute('parentRouteName',{...})`

**查看已存在的路由**

- `router.hasRoute()` 判断是否存在某个路由
- `router.getRoutes()` 获取所有路由数组

实际场景：用户登录后动态添加权限路由
