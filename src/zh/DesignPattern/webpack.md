---
# 这是文章的标题
title: Webpack 从入门开始
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 1
# 设置作者
author: HCX
# 设置写作时间
date: 2023-09-18
# 一个页面可以有多个分类
category:
  - Webpack
# 一个页面可以有多个标签
tag:
  - Webpack
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: fly fly fly ~
---

# Webpack

## 一、模块化演变过程

在早期没有工具和规范的情况下对模块化的落地方式

1. 第一阶段

最开始各个页面通过 script 来引入，但是模块一旦多了后？
例如有如下两个模块

```js
var name = 'module-b'

function method1 (){
    console.log('xx')
}
function method2 (){
    console.log('yy')
}

---
var name = 'module-a'

function method1 (){
    console.log('zz')
}
function method2 (){
    console.log('mm')
}
```

直接调用模块中的全局成员（变量或者函数）

- 污染全局作用域
- 并且可以在模块外部任意的访问和修改
- 命名冲突问题
- 无法管理模块依赖方式

原始方法完全依赖于约定

2. 第二阶段

##### 命名空间方式

在第一个阶段上，我们将每个模块包裹成一个全局对象去使用

```js
var moduleA = {
  name: 'module-a',
  method1: function () {
    console.log('zz');
  },
  method2: function () {
    console.log('mm');
  },
};
```

减小了命名冲突的问题，但是仍然没有私有空间，可以直接被访问和修改模块内部，并且模块之间依赖不明确

3. 第三阶段

##### 立即执行函数

用函数将模块包裹住，并对于需要暴露给外部的部分，将其挂载到全局对象上来实现

```js
(function () {
  var name = 'module-a';

  function method1() {
    console.log('zz');
  }
  function method2() {
    console.log('mm');
  }
  window.moduleA = {
    method: method1,
    method: method2,
  };
})();
```

实现了私有成员的概念，模块内部的成员只能通过闭包的方式去访问，外部无法直接访问和修改。并且可以通过立即执行函数的参数来作为依赖声明使用，使得各个模块的依赖关系明显

```js
(function ($) {
  var name = 'module-a';

  function method1() {
    console.log('zz');
    $('body').animate({ margin: '200px' });
  }
  function method2() {
    console.log('mm');
  }
  window.moduleA = {
    method: method1,
    method: method2,
  };
})(jQuery);
```

## 二、模块化规范的出现

在原本的方式出，都是以原始的模块为几处，通过约定来达成规约。而不同项目的不同约定可能不一样，并且模块中的加载方式都是通过 script 标签来导入，并不受代码的控制，时间久了维护困难。（当我们移除了某个模块，还要去对应的 html 文件中删除 script 引用）

**需要 模块化的标准 和 模块加载器**

1. 模块化标准 CommonJS
   约定如下：
   - 一个文件就是一个模块
   - 每个模块都有单独的作用域
   - 通过 module.exports 导出成员
   - 通过 require 函数导入模块

但是在前端浏览器上使用此规范的话会有问题

> CommonJS 约定的是以同步的方式去加载模块，因为 Node 的执行机制是在启动时加载模块，在执行过程中并不需要加载模块，只需要去使用模块，所以这种约定在 Node 端并不会有问题

浏览器端同步必然导致效率低下，因为每一次页面加载都会导致大量的同步请求出现，所以在早期的前端模块化规约中并没有选择 CommomJS 这个规范

**针对浏览器端特点设计出了 AMD（Asynchronous Module Definition）**。同期还推出了一个库 Require.js 实现了 AMD 规范，并且其本身也是个非常强大的模块加载器

```js
// 定义一个模块
define('moduleName',['jquery','./module2'],function($,module2){
    return{
        start: funcion(){
            $('body').animate( {margin:'200px'} )
            module2()
        }
    }
})
```

除此之外，require 中还提供了一个 require 函数，用来帮我们自动加载函数

```js
require(['moduleName'], function (moduleName) {
  mouduleName.start();
});
```

但 require.js 需要加载模块，内部会自动创建一个 script 标签去发送对应的脚本文件请求。

目前大多数模块都支持 AMD 规范，但 AMD 规范的使用比较复杂，需要不断 define 和 require，有很多的操作模块的代码，如果项目模块划分细致的话，同一个页面对 JS 的请求次数就会过多

> AMD 一种妥协的方法，并不是最好的，给前端模块化提供了一个标准，同期还出现了类似的由淘宝开发的 Sea.js+CMD 标准

##### 现代最佳实践

在 nodeJS 中遵循 CommomJS 规范去组织模块，而在浏览器环境中采用 ES Module 的规范

ES Module ： ECMAScript 2015（ES6）

截止到目前 ES Module 基本上算最主流的前端模块化方案，相比较 AMD 这种社区提出的规划，ES Module 是从语言层面去实现了模块化

## 三、ES Module

#### 1. ES Module 的特性

如何使用？

通过给 script 标签添加 type=module 的属性即可
`<script type="module"> </script>`

1. ESM 自动采用严格特性

2. 每个 ES Module 都是运行在单独的私有作用域中

3. ESM 是通过 CORS 的方式请求外部 JS 模块的

4. script 标签会延迟执行脚本（给 script 标签添加 type=module 相当于给 script 添加了 defer）。不会阻塞页面渲染

#### 2. ES Module 导出

```js
export var name = 'foo module';
export function hello(){

}
export Person{}

// 又或者统一导出

export {name,hello,Person}

// 可以通过 as 来取别名
// 默认导出的内容
export default var b = "x"
```

**注意 export 导出的括号符并不是对象字变量，而是一个固定语法**

而` export default {xxx}`则是对象字变量的直接导出了，无法被 import 接收到

export 导出的是引用并且是只读的，无法修改

#### 3. ES Module 导入

```js
import { name } from './module.js';
```

1. ESM 导入的 from 后面必须填写完整路径和文件名（但在打包工具中可以去省略扩展名和 index.js）

2. ESM 相对路径导入当前文件是不能省略 ./ 的

3. 导入可以填写一个完整的 url 或者绝对路径

4. 如果只需要执行模块内的内容，不需要提取内容。可以这样

   `import {} from "./module"`
   `import './module`

5. 可以把模块中导出的所有成员导入并放入一个重命名的对象里
   `import * as mod from './module'`

6. 动态导入模块，在不确定导入路径又或者是否导入时使用 import 方法。普通的 import 无法放入 if 里面，放入最顶部且并且必须事先知道路径

   ```js
   import('/module.js').then(function (module) {
     console.log(module);
   });
   ```

   当模块加载完成时候会自动执行模块，模块的内容可以通过参数获得

7. 同时导入默认导出成员和指定成员,导入默认成员可以随意起个别名

   `import title,{name,age} from "./module`

8. 导入后马上导出，常见于 index.js 中集中导出方法

   ```js
   // index.js 相当于桥梁，整合后导出
   export { Button } from './button.js';
   export { Avatar } from './avatar.js';
   ```

## 四、 ES Module 环境支持

#### 1. 浏览器支持

Polyfill 用于专门使浏览器支持 ES Module 语法

可以在 script 中添加 nomodule 属性来使得不支持 ES Module 的脚本来执行

#### 2. ES Module in Node.js

## 五、模块化打包工具 Webpack

> 模块文件多，网络请求频繁。ES Module 浏览器支持问题，新特性代码编译。除了 JS 需要模块化，后续其他资源可能都需要

开发阶段模块化开发，生产环境整合在一起

如何支持不同类型的资源模块打包？

webpack 是 node 环境下运行的代码

核心特性：

- 模块打包器(Module bundler) 将零散的模块打包在一起
- 模块加载器(Loader) 解决模块兼容问题
- 代码拆分(Code Splitting) 按需打包代码，打包初次运行必须的。其他的再异步加载，或者增量加载
- 资源模块(Asset Module) 在 JS 中以模块化的方式加载任何类型的文件

对整个前端整体的模块化，并不只是 JS

#### 1. 快速上手

`yarn init` 初始化

`yarn add webpack-cli --dev` 下载 webpack

`yarn webpack --version` 运行查看版本

`yarn webpack` 打包，自动的从 src 下的 index.js 下开始打包。打包结果存放在 dist 文件夹下 main.js

#### 2. 配置文件

5 大核心概念

1. entry 入口
2. output 输出
3. loader 加载器(module.rules)
4. plugins 插件
5. mode 模式

主要两种模式：

- 开发模式:development
- 生产模式:production

在项目根目录下添加 webpack.config.js 文件

```js
// node环境下载入path模块
const path = require('path');
module.exports = {
  // 指定webpack打包入口文件的路径,注意相对路径./在这里不能省略
  entry: './src/main.js',
  // 输出相关的
  output: {
    // 设置打包结果的名字
    filename: 'bundle.js',
    // 设置输出目录，绝对路径。在output目录下生成打包结果
    path: path.join(__dirname, 'output'),
  },
  // 加载器
  module: {
    rules: [
      // loader 的配置
    ],
  },
  // 插件
  plugins: [
    // plugins的配置
  ],
  // 模式
  mode: 'development',
};
```

#### 3. 开发模式介绍

这个模式下主要做两件事：

1. 编译代码，使浏览器能识别运行

开发时我们有样式资源、字体资源、图片资源、html 资源等，webpack 默认都不能处理这些资源，所以我们要加载配置来编译这些资源

2. 代码质量检测，树立代码规范

提前检查代码的一些隐患，让代码运行时能更加健壮

提前检查代码规范和格式，统一团队编码风格，让代码更加优雅美观

#### 4.处理样式资源

Webpack 本身并不能识别样式资源，需要借助 Loader 来帮助 Webpack 解析样式资源。**Loader 是 Webpack 的核心特征了，借助不同的 Loader 就可以加载任何类型的资源**。

##### 4.1 处理 CSS 资源

https://webpack.docschina.org/loaders/css-loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i, //只检测.css文件
        // 执行顺序，从右往左（从下往上）
        // 对应 loader 都需要下载
        use: [
          'style-loader', // 在js中css通过创建style标签添加到html文件中生效
          'css-loader', // 将css资源编译成commonjs的模块到js中
        ],
      },
    ],
  },
};
```

##### 4.2 处理图片资源

```js
//webpack.config.js

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.txt/,
        type: 'asset',
      },
    ],
  },
};
/**现在，webpack 将按照默认条件，自动地在 resource 和 inline 之间进行选择：小于 8kb 的文件，将会视为 inline 模块类型，否则会被视为 resource 模块类型。

可以通过在 webpack 配置的 module rule 层级中，设置 Rule.parser.dataUrlCondition.maxSize 选项来修改此条件：
**/
webpack.config.js;

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.txt/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
    ],
  },
};
```

##### 4.3 Css 处理

**MiniCssExtractPlugin** 插件实现

之前 Css 文件被打包到了 js 文件中，当 js 文件加载时，会创建一个 style 标签来生成样式。这样对于网站来说会出现闪屏现象，用户体验不好。

我们应该是单独的 CSS 文件，通过 link 标签加载性能才好

这样就不用等 js 执行完才有样式

##### 4.4 Css 兼容性处理

- postcss-loader
- postcss
- postcss-preset-env 智能预设

##### 4.5 Css 压缩

使用插件优化压缩 CSS
CssMinimizerWebpackPlugin

## 六、原理 Loader

### 1.介绍

loader 帮助 webpack 将不同类型的文件转换为 webpack 可识别的模块

loader 执行顺序：

- pre：前置 loader
- normal：普通 loader
- inline：内联 loader
- post 后置 loader

pre > normal > inline > post

相同优先级的 loader 执行顺序为：从右到左、从下到上

```js
// 执行顺序 1 2 3
module: {
  rules: [
    {
      enforce: 'pre',
      test: /\.js$/,
      loader: 'loader1',
    },
    {
      // 没有enforce就是normal
      test: /\.js$/,
      loader: 'loader2',
    },
    {
      enforce: 'post',
      test: /\.js$/,
      loader: 'loader3',
    },
  ];
}
```

### 2. 开发一个 loader

loader 就是一个函数
当 webpack 解析资源时，会调用 loader 去处理
loader 接收文件内容作为参数，返回内容出去

- content 文件内容
- map SourceMap
- meta 别的 loader 传递的数据

```js
module.exports = function (content) {
  console.log(content);
  return content;
};
```

### 3. loader 分类

#### 3.1 同步 loader

```js
module.exports = function (content) {
  console.log(content);
  /*
  第一个参数：err代表是否有错误
  第二个参数：content处理后的内容
  第三个参数：source-map 继续传递source-map
  第四个参数：meta传递给下一个loader
  */
  this.callback(null, content, map, meta);
};
```

#### 3.2 异步 loader

当存在异步调用的时候必须这样先声明

```js
module.exports = function (content, map, meta) {
  const callback = this.async();
  /*
  第一个参数：err代表是否有错误
  第二个参数：content处理后的内容
  第三个参数：source-map 继续传递source-map
  第四个参数：meta传递给下一个loader
  */
  setTimeout(() => {
    callback(null, content, map, meta);
  }, 1000);
};
```

#### 3.3 raw loader

raw loader 接收到 content 是 Buffer 数据

```js
module.exports = function (content) {
  console.log(content);
  return content;
};
module.exports.raw = true;
```

### 4. loader Api

| 方法名                  | 含义                                   | 用法                                        |
| ----------------------- | -------------------------------------- | ------------------------------------------- |
| this.async              | 异步回调 loader。返回 this.callback    | const callback = this.async()               |
| this.callback           | 可以同步或异步调用并返回多个结果的函数 | this.callback(err,content,sourceMap?,meta?) |
| this.getOptions(schema) | 获得 loader 的 options                 | this.getOptions(schema)                     |
| this.emitFile           | 产生一个文件                           | this.emitFile(name,content,sourceMap)       |
| this.utls.contextify    | 返回一个相对路径                       | this.utils.contextify(context,request)      |
| this.utils.absolutify   | 返回一个绝对路径                       | this.utils.absolutify(context,request)      |

### 5. 自定义 loader

```js
module.export = function (content) {
  return context.replace(/console\.log\(.*\);?/g, '');
};
```

## 七、原理 plugin

> wabpack 就像是一条流水线，要经过一系列的处理流程后才能将源文件转换成输出结果，这条生产线的每个处理流程的职责是单一的，多个流程之间有依赖关系，只有完成当前处理后才能交给下一个流程去处理。插件就像是一个插入到生产线中的一个功能，在特定的时机对生产线上的资源做处理。webpack 通过 tapable 来组织这条复杂的生产线。webpack 在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条生产线中，去改变生产线的运作

webpack 在编译的过程中，会触发一系列的 Tapable 钩子事件，插件所做的就是找到对应的钩子，在上面挂上自己的任务，也就是注册事件，这样在 webpack 构建过程中，插件注册的事件就会随着钩子的触发而执行了

### 1 第一个 plugin

### 2

## 八、打包性能优化

## 九、资源推荐
