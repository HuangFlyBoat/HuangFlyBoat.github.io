---
title: Express
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

# Express

## 一、基础

## 二、路由

### 2.1 路由基础

路由定义了应用如何响应客户端的请求，通过 URI 和指定的请求方式（GET、POST 等）来分情况处理，进行响应应答

路由的定义为：

```js
app.METHOD(PATH, HANDLER);
// app 为 express 的实例
// METHOD http 请求方法, 注意是小写的
```

几个简单例子

```js
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  res.send('Got a POST request');
});

app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user');
});

app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user');
});
```

:::tip

值得注意的是，`app.all()`可以处理所有的 HTTP 方法请求

:::

### 2.2 路由匹配规则

1. 路由匹配 path 规则

```js
app.METHOD(PATH, HANDLER);
```

PATH 可以大致分为以下 4 种:（以下统一用 get 方法演示了）

- 普通 Path 字符串

  比如匹配路径为 `/abcd` 的请求

  ```js
  app.get('/abcd', function (req, res) {
    next();
  });
  ```

- Path Pattern

  匹配 `/abcd` 和 `/abd`

  ```js
  app.get('/abc?d', function (req, res) {
    // to do sth
  });
  ```

  匹配 `/ad` 和 `/abcd`

  ```js
  app.get('/a(bc)?d', function (req, res) {
    // to do sth
  });
  ```

- 正则表达式匹配

  匹配 `/abc` 和 `/xyz`

  ```js
  app.get(/\/abc|\/xyz/, function (req, res) {
    // to do sth
  });
  ```

- 数组

  匹配 `/abcd` ， `/xyza`，`/lmn`，`/pqr`

  ```js
  app.get(['/abcd', '/xyza', /\/lmn|\/pqr/], function (req, res) {
    // to do sth
  });
  ```

::: info
这里的 path 规则同样适用于其他地方，比如中间件里的 path

需要注意的是，path 的匹配并不是精准匹配，匹配规则是根据开头来匹配的。
这也就意味着如果请求路径是 `/a` 会被 `app.get('/ab',handleFn)`匹配到

所以接下来要将请求匹配的先后规则，来确保路径安装自己想要的方式匹配到
:::

2. 请求匹配的先后

路由的访问顺序是根据书写顺序从上往下的，如果前面匹配到了则后面不会再进行匹配

```js
// 示例，无论后面写什么都无法匹配到
app.get('/', fn1); // 匹配了全部的get请求
app.get('/app', fn2); // 无法访问到
app.post('/', fn3); // 可以访问到，因为是post请求
```

这一点在路由模块化中尤为重要，为了避免请求过多后导致维护 uri 困难，并且顺序也很重要，因此引出了路由模块化

### 2.3 路由模块化

### 2.4 路由鉴权

### 2.5 静态资源托管

## 三、中间件

## 四、Express 生成器
