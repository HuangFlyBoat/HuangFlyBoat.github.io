---
title: Koa
icon: page
order: 1
author: HCX
date: 2024-01-05
category:
  - Node
  - Server
tag:
  - Server
sticky: true
star: true
footer: fly fly fly ~
---

# Koa

基于 Node.js 平台的下一代 web 开发框架
next generation web framework for node.js

> 简介
> Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

## 一、基础使用

### 快速开始

环境 ： Koa 依赖 node 12 及更高版本和 async 方法支持

```js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

```shell
npm i koa
node my-koa-app.js
```

::: info
级联思想：koa 通过 async 的方式来实现真实的中间件运作，当中间件调用 next 方法时会等待下一个中间件运行结束后才会执行当前的逻辑

当在下游没有更多的中间件执行后，堆栈将展开并且每个中间件恢复执行其上游行为
:::

```js
const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
  await next(); // 进入到下一个中间件，后续语句等待
  const rt = ctx.response.get('X-Response-Time'); // 最后执行
  console.log(`${ctx.method} ${ctx.url} - ${rt}`); // 最后执行
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now(); // 第一个执行
  await next(); // 进入到下一个中间件，后续语句等待
  const ms = Date.now() - start; // 第三个执行
  ctx.set('X-Response-Time', `${ms}ms`); // 第四个执行
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World'; // 第二个执行
});

app.listen(3000);
```

### 项目配置文件

安装 `dotenv` ，使得 Koa 能够读取根目录中的 `.env` 文件，将配置写到 `process.env` 中

`npm i dotenv`

主程序中运行 `require('dotenv').config();`，而后通过 `process.env` 便能够获取到配置的相关变量

### Context 上下文

**每个请求都将创建一个 Context，并在中间件中作为接收器引用，或者 ctx 标识符。**Koa Context 将 node 的 request 和 response 对象封装到单个对象中，为编写 Web 应用程序和 API 提供了许多有用的方法。

`ctx.req` 和 `ctx.res` 中可以直接访问到 Node 的 request 和 response 对象

`ctx.request` 和 `ctx.response` 中可以直接访问到 koa 自己封装的 request 和 response 对象

:::warning
绕过 Koa 的 response 处理是 不被支持的. 应避免使用以下 node 属性：

- `res.statusCode`
- `res.writeHead()`
- `res.write()`
- `res.end()`
  :::

ctx 中还能直接访问到 koa 自己封装的 request 和 response 对象的部分属性，如 `ctx.body` 实际上是 `ctx.response.body`方便调用

## 二、路由

安装 `koa-router`：`npm i koa-router`

```js
const Koa = require('koa');
const Router = require('koa-router');

// koa-router 的导出方式为类风格，因此需要先通过构造函数生成实例
const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  // 书写逻辑
});
// 在 koa-router 中，router.allowedMethods() 是一个中间件，它的作用是对响应进行处理，确保如果一个请求方法不被路由支持，服务器将返回合适的 405 Method Not Allowed 或 501 Not Implemented 状态码
app.use(router.routes()).use(router.allowedMethods());
```

:::info
如果直接使用 `app.use(router)`，实际上并没有将路由的逻辑添加到 Koa 应用程序中，因为 router 本身不是一个中间件。而 `router.routes()` 返回的是一个可以处理路由的中间件函数，这个函数会根据请求的 URL 和 HTTP 方法来执行相应的路由处理器。

> router.routes ⇒ function
> Returns router middleware which dispatches a route matching the request.
> Kind: instance property of Router

:::

koa-router 的路由匹配规则基于 path-to-regexp 库，它将路由路径转换为正则表达式来进行匹配。

```js
// 支持链式调用
router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  })
  .post('/users', (ctx, next) => {
    // ...
  })
  .put('/users/:id', (ctx, next) => {
    // ...
  })
  .del('/users/:id', (ctx, next) => {
    // ...
  })
  .all('/users/:id', (ctx, next) => {
    // 匹配所有的请求方法
    // ...
  });
```

## 模块拆分

1. 将 Http 服务和 App 的业务服务进行拆分

```js
// src/app/index.js
// 路由所有的操作，第三方插件
const Koa = require('koa');
const userRouter = require('../router/user.router.js');

const app = new Koa();
app.use(userRouter.routes());

module.exports = app;
```

主函数改写，专注于启动服务器

```js
// src/main.js
const app = require('./app');

app.listen(3000, () => {
  console.log('Server at 3000');
});
```

2. 将路由与控制器（具体的业务逻辑）分开

```js
// src/router/user.router.js
const Router = require('koa-router');

const { register, login } = require('../controller/user.controller.js');

const router = new Router({ prefix: '/users' });

// 注册接口
router.post('/register', register);

// 登录接口
router.post('/login', login);

module.exports = router;
```
