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

### 入门 hello world

环境 ： Koa 依赖 node 12 及更高版本和 async 方法支持

```js
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
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

app.use(async (ctx) => {
  ctx.body = 'Hello World'; // 第二个执行
});

app.listen(3000);
```

## 二、
