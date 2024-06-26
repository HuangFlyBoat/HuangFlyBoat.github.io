---
# 这是文章的标题
title: 前端工程化入门
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 1
# 设置作者
author: HCX
# 设置写作时间
date: 2024-06-09
# 一个页面可以有多个分类
category:
  - 工程化
# 一个页面可以有多个标签
tag:
  - 小白向
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 夏天快到了
---

为了更好的管理团队，降低管理成本，需要将代码进行统一标准化，为新人或者初级工程师提供便捷的工具，使得其能够更好的发挥自己的作用

## 一、模块化和包管理

### 1.1 模块化解决了什么问题？

模块化的思想为分解和聚合。分解契合的是主观规律，即人为主观的进行分解，降低认识的成本，更好的分析问题。而聚合是客观规律，所见到的大部分都是模块聚合的结果

- 函数层面上来看分解和聚合：

比如说书写一个基本的功能函数，会针对领域内的问题进行细分出来一系列的功能函数（分解），由这些功能函数聚合成要实现的功能（聚合）

- 文件层面上的分解和聚合：

比函数更高一级的分解和聚合，各个文件里有着不同的功能实现，多个文件聚合成一个大的应用场景

:::info
文件层面上在前端上有两个问题，是 JS 语言层面上的历史原因导致的，分别是：

1. 全局污染，在引用多个 JS 文件时，可能发生的命名冲突，没有隐藏内在实现（分解上的实现问题）

2. 依赖混乱，文件与文件之间的依赖关系不明确，随着系统的复杂性增加，为了进行功能解耦，会做许多细化的分解，因此导致文件越来越多，文件之间的依赖关系形成一个巨大的网格（聚合上的实现问题）
   :::

模块化解决的就是文件层面的分解和聚合，在模块化里面有相应的标准

## 1.2 模块化标准

- CommonJS CJS 民间标准，运行时
- Ecmascript Module ESM 官方标准，编译时

一个是运行是才知道具体依赖关系，另一个则是在运行前就能知道依赖关系，在编译时就知道了，能方便提前进行优化

实现层面上：

有了标准后，根据标准进行实现，也就是语言的运行环境

- 浏览器，只支持官方的标准，不支持 CJS
- node，CJS 和 ESM 都支持
- 构建工具，模块化的核心应用场景，webpack、rollup、esbuilder，通常 CJS 和 ESM 都支持

## 1.3 包管理

包：package，一系列模块的集合。按照聚合程度的由低到高，从函数到文件再到包

::: info
框架和库的区别，框架会约束代码的书写规则，而库更偏向于功能上的实现，供开发者调用开发
:::

包管理需要考虑的问题有：

- 从哪里下载？
- 如何升级？
- 如何卸载？
- 如何发布？
- 版本控制？

目前前端的包管理方案还是 npm

- 可以通过 `package.json` 文件中看到包的相关信息

- registry 更改包的来源

- cli(command-line interface) 是包的命令行操作界面

由于企业需求和 npm 的缺陷，也有一些其他的包管理器，如

- pnpm (使用较多)
- yarn

## 二、JS 工具链

解决语言层面的缺陷和兼容性考虑

- 兼容性
  - 语法兼容（可选链，async 等等）
    - syntax transformer(runtime) 语句转换：目前没有大而统一的兼容，一般是一个工具解决一个语法的兼容
  - API 兼容
    - polyfill（垫片）: core-js
- 语法增强
  - jsx 转换工具
  - typescript tsc 转换工具

代码转换工具集成各个 JS 工具链，进行统一转换，如 babel

`npm i -D @babel/core @babel/cli`

babel 会根据源代码生成抽象语法树 AST，再根据 AST 转换成代码，也就是说如果没有扩展的情况下，代码转换后并无变化

通过插件来修改 AST，从而影响最后的代码生成结果

书写 babel 的配置文件来定义相关插件，babel 预设里面有常见的插件

主要用于处理兼容性： `npm i -D @babel/preset-env`

```js
// babel.config.js
module.exports = {
  presets: [['@babel/preset-env']],
};
```

## 三、CSS 工具链

CSS 中从语言上来说缺少基本循环、判断语句。

从功能上来说，函数仍有不足，颜色函数、数学函数

因此有 sass、less、stylus 出现，来增强 css 语言，通过 css 预编译器生成 css

但这只是语言增强，生成的 css 还有兼容性问题和其他问题

- 兼容各个浏览器，厂商前缀
- 代码体积压缩
- 代码剪枝，去除无用代码

通过后处理器对 css 进行处理从而符合标准

:::tip
核心其实就是代码转换

预处理器 -> css -> 后处理器(postCSS) -> css

postCSS 和 babel 一样，只负责转换代码，通过插件来实现各个功能
:::

## 四、构建工具和脚手架

### 4.1 构建工具

前面二和三说到的都是语言层面上的转换，接下来介绍工程层面上的转换，如何将一个工程目录下的文件转换成传统的`html`,`css`,`js`文件

`npm run build` 时发生的便是工程的转换

开发和维护的代码和运行时的代码并不一致，结构也不一致

运行时的代码需要考虑具体的兼容

- 1. 哪种工程更适合开发和维护？
- 2. 哪种工程更适合运行时？传统工程
- 3. 如何转换（打包）webpack

webpack 做的工作：

webpack 通过配置的入口区解析字符串，生成 AST，分析依赖关系，进行深层遍历然后打包

webpack 还能运行本地服务器，从而预览代码效果，不用先打包再去运行打包结果

文件指纹，打包生成的文件名中带有哈希值，会随着源码的内容改动而改动。涉及到文件缓存，如请求一个 JS 文件，如果有文件指纹的话，当文件内容更新就会产生新的哈希值，从而使得 html 页面（html 一般不会缓存）里的导入该文件的语句发生变化，向服务器发起请求获取该文件。因为文件名不一致，所以会发起新的请求，而如果没有文件指纹，即使服务器文件内容更新了也无法得知，文件名没有发生变化，使用的还是之前的浏览器本地缓存的文件。

css modules，为了避免类名冲突打包后的 css 类名也发生了变化，如果需要运行时去找到变换后的类名，需要使用导入语句。`import styles form './main.less'`

source map，源码地图。将运行时的代码和源代码对应起来，方便调试。

:::info
webpack 的功能并不止上面这些，而开发服务器并不是 webpack 本身的，css modules 时也是专门的库实现的。

webpack 集成了许多的技术，通过 loader 和 plugin 来实现之前讲到的代码转换和兼容

:::

### 4.2 脚手架

- vue-cli
- vite
- cra

脚手架负责生成工程目录和配置文件

- 提供界面交互
- 提供工程模板
