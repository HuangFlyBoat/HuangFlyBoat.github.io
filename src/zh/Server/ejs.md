---
title: EJS
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

# EJS 模版引擎

> “E” 代表什么？可以表示 “可嵌入（Embedded）”，也可以是“高效（Effective）”、“优雅（Elegant）”或者是“简单（Easy）”。

常见的模版引擎：ejs、handlebars、jade、pug

vue 中的模版也是参考了著名的 mustache 的语法实现的

**EJS 是一套简单的模板语言，帮你利用普通的 JavaScript 代码生成 HTML 页面。**

实践：

`npm i koa koa-static2 koa-views koa-router ejs -s`

- Koa: Koa 框架核心模块。
- koa-router: 用于处理路由的中间件。
- koa-static2: 用于提供静态文件服务的中间件。
- koa-views: 用于渲染视图的中间件。

```js
// index.js
const Koa = require('koa');
const router = require('koa-router')();
const static = require('koa-static2');
const views = require('koa-views');

const app = new Koa();

// 中间件配置视图文件的目录和文件扩展名。在这里，视图文件位于项目的 views 目录下，文件扩展名是 .ejs。
app.use(
  views(__dirname + '/views', {
    extension: 'ejs',
  })
);

app.use(static('assets', __dirname + '/assets'));

router.get('/', async ctx => {
  // 使用 EJS 模板引擎渲染 views 目录下的 index.ejs 文件，并传递一个变量 name，其值为 hello。
  await ctx.render('index', {
    name: 'hello',
  });
});

app.use(router.routes());
app.listen(3000, () => {
  console.log('Server at 3000');
});
```

在 ejs 模版中使用变量

```ejs
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <h1><%= name %></h1>
  </body>
</html>
```

> EJS 的详细语法 https://ejs.bootcss.com/
