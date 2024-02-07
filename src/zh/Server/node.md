# Node.js

**前言介绍：**
维基百科介绍

> Node.js 是能够在服务器端运行 JavaScript 的开放源代码、跨平台执行环境。Node.js 由 OpenJS Foundation （原为 Node.js Foundation，已与 JS Foundation 合并）持有和维护，亦为 Linux 基金会的项目。Node.js 采用 Google 开发的 V8 执行代码，使用事件驱动、非阻塞和异步输入输出模型等技术来提高性能，可优化应用程序的传输量和规模。这些技术通常用于资料密集的即时应用程序。

> Node.js 大部分基本模块都用 JavaScript 语言编写。在 Node.js 出现之前，JavaScript 通常作为客户端程序设计语言使用，以 JavaScript 写出的程序常在用户的浏览器上执行。Node.js 的出现使 JavaScript 也能用于服务端编程。Node.js 含有一系列内置模块，使得程序可以脱离 Apache HTTP Server 或 IIS，作为独立服务器执行。

Node.js 是一个 服务器 上的 JavaScript 运行环境。

官网： https://nodejs.org/en

## 一、前置知识

### 1.1 Node.js 的初步认识

Node.js 有哪些用途？

1.  开发服务商应用
2.  开发工具类应用（Webpack、Vite、Babel）
3.  开发桌面端应用（node.js 编写的 electron 框架开发桌面版应用）

Node.js 的安装

Node.js 在官网中有两个版本，一个是推荐给大多数用户的稳定版本（LTS），另外一个是最新版（Current）

根据自己的操作系统和版本需求自行选择下载安装即可

::: tip
不过一般公司内部会使用很多版本的 Node，这里推荐一些 Node 版本管理工具，方便快速切换版本

- nvm (推荐)
- n

node 版本管理工具还有一个是 TJ 大神的 n 命令，n 命令是作为一个 node 的模块而存在，而 nvm 是一个独立于 node/npm 的外部 shell 脚本，因此 n 命令相比 nvm 更加局限。

由于 npm 安装的模块路径均为 /usr/local/lib/node_modules，当使用 n 切换不同的 node 版本时，实际上会共用全局的 node/npm 目录。 因此不能很好的满足『按不同 node 版本使用不同全局 node 模块』的需求。
:::

:::info
注意在 node.js 中是无法调用 BOM 和 DOM 的相关接口的，这一点也很好理解，毕竟运行在服务器上而不是在浏览器上，自然无法调用浏览器提供的相关接口了

- 但是可以使用 console 和定时器的 API
- Node.js 中的顶级对象为 global，可以使用 global 和 globalThis 访问顶级对象
  :::

### 1.2 Buffer 缓冲器

> Buffer 是一个类似数组的对象，用于表示固定长度的字节序列。本质上是一段内存空间，专门用于处理二进制数据

特点：

1. Buffer 大小固定且无法调整
2. Buffer 性能较好，可以直接对计算机内存进行操作
3. 每个元素的大小为 1 字节(Byte)

如何创建一个 Buffer

```js
// 1. alloc

// 创建一个10字节的Buffer，Buffer为Node.js的内置模块
// 用该方式创建的Buffer，每一个二进制位都为0
let buf = Buffer.alloc(10);
console.log(buf);

// 2. allocUnsafe

// 不安全的创建方式，该方式可能会使用到旧的内存空间，但是速度比第一种快
let buf_2 = Buffer.allocUnsafe(10000);
console.log(buf_2);

// 3. from

// 根据 Unicode 码进行二进制编码存入
// 但是输出为了方便查看展示的是16进制的
let buf_3 = Buffer.from('hello');
console.log(buf_3);
```

**Buffer 与字符串的转换**

```js
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
// 根据 utf-8 的方式进行编码转换
console.log(buf_4.toString()); // iloveyou (恋爱脑必备)
```

**Buffer 元素的读写**

```js
let buf = Buffer.from('hello');
console.log(buf[0]); // 输出 h 对应的 ASCII 十进制编码

let buf2 = Buffer.from('我');
console.log(buf[0]); // 输出 我 对应的utf-8编码的字节流中的第一个字节 e6 的十进制 230
console.log(buf); // <Buffer e6 88 91>

let buf_3 = Buffer.from([230, 136, 145]);
console.log(buf_3.toString()); // 输出 我

// buffer里的内容可以直接修改
buf[0] = 95;
```

## 二、基础使用

### 2.1 fs 模块

关于文件的写入和读取，具体场景包括：

- 下载文件
- 安装软件
- 保存日志，如 git
- 编辑器保存文件
- 爬虫
- ...

#### 2.1.1 写入文件

如何新建一个文件并往里面写入内容

```js
// 1. 导入 fs 模块
const fs = require('fs');

// 2. 写入文件

fs.writeFile('./text.txt', 'demo', (err) => {
  // err 写入失败时抛出的错误对象
  // 如果没有失败则为 null
  if (err) {
    consolo.log(err);
    return;
  }
});
```

在写入文件的函数中，可以在文件内容后一个参数传入一个对象，作为配置项
`fs.writeFile('fileName', 'content', configObj, cbFn)`

#### 2.1.2 文件写入方式

:::info
fs 模块有两种，异步和同步两种方式实现

- `fs.writeFile('fileName','content',cb)` 异步方法

- `fs.writeFileSync('fileName','content')` 同步方法

:::

**追加写入**，用于需要持续的往文件里面增加内容

```js
const fs = require('fs');

fs.appendFile('fileName', '补充', (err) => {
  // ...
});

// 同样的也有同步方法
fs.appendFileSync();
```

fs.appendFile 和 fs.writeFile 是 Node.js 的文件系统模块（fs）中用于写入文件的两个方法。这两个方法之间存在以下区别和共同点：

1. 写入方式：fs.appendFile 将数据追加到文件的末尾，而 fs.writeFile 则会完全覆盖文件中的内容并写入新的数据。

2. 文件存在时的行为：fs.appendFile 在文件已经存在时，会将数据追加到文件末尾。而 fs.writeFile 则会直接覆盖已存在的文件，删除原有内容并写入新的数据。

3. 文件不存在时的行为：当文件不存在时，fs.appendFile 会创建一个新的文件，并将数据写入其中。fs.writeFile 也会创建一个新的文件，并写入数据。

**流式写入**，更适用于写入频率高的场景，也适合大文件写入

```js
const fs = require('fs');

// 创建流对象
const ws = fs.createWriteStream('./文件名.txt');

// 往流里面写入,\r\n 手动换行
ws.write('11111\r\n');
ws.write('21111\r\n');
ws.write('31111\r\n');
ws.write('41111\r\n');

// 关闭通道（可选，当脚本执行完毕后通道自然会断开）
ws.close();
```

#### 2.1.3 文件读取

语法 `fs.readFile(path,[options],callback)`

参数说明：

- path 文件路径
- optinos 选项配置

```js
const fs = require('fs');

// 异步读取
fs.readFile('./text.txt', (err, data) => {
  if (err) {
    console.log('读取失败', err);
    return;
  }
  console.log(data.toString());
});

// 同步读取
let data = fs.readFileSync('./text.txt');
console.log(data.toString());
```

#### 2.1.4 文件读取方式

**流式读取**，适用于读取大文件，内存占用空间小

```js
const fs = require('fs');

const rs = fs.createReadStream('./video.mp4');

// 监听 data 事件，每读完一块chunk内容则执行一次
rs.on('data', (chunk) => {
  console.log(chunk);
});

rs.on('end', () => {
  console.log('读取完成');
});
```

#### 2.1.5 重命名和移动

```js
const fs = require('fs');

// 重命名
fs.rename('./fileName', './reName', (err) => {});

// 文件移动
fs.rename('./fileName', '../other/fileName', (err) => {});
```

#### 2.1.6 文件删除

```js
const fs = require('fs');

fs.unlink('./fileName', (err) => {
  //...
});

// 还可以使用 rm 方法， node 14.4 新增
fs.rm('./fileName', (err) => {});
```

#### 2.1.7 文件夹操作

创建、删除、移动文件夹

```js
const fs = require('fs');

// 创建文件夹
fs.mkdir('./dirName', (err) => {});

// 递归创建文件夹
fs.mkdir('./a/b/c', { recursive: true }, (err) => {});

// 读取文件夹

fs.readdir('../test', (err, data) => {
  // data 为一个数组，包括了文件名
  console.log(data);
});

// 删除文件夹
fs.rmdir('../test', (err) => {});

// 递归删除

fs.rmdir('./a', { recursive: true }, (err) => {});

// 也可以使用 fs.rm 来删除文件夹，语法与 rmdir 一致
```

#### 2.1.8 查看资源

#### 2.1.9 Path 模块

### 2.2 Http 请求

### 2.3 模块化 daemon 守护进程

## 三、模块化与包管理

## 四、Node 后台相关框架


## 五、补充

### node-schedule 定时任务

### pm2 管理进程